import Model from "ModelConfig";

let mongoose = require('mongoose');

// TransportOffer Schema
let userSchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Model.User
    },
    claimRequest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Model.ClaimRequest
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
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

let TransportOfferModel = module.exports = mongoose.model(Model.TransportOffer, userSchema);

