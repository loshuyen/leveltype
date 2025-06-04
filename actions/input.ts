'use server'

import dbConnect from "@/lib/mongoose"
import { Input } from "@/models/input"
import { User } from "@/models/user"

export const upsertInput = async (videoId, email, index, text) => {
    await dbConnect()
    
    const user = await User.findOne({ email })

    if (!user) return;
    
    const input = await Input.findOne({ videoId, user: user._id });

    if (!input) {
        const inputText = JSON.stringify({ [index]: text });
        Input.create({
            videoId,
            user: user._id,
            text: inputText,
    });
    } else {
        input.text = JSON.stringify({
            ...JSON.parse(input.text || "{}"),
            [index]: text
        });
        input.save();
    }
}

export const getInput = async (videoId, email) => {
    await dbConnect()

    const user = await User.findOne({ email })

    if (!user) return;

    const input = await Input.findOne({ videoId, user: user._id })
    return input ? input.text : ""
}

export const getInputRecordsByUser = async (email) => {
    await dbConnect()

    const user = await User.findOne({ email })

    if (!user) return;

    const input = await Input.find({ user: user._id })
    const videoIds = input.map((i) => i.videoId)
    return videoIds ?? []
}