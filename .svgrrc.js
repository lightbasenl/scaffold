// .svgrrc.js

const path = require("path");

function defaultIndexTemplate(filePaths) {
  const exportEntries = filePaths.map(filePath => {
    const basename = path.basename(filePath, path.extname(filePath));
    const exportName = /^\d/.test(basename) ? `Svg${basename}` : basename;
    return `export { default as Svg${exportName} } from './${basename}'`;
  });
  return exportEntries.join("\n");
}

const template = (variables, { tpl }) => {
  return tpl`
import * as React from "react";
import type { SVGProps } from "react";

${variables.interfaces};

function ${variables.componentName}(${variables.props}) {
  return (
    ${variables.jsx}
  );
}
 
${variables.exports};
`;
};

module.exports = {
  template: template,
  indexTemplate: defaultIndexTemplate,
  typescript: true,
  ignoreExisting: true,
  svgoConfig: {
    plugins: [
      {
        name: "removeViewBox", // needs to be disabled in order for "removeDimensions" to work
        active: false,
      },
      {
        name: "removeDimensions",
        active: true,
      },
      {
        name: "removeXMLNS",
        active: true,
      },
    ],
  },
};
