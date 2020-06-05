const fs = require("fs");
const path = require("path");

module.exports = fail => {
  const componentsPath = path.join(__dirname, "./../src/components");

  const files = fs.readdirSync(componentsPath);

  const components = files.filter(file => !file.match(/.story.(tsx|mdx)$/));
  const stories = files.filter(file => file.match(/.story.(tsx|mdx)$/));

  components.forEach(component => {
    const name = component.split(".")[0];

    if (!stories.find(file => file.startsWith(name))) {
      fail(`There is a story missing for ${name} in src/components`);
    }
  });
};
