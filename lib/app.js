let env = process.env.NODE_ENV;

// Packages
import express from "express";
import session from "express-session";
import fs from "fs";
//
import * as colors from "./consoleThemes.js";
import chalk from "chalk";
//
import { render } from "./render.js";
//
import { startDatabase } from "./db.js";

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
			secure:
				env == "dev" || env == "test" || env == "prod" ? false : true, // todo: secure: true in production
		},
	})
);

// Serve static files
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

// Import all routes
const __dirname = path.resolve();
let routes = path.resolve(__dirname, "routes");
// Create a promise array to import all routes
let routeImports = {
	promises: [],
	names: [],
};
fs.readdirSync(routes, { recursive: true }).map((file) => {
	if (file.endsWith(".js")) {
		routeImports.promises.push(import(`../routes/${file}`));
		routeImports.names.push(file);
	}
});
// Once all routes are imported, establish a 404 route
Promise.allSettled(routeImports.promises)
	.then((routes) => {
		routes.map((route, index) => {
			if (route.status == "fulfilled") {
				app.use(route.value.default);
				console.log(
					`${colors.server} Imported route ${chalk.bold(
						routeImports.names[index]
					)}`
				);
			} else {
				console.error(
					`${colors.error} Error importing route ${chalk.bold(
						routeImports.names[index]
					)}: ${route.reason}`
				);
			}
		});
	})
	.then(() => {
		// Serve 500s
		app.use((err, req, res, next) => {
			console.error(`${colors.error} ${err.stack}`);
			res.status(500);
			render(req, res, "errorPage", {
				env: env,
			});
			return next();
		});
		// Serve 404s errors
		app.use((req, res) => {
			res.status(404);
			render(req, res, "errorPage", {
				env: env,
			});
		});
	})
	.catch((err) => {
		console.error(`${colors.error} Error importing routes: ${err}`);
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
import swaggerUi from "swagger-ui-express";
import { parse } from "yaml";
//
const swaggerDoc = parse(
	fs.readFileSync(path.resolve(__dirname, "./swagger.yaml"), "utf8")
);
const options = {
	customSiteTitle: "Kessoku API",
};
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc, options));
