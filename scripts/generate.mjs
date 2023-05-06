import { Generator, loadApiStructureFromRemote } from "@compas/code-gen";
import { environment, mainFn, spawn } from "@compas/stdlib";
import Axios from "axios";

process.env.NODE_ENV = "development";
mainFn(import.meta, main);

async function main() {
  const generator = new Generator();

  generator.addStructure(
    await loadApiStructureFromRemote(
      Axios,
      environment.TENANT_API_URL ?? "https://api.scaffold.acc.lightbase.nl",
    ),
  );

  generator.generate({
    targetLanguage: "ts",
    outputDirectory: "src/generated",
    generators: {
      apiClient: {
        target: {
          library: "axios",
          targetRuntime: "browser",
          // globalClients: true,
          includeWrapper: "react-query",
        },
      },
    },
  });

  await spawn("yarn", ["format"]);
}
