import { ModelConfig } from "./ModelConfig";

let mongoose = require('mongoose');

// User Schema
let userSchema = mongoose.Schema({
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: ModelConfig.User,
      required: true
    },
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: ModelConfig.User,
      required: true
    },
    product: {
      type: String,
      required: true
    },
    claimOffer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: ModelConfig.ClaimOffer,
      required: true
    },
    progress: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: ModelConfig.Progress
      }
    ],
    transportRequest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: ModelConfig.TransportRequest,
      required: true
    },
    status: {
      type: Number,
      deault: 0
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

let OrderModel = module.exports = mongoose.model(ModelConfig.Order, userSchema, 'orders');
