const htmlparser = require("htmlparser2");

class Node {
  constructor(type, name, attributes = {}, children = []) {
    this.type = type;  // 'tag' or 'text'
    this.name = name;  // 'div', 'p', 'h1', etc.
    this.attributes = attributes;  // Attributes like id, class, etc.
    this.children = children;  // Child nodes (text or other elements)
  }

  render(indent = 0) {
    let indentStr = "  ".repeat(indent);
    let output = `${indentStr}<${this.name}`;

    // Add attributes
    for (let key in this.attributes) {
      output += ` ${key}="${this.attributes[key]}"`;
    }

    output += ">";

    // Add children nodes (if any)
    if (this.children.length > 0) {
      output += "\n";
      let childContent = this.children
        .map(child => {
          if (child instanceof Node) {
            return child.render(indent + 1);  // Render child nodes
          } else if (child.type === 'text') {
            return `${"  ".repeat(indent + 1)}${child.data}`;  // Render text content
          }
          return '';
        })
        .join("\n");
      output += childContent;
      output += `\n${indentStr}</${this.name}>`;
    } else {
      output += `</${this.name}>`;
    }

    return output;
  }

  getElementById(id) {
    // Check if the current node is a tag and has the desired id
    if (this.type === 'tag' && this.attributes.id === id) {
      return this.render();  // Return the rendered HTML of the element
    }

    // Recursively check the children nodes
    for (let child of this.children) {
      if (child instanceof Node) {  // Only check child nodes that are instances of Node
        const found = child.getElementById(id);
        if (found) return found;
      }
    }

    return null;  // Return null if the element is not found
  }
}

// Function to parse the HTML string and create a DOM tree from it
function parseHTMLToDom(html) {
  return new Promise((resolve, reject) => {
    const handler = new htmlparser.DomHandler((error, dom) => {
      if (error) {
        reject('Error while parsing:', error);
      } else {
        // Find the first <html> node (we're ignoring the doctype for simplicity)
        const rootNode = dom.find(node => node.type === 'tag' && node.name === 'html');

        if (!rootNode) {
          reject("Couldn't find <html> node.");
          return;
        }

        // Now, look for the <body> tag inside <html> and convert it to our Node structure
        const bodyNode = rootNode.children.find(child => child.type === 'tag' && child.name === 'body');
        if (bodyNode) {
          const bodyElement = new Node('tag', 'body', {}, bodyNode.children.map(child => {
            if (child.type === 'text') {
              return new Node('text', '', {}, [child.data]);
            }
            return new Node('tag', child.name, child.attribs, child.children.map(childChild => {
              if (childChild.type === 'text') {
                return new Node('text', '', {}, [childChild.data]);
              }
              return new Node('tag', childChild.name, childChild.attribs, childChild.children);
            }));
          }));

          console.log("Parsed DOM:");
          console.log(bodyElement.render());  // Log the body element structure
          resolve(bodyElement);  // Return the body node
        } else {
          reject("Couldn't find <body> node.");
        }
      }
    });

    const parser = new htmlparser.Parser(handler);
    parser.write(html);
    parser.end();
  });
}

module.exports = { parseHTMLToDom };
