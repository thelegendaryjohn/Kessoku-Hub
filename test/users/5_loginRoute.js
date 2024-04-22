import request from "supertest";
import assert from "assert";
import { User } from "../../schemas/user.js";
import { app } from "../../lib/app.js";

describe("POST /user/login", () => {
	// Create a user before running these tests
	beforeEach(function (done) {
		User.collection.drop(() => {
			// Creating a new Instance of User Model
			let user = new User({
				username: "testuser",
				password: "testpassword",
			});
			user.save().then(() => {
				done();
			});
		});
	});

	it("should login a user and return status code 200", (done) => {
		request(app)
			.post("/user/login")
			.send({
				username: "testuser",
				password: "testpassword",
				remember: true,
			})
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(200)
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				assert(res.body.username === "testuser");
				done();
			});
	});

	// Should fail if the username or password is incorrect
	it("should fail if the username or password is incorrect", (done) => {
		request(app)
			.post("/user/login")
			.send({
				username: "wronguser",
				password: "wrongpassword",
				remember: true,
			}) // replace with invalid credentials
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(401)
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				assert(res.body === "Invalid credentials.");
				done();
			});
	});

	// Should fail if the input is of invalid type
	it("should fail if the input is of invalid type", (done) => {
		request(app)
			.post("/user/login")
			.send({ username: 123, password: 123, remember: "true" }) // replace with invalid credentials
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(401)
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				assert(res.body === "Invalid input.");
				done();
			});
	});
});
