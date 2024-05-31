import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define the schema
const StoreItemSchema = new Schema({
	id: { type: Number, required: true },
	imageName: { type: String, required: true },
	name: { type: String, required: true },
	description: { type: String, required: true },
	price: { type: Number, required: true },
});

// Export the model
export const Item = mongoose.model("Item", StoreItemSchema, "items");
