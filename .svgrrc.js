const path = require("path");

function defaultIndexTemplate(filePaths) {
    const exportEntries = filePaths.map((filePath) => {
        const basename = path.basename(filePath, path.extname(filePath));
        const exportName = /^\d/.test(basename) ? `Svg${basename}` : basename;
        return `export { default as Icon${exportName} } from "./${basename}";`;
    });
    return exportEntries.join("\n");
}

module.exports = {
    indexTemplate: defaultIndexTemplate,
    typescript: true,
    ignoreExisting: true,
    svgoConfig: {
        plugins: [
            {
                name: "removeViewBox",
                active: false
            },
            {
                name: "removeXMLNS",
                active: true
            }
        ]
    }
};
