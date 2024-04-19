var env = process.env.NODE_ENV;
// Packages
import { createServer } from "http";
import "dotenv/config";
// Modules
import { app } from "./lib/app.js";
import chalk from "chalk";
import * as colors from "./lib/consoleThemes.js";

// Start a HTTP server. Listen to 80 in production, 3000 / specified port in development
const server = createServer(app);
server.listen(env == "dev" ? 3000 : 80, () => {
	//
	console.log(`${colors.server} Server started in ${chalk.bold(env)} mode`);
	//
	console.log(
		`${colors.server} Server started on ${chalk.bold(
			`http://localhost:${server.address().port}`
		)}`
	);
});
