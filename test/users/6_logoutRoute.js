import request from "supertest";
import assert from "assert";
import { User } from "../../schemas/user.js";
import { app } from "../../lib/app.js";

describe("GET /user/logout", () => {
	// Create a user before running these tests
	before(function (done) {
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

	// Login a user before running the tests
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

	//
	it("should logout a user and return status code 200", (done) => {
		request(app)
			.get("/user/logout")
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(200)
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				assert(res.body === "Successfully logged out.");
				done();
			});
	});
});
