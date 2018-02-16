import Model from "ModelConfig";

let mongoose = require('mongoose');

// ClaimRequest Schema
let userSchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Model.User
    },
    category: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: Model.Category
        }
    ],
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
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

let ClaimRequestModel = module.exports = mongoose.model(Model.ClaimRequest, userSchema);

