import { ModelConfig } from "./ModelConfig";

let mongoose = require('mongoose');

// ClaimRequest Schema
let userSchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: ModelConfig.User
    },
    category: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: ModelConfig.Category
        }
    ],
    product: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        default: 0
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

let ClaimRequestModel = module.exports = mongoose.model(ModelConfig.ClaimRequest, userSchema, 'claimRequests');
