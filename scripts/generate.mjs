import { App, loadApiStructureFromRemote } from "@compas/code-gen";
import { mainFn, spawn } from "@compas/stdlib";
import Axios from "axios";

mainFn(import.meta, main);

async function main() {
  const app = new App({ verbose: true });
  App.defaultEslintIgnore.push(
    "@typescript-eslint/no-explicit-any",
    "unused-imports/no-unused-imports",
    "@typescript-eslint/no-unused-vars",
    "@typescript-eslint/no-empty-interface",
    "@typescript-eslint/ban-types",
  );

  let fromRemote = await loadApiStructureFromRemote(
    Axios,
    process.env.TENANT_API_URL ?? "https://api.scaffold.acc.lightbase.nl",
  );

  app.extend(fromRemote);

  await app.generate({
    outputDirectory: "./src/generated",
    isBrowser: true,
    enabledGenerators: ["type", "apiClient", "reactQuery"],
  });

  await spawn("yarn", ["format"]);
}
