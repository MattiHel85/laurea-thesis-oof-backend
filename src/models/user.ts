import mongoose, { Document} from "mongoose";
import { User } from "../types/user";
import { validateEmail } from "../utils/validator";

const Schema = mongoose.Schema;
const model = mongoose.model;

export const UserSchema = new Schema<User & Document>({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validateEmail,
            message: 'Invalid email format'
        }
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: false
    }
}, {
    toJSON: {
        transform: function (doc, ret) {
            delete ret.password;
        }
    }
})

module.exports = model<User & Document>('User', UserSchema);