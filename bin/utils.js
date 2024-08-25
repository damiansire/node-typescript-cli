const fs = require("fs").promises;
const util = require("util");
const { exec } = require("child_process");
const path = require("path");
const execPromise = util.promisify(exec);

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
  packageJson.scripts.build = "tsc";

  await fs.writeFile("package.json", JSON.stringify(packageJson, null, 2));
  console.log("paquete: ", packageData.packageName, "creado");
}

const createGitignore = async () => {
  const gitignoreContent = "dist/\nnode_modules/\n";
  const gitignorePath = path.join(process.cwd(), ".gitignore");
  await fs.writeFile(gitignorePath, gitignoreContent);
  console.log(".gitignore file created with dist and node_modules directories ignored.");
};

const initializeGit = async () => {
  try {
    // Initialize a new git repository
    await execPromise("git init");
    console.log("Git repository initialized.");

    // Add all files to the staging area
    await execPromise("git add .");
    console.log("Files added to staging area.");

    // Commit the changes with a message
    await execPromise('git commit -m "initial"');
    console.log("Initial commit made.");
  } catch (error) {
    console.error(`Error initializing Git: ${error}`);
  }
};

const createTypescriptProject = async () => {
  console.log("Instaling Typescript.");
  await execPromise("npm i -D typescript");
  console.log("Initializing Typescript");
  // Define la configuración de tsconfig
  const tsconfig = {
    files: ["src/index.ts"],
    compilerOptions: {
      target: "es2015",
      module: "es2015",
      declaration: true,
      outDir: "./dist",
      noEmit: false,
      strict: true,
      noImplicitAny: true,
      strictNullChecks: true,
      strictFunctionTypes: true,
      strictBindCallApply: true,
      strictPropertyInitialization: true,
      noImplicitThis: true,
      alwaysStrict: true,
      noUnusedLocals: true,
      noUnusedParameters: true,
      noImplicitReturns: true,
      noFallthroughCasesInSwitch: true,
      noUncheckedIndexedAccess: true,
      noImplicitOverride: true,
      noPropertyAccessFromIndexSignature: true,
      esModuleInterop: true,
      forceConsistentCasingInFileNames: true,
      skipLibCheck: true,
    },
  };

  const tsconfigPath = path.join(process.cwd(), "tsconfig.json");

  try {
    // Escribe el archivo tsconfig.json de manera asíncrona
    await fs.writeFile(tsconfigPath, JSON.stringify(tsconfig, null, 2));
    console.log("tsconfig.json created successfully.");
  } catch (err) {
    console.error("Error creating tsconfig.json:", err);
    process.exit(1);
  }
};

module.exports = {
  showAll: showAll,
  showHelp: showHelp,
  createPackage: createPackage,
  createGitignore,
  initializeGit,
  createTypescriptProject,
};
