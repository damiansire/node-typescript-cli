#! /usr/bin/env node
const yargs = require("yargs");
const utils = require("./utils.js");
const readline = require("readline");
const { exec } = require("child_process");
const fs = require("fs").promises; // Usar la versión de promesas de fs
const util = require("util");
const exec = util.promisify(require("child_process").exec);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter package name: ", async (packageName) => {
  try {
    await exec("npm init --yes");

    const data = await fs.readFile("package.json", "utf8");
    const packageJson = JSON.parse(data);

    packageJson.name = packageName;
    packageJson.description = "Your project description here";

    await fs.writeFile("package.json", JSON.stringify(packageJson, null, 2));

    utils.createPackage(packageName);
    rl.close();
  } catch (error) {
    console.error(`Error: ${error}`);
  }
});
