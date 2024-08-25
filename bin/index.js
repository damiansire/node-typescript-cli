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
    //Create package.json
    const packageData = {};
    packageData.packageName = await question("Enter package name: ");
    packageData.packageDescription = await question("Enter package description: ");
    await utils.createPackage(packageData);
  } catch (error) {
    console.error(`Error: ${error}`);
  } finally {
    rl.close();
  }
};

main();
