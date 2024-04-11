const Builder = require('./builder');
const Parser = require('./parser');
const verbose = false;
const parser = new Parser({verbose});
const builder = new Builder(process.argv.slice(2), parser);

builder.buildComponents();

const DOTbuilder = require('./DOTbuilder');
dotBuilder = new DOTbuilder(builder);
dotBuilder.buildDOTString();

console.log(dotBuilder.getDOTString());
