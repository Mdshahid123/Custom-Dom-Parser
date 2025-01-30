const fs = require("fs");
const { parseHTMLToDom } = require("./customDom");

// Read the HTML file (index.html) and process it
fs.readFile("index.html", "utf-8", (err, html) => {
  if (err) {
    console.error("Error reading HTML file:", err);
    return;
  }

  parseHTMLToDom(html).then(rootNode => {
    // Access the 'header' element by its id
    const headerElement = rootNode.getElementById("navbar");
    if (headerElement) {
      console.log("found element",headerElement);
    } else {
      console.log("Element not found.");
    }
  }).catch(err => {
    console.error("Error parsing HTML:", err);
  });
});
