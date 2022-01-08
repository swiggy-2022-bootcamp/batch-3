# Swiggy i++ Week - 0

This repository contains the backend code for the meeting app (PS-1) given to us as a part of our evaluation. 

**Postman Collection**: [https://www.getpostman.com/collections/459d249e8ad1bc320f36](https://www.getpostman.com/collections/459d249e8ad1bc320f36)


# Pre-reqs
To build and run this app locally you will need a few things:
- Install [Node.js](https://nodejs.org/en/)
- Install [MongoDB](https://docs.mongodb.com/manual/installation/)
- Install [VS Code](https://code.visualstudio.com/)

# Getting started
- Clone the repository
```
git clone https://github.com/swiggy-2022-bootcamp/batch-3 -b ishan-chaudhary
```
- Install dependencies
```
cd <project_name>
npm install
```
- Configure your mongoDB server
```bash
# create the db directory
We will be using monogoDB atlas cloud database.

```
- Build and run the project
```
npm run compile
```

Finally, navigate to `http://localhost:8070` and you should see the APIs being served and rendered locally!

## Project Structure

TypeScript (`.ts`) files live in our `src` folder and after compilation are output as JavaScript (`.js`) in the `dist` folder.

The full folder structure of this app is explained below:

> **Note!** Make sure you have already built the app using `npm run compile`

| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **.vscode**              | Contains VS Code specific settings                                                            |
| **dist**                 | Contains the distributable (or output) from your TypeScript build. This is the code you ship  |
| **node_modules**         | Contains all your npm dependencies                                                            |
| **src**                  | Contains your source code that will be compiled to the dist dir                               |
| **src/config**           | Contains configuration data for database,jwt and other dependencies                           |
| **src/components**       | An component represents an entity, it completely defines the functionality of that entity.    |
| **src/lib**              | Contains helpers, midlewares and utility functions.                                           |
| **src/routes**           | It contains an array of all the routes in the application.                                    |
| **src/types**            | Holds .d.ts files not found on DefinitelyTyped. Covered more in this [section](#type-definition-dts-files)          |
| **src**/server.ts        | Entry point to your express app                                                               |
| config.env               | API keys, tokens, passwords, database URI. Clone this, but don't check it in to public repos. |
| package.json             | File that contains npm dependencies as well as [build scripts](#what-if-a-library-isnt-on-definitelytyped)                          |
| tsconfig.json            | Config settings for compiling server code written in TypeScript                               |
| tsconfig.tests.json      | Config settings for compiling tests written in TypeScript                                     |
| .eslintrc                | Config settings for ESLint code style checking                                                |
| .eslintignore            | Config settings for paths to exclude from linting                                             |
