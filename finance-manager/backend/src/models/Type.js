// models/Type.js
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const TypeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        uppercase: true,
        maxlength: 20
    },
    color: {
        type: String,
        default: '#64748b',
        match: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

export default model('Type', TypeSchema);
