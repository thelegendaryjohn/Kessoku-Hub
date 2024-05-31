import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define the schema
const postSchema = new Schema({
	author: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
		index: true,
	},
	topicId: {
		type: Schema.Types.ObjectId,
		ref: "Topic",
		required: true,
		index: true,
	},
	//
	title: { type: String, required: true, minLength: 5, maxLength: 64 },
	content: { type: String, required: true },
	attachment: { type: String },
	//
	viewCount: { type: Number, default: 0 },
	likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
	commentCount: { type: Number, default: 0 },
	//
	pinned: { type: Boolean, default: false },
	//
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

// Export the model
export const Post = mongoose.model("Post", postSchema, "posts");
