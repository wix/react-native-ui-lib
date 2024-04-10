const Builder = require('./builder');
const verbose = false;
const builder = new Builder(verbose);

builder.buildComponents();

const DOTbuilder = require('./DOTbuilder');
dotBuilder = new DOTbuilder(builder);
dotBuilder.buildDOTString();

console.log(dotBuilder.getDOTString());
