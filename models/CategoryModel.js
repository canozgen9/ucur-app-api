import Model from "ModelConfig";

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

let CategoryModel = module.exports = mongoose.model(Model.Category, userSchema);

