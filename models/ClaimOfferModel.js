import Model from "ModelConfig";

let mongoose = require('mongoose');

// ClaimOffer Schema
let userSchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Model.User
    },
    transportRequest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Model.TransportRequest
    },
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
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

let ClaimOfferModel = module.exports = mongoose.model(Model.ClaimOffer, userSchema);

