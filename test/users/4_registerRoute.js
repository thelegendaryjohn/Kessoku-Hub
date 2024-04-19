import request from "supertest";
import assert from "assert";
import { User } from "../../schemas/user.js";
import { app } from "../../lib/app.js";

describe("POST /user/register", () => {
	it("should register a new user", (done) => {
		request(app)
			.post("/user/register")
			.send({ username: "testuser", password: "testpassword1" })
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(201)
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				assert(res.body.username === "testuser");
				done();
			});
	});

	// Should fail if the user already exists
	it("should fail if the user already exists", (done) => {
		request(app)
			.post("/user/register")
			.send({ username: "testuser", password: "testpassword1" })
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(409)
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				assert(res.body === "Username already taken.");
				done();
			});
	});
});
describe("POST /user/register sanitization", () => {
	// Flush the collection before these tests
	beforeEach(function (done) {
		User.collection.drop(() => {
			done();
		});
	});

	// Should fail if the username is not provided
	it("should fail if the username is not provided", (done) => {
		request(app)
			.post("/user/register")
			.send({ password: "testpassword1" })
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(400)
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				assert(res.body === `requires property "username"`);
				done();
			});
	});

	// Should fail if the username is of invalid regex
	it("should fail if the username is of invalid regex", (done) => {
		request(app)
			.post("/user/register")
			.send({ username: "1test", password: "testpassword1" })
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(400)
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				assert(
					res.body ===
						`does not match pattern "^[A-Za-z][A-Za-z0-9_]{0,31}$"`
				);
				done();
			});
	});

	// Should fail if the password is not provided
	it("should fail if the password is not provided", (done) => {
		request(app)
			.post("/user/register")
			.send({ username: "testuser" })
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(400)
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				assert(res.body === `requires property "password"`);
				done();
			});
	});
	it("should fail if the password is of invalid regex", (done) => {
		request(app)
			.post("/user/register")
			.send({ username: "testuser", password: "test" })
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(400)
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				assert(
					res.body ===
						`does not match pattern "^[A-Za-z][A-Za-z0-9_]{5,31}$"`
				);
				done();
			});
	});
});
