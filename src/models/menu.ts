import mongoose from "mongoose";

const Schema = mongoose.Schema;
const model = mongoose.model;

export const MenuItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

export const MenuSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    menuItems: {
        type: [MenuItemSchema],
        required: true
    }
});

module.exports = model('Menu', MenuSchema);