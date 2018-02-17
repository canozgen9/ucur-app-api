import { ModelConfig } from "./ModelConfig";

let mongoose = require('mongoose');

// Category Schema
let userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

let CategoryModel = module.exports = mongoose.model(ModelConfig.Category, userSchema, 'categories');
