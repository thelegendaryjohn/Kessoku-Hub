let env = process.env.NODE_ENV;

// Packages
import express from "express";
import session from "express-session";
import fs from "fs";
import * as colors from "./consoleThemes.js";
import chalk from "chalk";
import { startDatabase } from "./db.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Start a server and listen to requests
export const app = express();

// Use JSON
app.use(express.json());

// Start the database if not in test mode
if (env !== "test") startDatabase();

// Use EJS
app.set("view engine", "ejs");

// Use sessions
app.use(
	session({
		resave: false, // required: force lisghtweight session keep alive (touch)
		saveUninitialized: false, // recommended: only save session when data exists
		secret:
			env === "dev" || env === "test"
				? "baocchi"
				: process.env.SESSION_SECRET, // recommended: the session key should be secret in production
		cookie: {
			secure: env == "dev" ? false : true,
		},
	})
);

// Serve static files
app.use(express.static("public"));

// Import all routes
const __dirname = path.resolve();
let routes = path.resolve(__dirname, "routes");
console.log(routes);
fs.readdirSync(routes, { recursive: true }).map((file) => {
	if (file.endsWith(".js")) {
		console.log(`${colors.server} Importing route ${chalk.bold(file)}`);
		import(`../routes/${file}`);
	}
});

// Live reload the app if in development
import livereload from "livereload";
import connectLivereload from "connect-livereload";
import path from "path";

if (env == "dev") {
	let liveReloadServer = livereload.createServer();
	liveReloadServer.watch(__dirname);

	// Ping browser on Express boot, once browser has reconnected and handshaken
	liveReloadServer.server.once("connection", () => {
		setTimeout(() => {
			liveReloadServer.refresh("/");
		}, 100);
	});

	// Monkey patch every served HTML so they know of changes
	app.use(connectLivereload());
}

// Serve docs
const swaggerDefinition = {
	openapi: "3.0.0",
	info: {
		title: "API for Kessoku Hub",
		version: "1.0.0",
	},
};
const options = {
	swaggerDefinition,
	// Paths to files containing OpenAPI definitions
	apis: ["./routes/*.js"],
};
const swaggerSpec = swaggerJSDoc(options);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
