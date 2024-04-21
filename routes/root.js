let env = process.env.NODE_ENV;
//
import { app } from "../lib/app.js";
import { characters } from "../public/js/landing/characters.js";

app.get("/", (req, res) => {
	res.render("landingPage", {
		env: env,
		charNames: characters.map((char) => char.id),
	});
});
