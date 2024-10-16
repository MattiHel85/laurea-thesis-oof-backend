import mongoose from "mongoose";
import { Menu, MenuItem } from "../types/menu";

const Schema = mongoose.Schema;
const model = mongoose.model;

const MenuItemSchema = new Schema<MenuItem>({
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

const MenuSchema = new Schema<Menu>({
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

export const MenuModel = model<Menu>('Menu', MenuSchema);