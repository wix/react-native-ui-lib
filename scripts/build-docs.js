const fs = require('fs');
const _ = require('lodash');
const path = require('path');
const recursive = require('recursive-readdir'); // eslint-disable-line
const docgen = require('react-docgen'); // eslint-disable-line
const propTypesDocHandler = require('./utils/propTypesHandler');

const SRC_PATH = path.join(path.resolve(__dirname), '../src/components');

console.info('BUILDING DOCS');
console.info('SEARCHING COMPONENTS IN:', SRC_PATH);

extractDocs(SRC_PATH);

function extractDocs(srcPath) {
  return new Promise((res) => {
    const resolver = docgen.resolver.findExportedComponentDefinition;
    const handlers = _.toArray(docgen.handlers).concat([propTypesDocHandler]);
    let docs;
    recursive(srcPath, (err, files) => {
      docs = _.map(files, (file) => {
        try {
          const src = fs.readFileSync(file);
          const documentation = docgen.parse(src, resolver, handlers);
          return documentation;
        } catch (error) {
          console.log('could not extract file', file);
        }
      });
      docs = _.filter(docs, Boolean);
      res(docs);
    });
  });
}
