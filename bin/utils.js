function showHelp() {
  console.log(usage);
  console.log("\nOptions:\r");
  console.log("\t--version\t      " + "Show version number." + "\t\t" + "[boolean]\r");
  console.log("    -l, --languages\t" + "      " + "List all languages." + "\t\t" + "[boolean]\r");
  console.log("\t--help\t\t      " + "Show help." + "\t\t\t" + "[boolean]\n");
}

function showAll() {
  console.log(chalk.magenta.bold("\nLanguage Name\t\tISO-639-1 Code\n"));
  for (let [key, value] of languages) {
    console.log(key + "\\t\\t" + value + "\\n");
  }
}

async function createPackage(packageData) {
  await execPromise("npm init --yes");

  const data = await fs.readFile("package.json", "utf8");
  const packageJson = JSON.parse(data);

  packageJson.name = packageData.packageName;
  packageJson.description = packageData.packageDescription;

  await fs.writeFile("package.json", JSON.stringify(packageJson, null, 2));
  console.log("paquete: ", name, "creado");
}

module.exports = {
  showAll: showAll,
  showHelp: showHelp,
  createPackage: createPackage,
};
