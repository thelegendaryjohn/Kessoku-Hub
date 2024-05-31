import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define the schema
const songSchema = new Schema({
	index: { type: Number, required: true },
	songName: { type: String, required: true },
	id: { type: String, required: true },
	length: { type: String, required: true },
});

// Export the model
export const Song = mongoose.model("Song", songSchema, "songs");
