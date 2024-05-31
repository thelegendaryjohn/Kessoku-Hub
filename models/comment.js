import mongoose from "mongoose";
const Schema = mongoose.Schema;

const commentSchema = new Schema({
	postId: {
		type: Schema.Types.ObjectId,
		ref: "Post",
		required: true,
		index: true,
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
		index: true,
	},
	content: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
	viewCount: { type: Number, default: 0 },
	likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
	//
	isArchived: { type: Boolean, default: false },
});

// Export the model
export const Comment = mongoose.model("Comment", commentSchema, "comments");
