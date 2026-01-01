import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const { Schema, model } = mongoose;

const ConfigSchema = new Schema({
    name: { type: String, required: true },
    accessPassword: { type: String, required: true },
    lastLogin: { type: Date, default: null },
}, { timestamps: true });

// Hash password before saving
ConfigSchema.pre('save', async function (next) {
    // Changed from 'password' to 'accessPassword'
    if (!this.isModified('accessPassword')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.accessPassword = await bcrypt.hash(this.accessPassword, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare password
ConfigSchema.methods.comparePassword = async function (accessPasswordEntered) {
    // Changed from 'this.password' to 'this.accessPassword'
    return await bcrypt.compare(accessPasswordEntered, this.accessPassword);
};

export default model('Config', ConfigSchema);
