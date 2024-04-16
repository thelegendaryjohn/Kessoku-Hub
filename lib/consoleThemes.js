import chalk from "chalk";

export const server = chalk.bold.bgGreenBright.white("server");
export const db = chalk.bold.bgCyanBright.white("database");
export const error = chalk.bold.white.bgRedBright("error");
export const warning = chalk.hex("#FFA500").bold("warning");
