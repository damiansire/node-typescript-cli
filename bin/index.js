#! /usr/bin/env node
const yargs = require("yargs");
const utils = require("./utils.js");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

(async () => {
  const { default: chalk } = await import("chalk");
  const { default: boxen } = await import("boxen");

  console.log(
    "\n" +
      boxen(chalk.green("\n" + "hello this is a test" + "\n"), {
        padding: 1,
        borderColor: "green",
        dimBorder: true,
      }) +
      "\n"
  );

  rl.question("Enter package name: ", (packageName) => {
    utils.createPackage(packageName);
    rl.close();
  });
})();
