# Custom DOM Parser

A simple DOM parser implemented in Node.js using the `htmlparser2` library. This project demonstrates how to parse an HTML file and convert it into a DOM tree-like structure using custom classes. The custom DOM structure allows you to manipulate and search through the parsed HTML, similar to how the browser's DOM works.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Code Explanation](#code-explanation)
- [License](#license)

## Installation

1. Clone the repository to your local machine:
   ```
   git clone https://github.com/Mdshahid123/Custom-Dom-Parser.git
   ```
2. Navigate to the project directory:
   ```
   cd Custom-Dom-Parser
3. Install the dependencies:
   ```
    npm install
   ```
## usage
  1. Create the HTML File: Place your HTML content in the index.html file. For example:
  ```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    <div id="root">
      <p class="text">Hello, world!</p>
      <h1 id="title">Title</h1>
      <p id="fahad">This is a paragraph tag</p>
      <header id="header">This is a header tag</header>
    </div>
  </body>
</html>
```
2. Run the Script: Execute the script.js file to parse the index.html file and search for a specific element:
```
node script.js
```
The output will show the parsed DOM tree and display the element with the specified id (e.g., header).

Code Explanation
customDom.js:

Contains a Node class that represents HTML elements as nodes in a tree.
The parseHTMLToDom function processes the HTML content, converts it into a DOM tree, and allows you to traverse or manipulate the DOM.
The getElementById method allows you to search for an element with a specific id.

script.js:

Reads the HTML content from the index.html file.
Uses parseHTMLToDom to parse the HTML and search for specific elements by their id.
index.html:

An HTML file containing the structure to be parsed and searched.
Example Output
After running script.js, if the element with the ID header exists, the output will look like this:

```
Parsed DOM:
<body>
  <div id="root">
    <p class="text">Hello, world!</p>
    <h1 id="title">Title</h1>
    <p id="fahad">This is a paragraph tag</p>
    <header id="header">This is a header tag</header>
  </div>
</body>

Found element:
<header id="header">This is a header tag</header>
```
If the element is not found, the output will indicate that no such element exists:
```
Parsed DOM:
<body>
  <div id="root">
    <p class="text">Hello, world!</p>
    <h1 id="title">Title</h1>
    <p id="fahad">This is a paragraph tag</p>
    <header id="header">This is a header tag</header>
  </div>
</body>

Element not found.
```




