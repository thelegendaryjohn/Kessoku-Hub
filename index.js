const env = process.env.NODE_ENV;
// Packages
import { createServer as createHttpServer } from "http";
import { createServer as createHttpsServer } from "https";
import { readFileSync } from "fs";
import "dotenv/config";
// Modules
import { app } from "./lib/app.js";
import chalk from "chalk";
import * as colors from "./lib/consoleThemes.js";

let server;
let port;

switch (env) {
	case "dev":
		port = 3000;
		server = createHttpServer(app);
		break;
	case "prod": {
		port = 443;
		// Load certificates
		const privateKey = readFileSync(
			"/etc/letsencrypt/live/bocchi.band/privkey.pem",
			"utf8"
		);
		const certificate = readFileSync(
			"/etc/letsencrypt/live/bocchi.band/fullchain.pem",
			"utf8"
		);
		const credentials = { key: privateKey, cert: certificate };
		server = createHttpsServer(credentials, app);
		break;
	}
	case "prodtest":
		port = 80;
		server = createHttpServer(app);
		break;
	default:
		port = 3000;
		server = createHttpServer(app);
		break;
}

server.listen(port, () => {
	console.log(`${colors.server} Server started in ${chalk.bold(env)} mode`);
	console.log(
		`${colors.server} Server started on ${chalk.bold(
			`http${env === "prod" ? "s" : ""}://localhost:${
				server.address().port
			}`
		)}`
	);
});
