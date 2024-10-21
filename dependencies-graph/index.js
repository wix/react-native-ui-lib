// const path = require('path');
const Builder = require('./builder');
const Parser = require('./parser');
const verbose = false;
const parser = new Parser({verbose});
const builder = new Builder(process.argv.slice(2), parser);

builder.buildComponents();

// const componentsFileName = path.join(__dirname, '/components.json');
// builder.writeToFile(componentsFileName);
// builder.readFromFile(componentsFileName);

const DOTbuilder = require('./DOTbuilder');
dotBuilder = new DOTbuilder(builder);
dotBuilder.buildDOTString();

console.log(dotBuilder.getDOTString());
