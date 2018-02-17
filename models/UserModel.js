import { ModelConfig } from "./ModelConfig";

let mongoose = require('mongoose');

// User Schema
let userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

let UserModel = module.exports = mongoose.model(ModelConfig.User, userSchema);

