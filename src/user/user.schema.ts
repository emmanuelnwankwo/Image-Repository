import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    dateCreated: {
        type: Date,
        required: true,
        default: new Date()
    },
    dateUpdated: {
        type: Date
    }
})

UserSchema.pre('save', async function (next: mongoose.HookNextFunction) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        const hashed = bcrypt.hashSync(this['password'], 10);
        this['password'] = hashed;
    }
    catch (error) {
        return next(error);
    }
})