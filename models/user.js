import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Resend } from "resend";
import { Post } from "./post.js";
import { Comment } from "./comment.js";

const env = process.env.NODE_ENV;
const Schema = mongoose.Schema;

let resend;
if (process.env.RESEND_KEY) resend = new Resend(process.env.RESEND_KEY);

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
	bio: { type: String, default: "" },
	avatar: { type: String, default: "/images/account-section/user-icon.svg" },
	birthday: { type: Date },
	isRestricted: { type: Boolean, default: false },
	isBanned: { type: Boolean, default: false },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
	isArchived: { type: Boolean, default: false },
});

// Hash password before saving
userSchema.pre("save", function (next) {
	if (!this.isModified("password")) return next();

	bcrypt.hash(this.password, SALT_WORK_FACTOR, (err, hash) => {
		if (err) return next(err);

		this.password = hash;
		next();
	});
});

userSchema.methods.verifyEmail = async function (email, cb) {
	if (this.role !== roles.unverified)
		return cb(new Error("User is already verified."));
	const homelink =
		env == "dev" || env == "prodtest"
			? "http://localhost:3000"
			: "https://bocchi.band";
	const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: "5m",
	});

	const { data, error } = await resend.emails.send({
		from: "Support <support@bocchi.band>",
		to: [email],
		subject: "Kessoku Hub - Verify your email",
		html: `Your verification link is <a href="${homelink}/api/account/verify/${token}">here</a>.`,
	});

	if (error) {
		return cb(null, error);
	}

	return cb(data);
};

userSchema.methods.comparePassword = function (candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
		if (err) return cb(err);
		cb(null, isMatch);
	});
};

userSchema.methods.getPosts = function (page, limit, cb) {
	Post.find({ author: this._id })
		.skip((page - 1) * limit)
		.limit(limit)
		.sort({ createdAt: -1 })
		.exec(cb);
};

userSchema.methods.getComments = function (page, limit, cb) {
	Comment.find({ author: this._id })
		.skip((page - 1) * limit)
		.limit(limit)
		.sort({ createdAt: -1 })
		.exec(cb);
};

// Method to send password reset link
userSchema.methods.sendPasswordResetLink = async function (cb) {
	if (!this.email)
		return cb(new Error("User does not have an email address."));

	const homelink =
		env == "dev" || env == "prodtest"
			? "http://localhost:3000"
			: "https://bocchi.band";
	const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: "1h",
	});

	const { data, error } = await resend.emails.send({
		from: "Support <support@bocchi.band>",
		to: [this.email],
		subject: "Kessoku Hub - Reset your password",
		html: `You can reset your password using the following link: <a href="${homelink}/api/user/reset-password/${token}">Reset Password</a>. This link will expire in 1 hour.`,
	});

	if (error) {
		return cb(null, error);
	}

	return cb(null, data);
};

// Export the model
export const User = mongoose.model("User", userSchema, "users");
