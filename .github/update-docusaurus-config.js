// This script updates the `future` property in the Docusaurus configuration file.
// It is called from the GitHub Actions workflow propagate-config.yml to ensure 
// the latest configuration is applied.

const fs = require("fs");
const { parse } = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const recast = require("recast");
const t = require("@babel/types"); // Helper for AST nodes

const text = fs.readFileSync("docusaurus.config.js", "utf-8");
const ast = parse(text, { sourceType: "module", plugins: ["jsx"] });

let futureValue = null;
let foundFuture = false;

traverse(ast, {
  ObjectProperty(path) {
    if (path.node.key.name === "future") {
      // You can convert this AST node to a JS object with further work
      futureValue = path.node.value; // AST Node!

      console.log("Found future in Source");

      const destination_text = fs.readFileSync(
        "targetrepo/docusaurus.config.js",
        "utf-8"
      );
      const destination_ast = parse(destination_text, {
        sourceType: "module",
        plugins: ["jsx"],
      });
      traverse(destination_ast, {
        ObjectProperty(path) {
          if (path.node.key.name === "future") {
            // Replace the value of the future property in the destination AST
            path.node.value = futureValue; // Use the AST node directly
            const output = recast.print(destination_ast).code;
            fs.writeFileSync("targetrepo/docusaurus.config.js", output);

            console.log(
              "Updated docusaurus.config.js in targetrepo with new future value."
            );
            foundFuture = true;
            return; // Exit the loop after updating
          }
        },
      });
    }
  },
});

if (!futureValue) {
  console.error("No future found");
  return;
}

if (!foundFuture) {
  console.log(
    "No future found in targetrepo/docusaurus.config.js, adding it now."
  );
  const destination_text = fs.readFileSync(
    "targetrepo/docusaurus.config.js",
    "utf-8"
  );
  const destination_ast = parse(destination_text, {
    sourceType: "module",
    plugins: ["jsx"],
  });

  // Add the future property to the customFields object
  traverse(destination_ast, {
    VariableDeclarator(path) {
      if (
        path.node.id.name === "config" &&
        path.node.init.type === "ObjectExpression"
      ) {
        const props = path.node.init.properties;

        props.push(t.objectProperty(t.identifier("future"), futureValue));

        const output = recast.print(destination_ast).code;
        fs.writeFileSync("targetrepo/docusaurus.config.js", output);
        console.log(
          "Added future to customFields in targetrepo/docusaurus.config.js."
        );
      }
    },
  });
}
