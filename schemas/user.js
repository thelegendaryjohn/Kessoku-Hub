import mongoose from "mongoose";
import bcrypt from "bcrypt";
const Schema = mongoose.Schema;

// Configs
const SALT_WORK_FACTOR = 10;

// Role enum
export const roles = {
	unverified: 0,
	user: 1,
	admin: 2,
};

// Define the schema
const userSchema = new Schema({
	username: {
		type: String,
		required: [true, "Username is required."],
		unique: [true, "Username must be unique."],
	},
	password: { type: String, required: [true, "Password is required."] },
	role: { type: Number, default: roles.unverified },
	email: { type: String, unique: [true, "This email is already in use."] },
	//
	created: { type: Date, default: Date.now },
});

// Hash password before saving
userSchema.pre("save", function (next) {
	// Only hash the password if it has been modified (or is new)
	if (!this.isModified("password")) return next();

	// Generate a salt
	bcrypt.hash(this.password, SALT_WORK_FACTOR, (err, hash) => {
		if (err) return next(err);

		// Replace the password with the hash
		this.password = hash;
		next();
	});
});

// Create a token to verify with email for new users
userSchema.post("init", function (doc) {
	// TODO: Use nodemailer to send the email with the generated token with JWT
});

// Method to compare password for login
userSchema.methods.comparePassword = function (candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
		if (err) return cb(err);
		cb(null, isMatch);
	});
};

// Export the model
export const User = mongoose.model("User", userSchema, "users");
