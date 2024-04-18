import { mongoose } from "./db.js";
import bcrypt from "bcrypt";
const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	verified: { type: Boolean, default: false },
	email: { type: String, unique: true },
	//
	created: { type: Date, default: Date.now },
});

// Hash password before saving
userSchema.pre("save", function (next) {
	// Only hash the password if it has been modified (or is new)
	if (!this.isModified("password")) return next();

	// Generate a salt
	bcrypt.hash(this.password, 10, (err, hash) => {
		if (err) return next(err);

		// Replace the password with the hash
		this.password = hash;
		next();
	});
});

// Method to compare password for login
userSchema.methods.comparePassword = function (candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
		if (err) return cb(err);
		cb(null, isMatch);
	});
};

// Export the model
export const User = mongoose.model("User", userSchema);
