import request from "supertest";
import assert from "assert";
import { User } from "../../models/user.js";
import { app } from "../../lib/app.js";

let cookie;

describe("GET /account/logout", () => {
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
	beforeEach((done) => {
		request(app)
			.post("/account/login")
			.send({
				username: "testuser",
				password: "testpassword",
				remember: true,
			})
			.set("Accept", "application/json")
			.expect("set-cookie", /connect.sid/)
			.expect("Content-Type", /json/)
			.expect(200)
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				assert(res.body.username === "testuser");
				cookie = res.header["set-cookie"];
				console.log("Cookie set: ", cookie);
				done();
			});
	});

	//
	it("should logout a user and return status code 200", (done) => {
		request(app)
			.get("/account/logout")
			.set("Accept", "application/json")
			.set("Cookie", cookie)
			.expect("Content-Type", "text/html; charset=utf-8")
			.expect(200)
			.end((err) => {
				if (err) {
					return done(err);
				}
				done();
			});
	});

	// should also be able to logout via the account route
	it("should logout a user via a post request and return status code 200", (done) => {
		request(app)
			.post("/account/logout")
			.set("Accept", "application/json")
			.set("Cookie", cookie)
			.expect("Content-Type", /json/)
			.expect(200)
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				console.log(res.body);
				done();
			});
	});
});
