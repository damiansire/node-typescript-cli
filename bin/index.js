#! /usr/bin/env node
const yargs = require("yargs");
const utils = require("./utils.js");
const readline = require("readline");
const { exec } = require("child_process");
const fs = require("fs").promises;
const util = require("util");

const execPromise = util.promisify(exec);
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (query) => {
  return new Promise((resolve) => rl.question(query, resolve));
};

const main = async () => {
  try {
    const packageName = await question("Enter package name: ");
    const packageDescription = await question("Enter package description: ");

    await execPromise("npm init --yes");

    const data = await fs.readFile("package.json", "utf8");
    const packageJson = JSON.parse(data);

    packageJson.name = packageName;
    packageJson.description = packageDescription;

    await fs.writeFile("package.json", JSON.stringify(packageJson, null, 2));

    utils.createPackage(packageName);
  } catch (error) {
    console.error(`Error: ${error}`);
  } finally {
    rl.close();
  }
};

main();
