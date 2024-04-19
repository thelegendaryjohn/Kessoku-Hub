import request from "supertest";
import assert from "assert";
import { app } from "../../lib/app.js";

describe("POST /user/register", () => {
	it("should register a new user", (done) => {
		request(app)
			.post("/user/register")
			.send({ username: "testuser", password: "testpassword" })
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(201)
			.end((err, res) => {
				if (err) return done(err);
				assert(res.body.username === "testuser");
				done();
			});
	});
});
