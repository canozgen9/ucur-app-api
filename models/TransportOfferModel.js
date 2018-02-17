import { ModelConfig } from "./ModelConfig";

let mongoose = require('mongoose');

// TransportOffer Schema
let userSchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: ModelConfig.User
    },
    claimRequest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: ModelConfig.ClaimRequest
    },
    startDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    endDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    commission: {
        type: String,
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

let TransportOfferModel = module.exports = mongoose.model(ModelConfig.TransportOffer, userSchema, 'transportOffers');
