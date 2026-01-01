// db.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

// Models
import Config from '../models/Config.js';
import Type from '../models/Type.js';
import Tag from '../models/Tag.js';
import WealthComponent from '../models/WealthComponent.js';
import Template from '../models/Template.js';

dotenv.config({ quiet: true });

const MONGO_URI = process.env.NODE_ENV === 'development'
    ? process.env.MONGODB_URI
    : process.env.MONGODB_URI_PROD;

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);

        await seedConfigUser();
        await seedReferenceData();
        await seedTemplates();
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

const seedConfigUser = async () => {
    try {
        const accessPassword = process.env.ACCESS_PASS;

        if (!accessPassword) {
            console.warn('ACCESS_PASS not set in environment variables');
            return;
        }

        const existingConfig = await Config.findOne();
        if (existingConfig) {
            console.log('Config already exists');
            return;
        }

        const configDoc = new Config({
            name: 'Transactions Ledger',
            accessPassword: accessPassword
        });

        await configDoc.save();
        console.log('Config created successfully');
    } catch (error) {
        console.error('Error seeding config:', error.message);
    }
};

const seedReferenceData = async () => {
    try {
        console.log('Seeding reference data...');

        // 1. Seed Types
        const defaultTypes = [
            { name: 'DEBIT', color: '#ef4444' },
            { name: 'CREDIT', color: '#10b981' }
        ];

        let seededTypes = 0;
        for (const type of defaultTypes) {
            const existing = await Type.findOne({ name: type.name });
            if (!existing) {
                await Type.create(type);
                seededTypes++;
            }
        }
        console.log(`Seeded ${seededTypes} new Types (total: ${await Type.countDocuments()})`);

        // 2. Seed Wealth Components
        const defaultWealth = [
            { name: 'Cash', color: '#22c55e' },
            { name: 'Bank', color: '#3b82f6' },
            { name: 'Crypto', color: '#f59e0b' },
            { name: 'Stocks', color: '#8b5cf6' },
            { name: 'Mutual Funds', color: '#06b6d4' },
            { name: 'Real Estate', color: '#84cc16' },
            { name: 'Gold', color: '#eab308' },
            { name: 'Fixed Deposits', color: '#14b8a6' },
            { name: 'Salary', color: '#6366f1' },
            { name: 'Business', color: '#ec4899' }
        ];

        let seededWealth = 0;
        for (const wealth of defaultWealth) {
            const existing = await WealthComponent.findOne({ name: wealth.name });
            if (!existing) {
                await WealthComponent.create(wealth);
                seededWealth++;
            }
        }
        console.log(`Seeded ${seededWealth} new Wealth Components (total: ${await WealthComponent.countDocuments()})`);

        // 3. Seed Sample Tags
        const sampleTags = [
            { name: 'salary', color: '#6366f1' },
            { name: 'grocery', color: '#ef4444' },
            { name: 'monthly', color: '#10b981' },
            { name: 'investment', color: '#f59e0b' },
            { name: 'expense', color: '#dc2626' }
        ];

        let seededTags = 0;
        for (const tag of sampleTags) {
            const existing = await Tag.findOne({ name: tag.name });
            if (!existing) {
                await Tag.create(tag);
                seededTags++;
            }
        }
        console.log(`Seeded ${seededTags} new Tags (total: ${await Tag.countDocuments()})`);

        console.log('All reference data seeded successfully');
    } catch (error) {
        console.error('Error seeding reference data:', error.message);
    }
};

const seedTemplates = async () => {
    try {
        console.log('Seeding templates...');

        const sampleTemplates = [
            {
                name: 'Monthly Salary',
                amount: 50000,
                netAmount: 50000,
                deductedFrom: 'HDFC Bank Account',
                dateOffset: 0,
                description: 'Monthly salary credit from employer. Includes basic salary, HRA, and allowances.'
            },
            {
                name: 'Grocery Shopping',
                amount: 2500,
                netAmount: -2500,
                deductedFrom: 'Cash',
                dateOffset: 0,
                description: 'Weekly grocery shopping from local market. Includes vegetables, dairy, grains, and household items.'
            },
            {
                name: 'House Rent',
                amount: 15000,
                netAmount: -15000,
                deductedFrom: 'SBI Bank Account',
                dateOffset: 1,
                description: 'Monthly rent payment for 2BHK apartment. Paid on 1st of every month via bank transfer.'
            },
            {
                name: 'Electricity Bill',
                amount: 1200,
                netAmount: -1200,
                deductedFrom: 'Bank',
                dateOffset: 0,
                description: 'Monthly electricity bill payment. Includes usage charges and fixed charges for residential connection.'
            }
        ];

        let seededTemplates = 0;
        for (const templateData of sampleTemplates) {
            const debitType = await Type.findOne({ name: 'DEBIT' });
            const creditType = await Type.findOne({ name: 'CREDIT' });
            const cashWealth = await WealthComponent.findOne({ name: 'Cash' });
            const bankWealth = await WealthComponent.findOne({ name: 'Bank' });

            if (!debitType || !creditType || !cashWealth || !bankWealth) {
                console.warn('Missing reference data for templates');
                continue;
            }

            const template = {
                ...templateData,
                type: templateData.netAmount > 0 ? creditType._id : debitType._id,
                wealthComponent: templateData.deductedFrom.toLowerCase().includes('cash')
                    ? cashWealth._id : bankWealth._id,
                isActive: true
            };

            const existing = await Template.findOne({ name: template.name });
            if (!existing) {
                await Template.create(template);
                seededTemplates++;
            }
        }
        console.log(`Seeded ${seededTemplates} new Templates (total: ${await Template.countDocuments()})`);
    } catch (error) {
        console.error('Error seeding templates:', error.message);
    }
};

export default connectDB;
