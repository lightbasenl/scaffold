import { App, loadFromRemote } from "@compas/code-gen";
import { mainFn, spawn } from "@compas/stdlib";
import Axios from "axios";

mainFn(import.meta, main);

async function main() {
  const app = new App({ verbose: true });

  let fromRemote;

  try {
    fromRemote = await loadFromRemote(
      Axios,
      process.env.API_URL || process.env.NEXT_PUBLIC_API_URL,
    );
  } catch (e) {
    if (e.isAxiosError) {
      fromRemote = await loadFromRemote(Axios, process.env.PROXY_URL);
    } else {
      throw e;
    }
  }

  app.extend(fromRemote);

  await app.generate({
    outputDirectory: "./src/generated",
    isBrowser: true,
    enabledGenerators: ["type", "apiClient", "reactQuery"],
  });

  await spawn("yarn", ["pretty"]);
}
