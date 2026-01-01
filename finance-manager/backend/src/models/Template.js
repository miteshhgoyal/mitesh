// models/Template.js
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const TemplateSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    netAmount: {
        type: Number,
        required: true
    },
    type: {
        type: Schema.Types.ObjectId,
        ref: 'Type',
        required: true
    },
    dateOffset: {
        type: Number,
        default: 0, // Days offset from today (0 = today, 1 = tomorrow, -1 = yesterday)
    },
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    }],
    deductedFrom: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    wealthComponent: {
        type: Schema.Types.ObjectId,
        ref: 'WealthComponent',
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    description: {
        type: String,
        trim: true,
        maxlength: 2000
    }
}, {
    timestamps: true
});

// Indexes
TemplateSchema.index({ isActive: 1 });
TemplateSchema.index({ type: 1 });
TemplateSchema.index({ 'wealthComponent': 1 });

// Method to generate actual transaction from template
TemplateSchema.methods.toTransaction = function () {
    const today = new Date();
    const transactionDate = new Date(today);
    transactionDate.setDate(today.getDate() + this.dateOffset);

    return {
        name: this.name,
        amount: this.amount,
        netAmount: this.netAmount,
        type: this.type,
        date: transactionDate,
        tags: this.tags,
        deductedFrom: this.deductedFrom,
        wealthComponent: this.wealthComponent,
        description: this.description
    };
};

export default model('Template', TemplateSchema);
