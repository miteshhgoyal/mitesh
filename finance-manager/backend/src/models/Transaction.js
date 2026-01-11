// models/Transaction.js
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const TransactionSchema = new Schema({
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
    date: {
        type: Date,
        default: Date.now
    },
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    }],
    deductedFrom: {
        type: Schema.Types.ObjectId,
        ref: 'DeductedFrom'
    },
    wealthComponent: {
        type: Schema.Types.ObjectId,
        ref: 'WealthComponent',
        required: true
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
TransactionSchema.index({ date: -1 });
TransactionSchema.index({ type: 1, date: -1 });
TransactionSchema.index({ 'wealthComponent': 1 });
TransactionSchema.index({ 'tags': 1 });

TransactionSchema.set('toJSON', { virtuals: true });
TransactionSchema.set('toObject', { virtuals: true });

export default model('Transaction', TransactionSchema);
