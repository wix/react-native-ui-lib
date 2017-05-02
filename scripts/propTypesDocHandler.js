const _ = require('lodash');
const {utils} = require('react-docgen');
const {parseJsDoc, getMemberValuePath, resolveToValue, docblock} = utils;
const {getDocblock} = docblock;

/**
 * Extract info on the component props
 */
function propTypesDocsHandler(documentation, path) {
  const propTypesPath = getMemberValuePath(path, 'propTypes');
  const docComment = getDocblock(propTypesPath.parent);

  const statementPattern = /@.*\:/;
  const info = {};
  if (docComment) {
    const infoRaw = _.split(docComment, '\n');
    _.forEach(infoRaw, (statement) => {
      if (statement && statementPattern.test(statement)) {
        const key = statement.match(statementPattern)[0].slice(1, -1);
        info[key] = statement.split(statementPattern)[1].trim();
      }
    });
  }
  documentation.set('propsInfo', info);
}

module.exports = propTypesDocsHandler;
