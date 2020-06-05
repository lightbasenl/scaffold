const fs = require("fs");
const path = require("path");

module.exports = fail => {
  const helpersPath = path.join(__dirname, "./../src/helpers");

  const files = fs.readdirSync(helpersPath);

  const tests = files.filter(file => file.match(/\.test\.(ts|tsx)$/));
  const helpers = files.filter(file => !file.match(/\.test\.(ts|tsx)$/));

  helpers.forEach(helper => {
    if (!tests.find(test => test.match(/\.test\.(ts|tsx)$/))) {
      fail(`There is a test missing for ${helper} in src/helpers`);
    }
  });
};
