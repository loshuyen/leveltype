import { Schema, model, models } from 'mongoose';

export interface IUser extends Document {
    name?: string;
    email: string;
    image?: string;
}

const UserSchema = new Schema(
    {
        name: String,
        email: { type: String, required: true, unique: true },
        image: String,
    }, 
    { timestamps: true }
);

export const User = models.User || model('User', UserSchema);
