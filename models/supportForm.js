import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define the schema
const supportFormSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		index: true,
	},
	name: { type: String },
	message: { type: String, required: true },
});

// Export the model
export const SupportForm = mongoose.model(
	"SupportForm",
	supportFormSchema,
	"supportForms"
);
