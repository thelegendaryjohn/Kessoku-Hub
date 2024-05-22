import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define the schema
const topicSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		index: true,
	},
	allowedRole: { type: Number, required: true },
	description: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

// Export the model
export const Topic = mongoose.model("Topic", topicSchema, "topics");
