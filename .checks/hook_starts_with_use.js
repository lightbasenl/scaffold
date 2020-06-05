const fs = require("fs");
const path = require("path");

module.exports = fail => {
  const hooksPath = path.join(__dirname, "./../src/hooks");

  const files = fs.readdirSync(hooksPath);

  files.forEach(file => {
    if (!file.match(/^use/) && file.charAt(0) !== ".") {
      fail(`There is a file that doesn't start with "use" in src/hooks: ${file}`);
    }
  });
};
