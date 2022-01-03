import { Request, Response, NextFunction as Next } from "express";
import * as chalk from "chalk";
import { log } from "util";


const red = chalk.default.redBright;
const green = chalk.default.greenBright;
const yellow = chalk.default.yellowBright;
const cyan = chalk.default.cyanBright.bold;
const bgRed = chalk.default.bgRedBright;
const bgGreen = chalk.default.bgGreenBright;
const bgYellow = chalk.default.bgYellow;

interface Logger {
    method: String,
    url: String,
    status: Number,
    time: Number
}

export const requestLogger = (req: Request, res: Response, next: Next) => {
    log(green(`${req.method} ${req.originalUrl}`));
    const start = new Date().getTime();
    res.on("finish", () => {
        const elapsed = new Date().getTime() - start;
        reqConsoleLogger({
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            time: elapsed
        });
    });
    next();
};


const reqConsoleLogger = (logValue: Logger) => {
    let { status, method, url, time } = logValue;
    if (status < 400) {
        log(green(`${method} ${url} -> `) + bgGreen(`${status}`) + cyan(` ${time}ms`));
    } else if (status < 500) {
        log(yellow(`${method} ${url} -> `) + bgYellow(`${status}`) + cyan(` ${time}ms`));
    } else {
        log(red(`${method} ${url} -> `) + bgRed(`${status}`) + cyan(` ${time}ms`));
    }
}
