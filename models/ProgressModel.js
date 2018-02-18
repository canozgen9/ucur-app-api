import { ModelConfig } from "./ModelConfig";

let mongoose = require('mongoose');

// User Schema
let userSchema = mongoose.Schema({
    lat: {
        type: String,
        required: true
    },
    lang: {
        type: String,
        required: true
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

let ProgressModel = module.exports = mongoose.model(ModelConfig.Progress, userSchema, 'progresses');
