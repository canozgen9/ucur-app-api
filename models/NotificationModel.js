import { ModelConfig } from "./ModelConfig";

let mongoose = require('mongoose');

// User Schema
let userSchema = mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: ModelConfig.User,
      required: true
    },
    type: {
      type: Number,
      required: true
    },
    seen: {
      type: Number,
      default: 0
    },
    message: {
      type: String,
      required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

let NotificationModel = module.exports = mongoose.model(ModelConfig.Notification, userSchema, 'notification');
