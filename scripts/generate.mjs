import { App, loadApiStructureFromRemote } from "@compas/code-gen";
import { mainFn, spawn } from "@compas/stdlib";
import Axios from "axios";

mainFn(import.meta, main);

async function main() {
  const app = new App({ verbose: true });

  let fromRemote = await loadApiStructureFromRemote(
    Axios,
    process.env.TENANT_API_URL ?? "https://api.scaffold.dev.lightbase.nl",
  );

  app.extend(fromRemote);

  await app.generate({
    outputDirectory: "./src/generated",
    isBrowser: true,
    enabledGenerators: ["type", "apiClient", "reactQuery"],
  });

  await spawn("yarn", ["format"]);
}
