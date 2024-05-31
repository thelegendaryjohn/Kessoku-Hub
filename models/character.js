import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define the schema
const characterSchema = new Schema({
	id: { type: String, required: true },
	name: { type: String, required: true },
	va: { type: String, required: true },
	role: { type: String, required: true },
	desc: { type: String, required: true },
});

// Export the model
export const Character = mongoose.model(
	"Character",
	characterSchema,
	"characters"
);
