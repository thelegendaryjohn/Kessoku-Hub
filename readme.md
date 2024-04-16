# Kessoku Hub

## Description

This repository is intended to be submitted as the project for RMIT Vietnam's COSC3058 Web Studio course - a fansite for the anime band Kessoku!

## Getting Started

To get started with this project, follow these steps:

### Prerequisite:

-   Make sure you have [Node.js](https://nodejs.org/en/download/) installed on your machine.
-   If you're in the main Kessoku team, add a `.env` file to this repo after cloning, then request Cyfer for the data.

1. Clone the repository: `git clone https://github.com/AzzaDeveloper/kessoku-hub`
2. Install the dependencies: `npm install`
3. Start the project: `npm start`. For production usage, run `npm production` instead.

## Recommended Extensions

We use the [**Prettier**](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extension for code formatting.

## Contributing

We recommend having basic understanding of `git`, `github` and `nodejs` and giving the project structure a thorough look first.

Then, follow these steps to contribute to this project:

1. **Create a New Branch**: Create a new branch for your changes using the `git switch` command. Replace `<branch-name>` with a name for your branch: `git switch <branch-name>`.
2. **Make Your Changes**: Make the changes you want to contribute. Be sure to test your changes thoroughly, and comment your code properly.
3. **Commit Your Changes**: Stage your changes with `git add .`, then commit them with `git commit -m "Your detailed commit message"`.
4. **Push Your Changes**: Push your changes to your forked repository on GitHub with `git push origin <branch-name>`.
5. **Submit a Pull Request**: Go to the repository on GitHub and click the "New pull request" button. Select your branch from the dropdown menu and click "Create pull request".

Remember to provide a detailed description of the changes in your pull request. Feel free to ask Cyfer if you're confused on any matter.

# Documentation

The documentation for the API can be accessed through the `/docs` route.

## Dependencies

This project uses the following packages:

-   [`express`](https://www.npmjs.com/package/express): A framework for building web applications on Node.js.
-   [`express-session`](https://www.npmjs.com/package/express-session): Manages session data between http requests.
-   [`express-ratelimit`](https://www.npmjs.com/package/express-ratelimit): Limits the number of requests a client can make.
-   [`ejs`](https://www.npmjs.com/package/ejs): A JavaScript templating engine for generating HTML.
-   [`mongoose`](https://www.npmjs.com/package/mongoose): A MongoDB object modeling tool.
-   [`dotenv`](https://www.npmjs.com/package/dotenv): Loads environment variables from a `.env` file.

And these additional packages to aid development (cyfer tip - you don't need to read them. Just `npm i` and `npm start` :D):

-   [`nodemon`](https://www.npmjs.com/package/nodemon): Automatically restarts your Node.js application when file changes are detected.
-   [`livereload`](https://www.npmjs.com/package/livereload): Monitors changes in the file system and automatically refreshes the browser.
-   [`livereload-connect`](https://www.npmjs.com/package/connect-livereload): Middleware that adds livereload script to the response for enabling live reloading.
-   [`swagger-jsdoc`](https://www.npmjs.com/package/swagger-jsdoc): Generates Swagger doc based on JSDoc. This will be used to better document our API.
-   [`swagger-ui-express`](https://www.npmjs.com/package/swagger-ui-express): Serves automatically generated Swagger UI docs from express.

## Credits

Thank you to Johnny, Khanh and Thong as well as me for bringing this project to life!
