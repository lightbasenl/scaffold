const checks = [
  require("./component_has_story"),
  require("./helper_has_test"),
  require("./hook_starts_with_use"),
];

let fails = 0;

function fail(message) {
  console.log(`\x1b[41m[ FAILED ]\x1b[0m - ${message}`);
  fails++;
}

console.log("\nPerforming checks...\n");

checks.forEach(check => {
  check(fail);
});

if (fails > 0) {
  console.error(`\x1b[31m${fails} check(s) failed\x1b[0m`);
  process.exitCode = 1;
} else {
  console.log("\x1b[32mAll checks passed. 🎉");
}
