import { app } from "../app.js";
import { characters } from "../public/js/landing/characters.js";

app.get("/", (req, res) => {
	res.render("landingPage", {
		charNames: characters.map((char) => char.id),
	});
});
