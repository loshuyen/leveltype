import { Schema, model, models, Types } from 'mongoose';

const InputSchema = new Schema(
    {
        user: { type: Types.ObjectId, ref: 'User', required: true},
        videoId: { type: String, required: true },
        text: { type: String },
    }, 
    { timestamps: true }
);

export const Input = models.Input || model('Input', InputSchema);
