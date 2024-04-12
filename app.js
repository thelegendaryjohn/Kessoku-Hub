var env = process.env.NODE_ENV;
import "dotenv/config";

// Packages
import express from "express";
import session from "express-session";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Start a server and listen to requests
export const app = express();

// Use EJS
app.set("view engine", "ejs");

// Use sessions
app.use(
	session({
		resave: false, // required: force lisghtweight session keep alive (touch)
		saveUninitialized: false, // recommended: only save session when data exists
		secret: env == "dev" ? "baocchi" : process.env.SESSION_SECRET, // recommended: the session key should be secret in production
		cookie: {
			secure: env == "dev" ? false : true,
		},
	})
);

// Serve static files
app.use(express.static("public"));

// Live reload the app
import livereload from "livereload";
import connectLivereload from "connect-livereload";
import path from "path";
const __dirname = path.resolve();
let liveReloadServer = livereload.createServer();
liveReloadServer.watch(__dirname);

// Ping browser on Express boot, once browser has reconnected and handshaken
liveReloadServer.server.once("connection", () => {
	setTimeout(() => {
		liveReloadServer.refresh("/");
	}, 100);
});

// monkey patch every served HTML so they know of changes
app.use(connectLivereload());

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
