import { User } from "../../schemas/user.js";
import * as colors from "../../lib/consoleThemes.js";
import assert from "assert";

describe(`${colors.test} Reading a user's details from MongoDB`, () => {
	it(`${colors.test} Reads a user`, (done) => {
		User.findOne({ username: "testuser" }).then((user) => {
			assert(user.username === "testuser");
			done();
		});
	});
});
