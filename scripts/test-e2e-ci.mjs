import { exec, spawn, mainFn, AppError } from "@compas/stdlib";
import path from "node:path";
import childProcess from "node:child_process";
import treeKill from "tree-kill";

mainFn(import.meta, main);

async function main() {
  const apiOpts = {
    cwd: path.resolve(process.env.CI ? "../backend" : "../scaffold-backend"),
    encoding: "utf8",
  };

  await Promise.all([
    execOrLog("yarn build"),
    execOrLog("yarn compas docker up && yarn compas migrate", apiOpts),
  ]);

  const apiInstance = spawnApi(apiOpts, {
    onError(error) {
      const logs = apiInstance.collectLogs();

      console.log("API failure:");
      console.dir(AppError.format(error), { colors: true, depth: null });
      console.log();
      console.log("API Logs:");
      console.log(logs);

      process.exit(1);
    },
  });

  const { exitCode } = await spawn("yarn", ["test:e2e"]);

  await apiInstance.exit();
  if (exitCode !== 0) {
    const logs = apiInstance.collectLogs();
    console.log("API Logs:");
    console.log(logs);
  }

  process.exit(exitCode);
}

/**
 *
 * @param {string} command
 * @param {import("child_process").ExecOptions} [execOptions]
 * @returns {Promise<void>}
 */
async function execOrLog(command, execOptions) {
  console.log(`Running '${command}'...`);
  const { exitCode, stdout, stderr } = await exec(command, execOptions);

  if (exitCode !== 0) {
    console.log(`Command failed: ${command}`);
    console.log();
    console.log("Stdout:");
    console.log(stdout);
    console.log();
    console.log("Stderr:");
    console.log(stderr);

    process.exit(1);
  }

  console.log(`Done with '${command}'`);
}

/**
 * Run the api, with the option to process logs or killing it.
 *
 * @param {import("child_process").SpawnOptions} [spawnOptions]
 * @param {(error: Error) => void} onError
 * @returns {{exit(): Promise<unknown>, collectLogs(): string}}
 */
function spawnApi(spawnOptions, { onError }) {
  const logs = [];

  const spawned = childProcess.spawn("yarn", ["compas", "run", "api"], spawnOptions);
  spawned.on("error", onError);

  spawned.stdout.on("data", chunk => {
    logs.push(chunk);
  });

  return {
    collectLogs() {
      return Buffer.concat(logs).toString("utf-8").substring(logs.length - 500);
    },
    exit() {
      return new Promise(r => {
        spawned.on("close", r);
        treeKill(spawned.pid);
      });
    },
  };
}
