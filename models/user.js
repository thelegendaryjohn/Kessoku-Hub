import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Resend } from "resend";
//
const env = process.env.NODE_ENV;
const Schema = mongoose.Schema;
const resend = new Resend(process.env.RESEND_KEY);

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
	email: {
		type: String,
		unique: [true, "This email is already in use."],
		sparse: true,
	},
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

userSchema.methods.verifyEmail = async function (email, cb) {
	// Only allow unverified users to verify their email
	if (this.role !== roles.unverified)
		return cb(new Error("User is already verified."));
	// Create a token
	const homelink =
		env == "dev" ? "http://localhost:3000" : "https://bocchi.band";
	const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: "5m",
	});

	const { data, error } = await resend.emails.send({
		from: "Support <support@bocchi.band>",
		to: [email],
		subject: "Kessoku Hub - Verify your email",
		html: `Your verification link is <a href="${homelink}/user/verify/${token}">here</a>.`,
	});

	if (error) {
		return cb(null, error);
	}

	return cb(data);
};

// Method to compare password for login
userSchema.methods.comparePassword = function (candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
		if (err) return cb(err);
		cb(null, isMatch);
	});
};

// Export the model
export const User = mongoose.model("User", userSchema, "users");
