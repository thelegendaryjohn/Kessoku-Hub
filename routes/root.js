import { characters } from "../data/characters.js";
import { app } from "../app.js";

app.get("/", (req, res) => {
	res.render("index", {
		title: "Home",
		message: "Welcome to Kessoku Hub!!",
		characters: characters,
	});
});
