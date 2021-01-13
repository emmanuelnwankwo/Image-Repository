import * as mongoose from 'mongoose';

export const ImageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    format: {
        type: String,
        required: true
    },
    public: {
        type: Boolean,
        required: true,
        default: true
    },
    amount: {
        type: Number,
        required: true,
        default: 0
    },
    discount: {
        type: Boolean,
        required: true,
        default: false
    },
    discountAmount: {
        type: Number,
        required: true,
        default: false
    },
    available: {
        type: Boolean,
        required: true,
        default: true
    },
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
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