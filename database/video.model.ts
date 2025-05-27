import { model, models, Schema, Types, Document } from "mongoose"

export interface IVideo extends Document {
    user: Types.ObjectId
    videoId: string;
    transcript: string[];
}

const videoSchema = new Schema({
    user: { type: Types.ObjectId, ref: "User", required: true },
    videoId: { type: String, required: true },
    transcript: [String],
});

const Video = models.Video || model<IVideo>("Video", videoSchema);

export default Video;