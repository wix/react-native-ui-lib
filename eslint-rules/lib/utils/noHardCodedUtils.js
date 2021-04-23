const {findValueNodeOfIdentifier} = require('./generalUtils');

function _isLiteral(type) {
  return (type === 'Literal' || type === 'TemplateLiteral');
}

function findAndReportHardCodedValues(value, reporter, context, depthOfSearch = 4) {
  if (depthOfSearch === 0) return;
  if (value === undefined || value === false) return;
  if (_isLiteral(value.type)) {
    reporter(value);
  } else if (value.type === 'ConditionalExpression') {
    findAndReportHardCodedValues(value.consequent, reporter, context, depthOfSearch - 1);
    findAndReportHardCodedValues(value.alternate, reporter, context, depthOfSearch - 1);
  } else if (value.type === 'Identifier') {
    findAndReportHardCodedValues(findValueNodeOfIdentifier(value.name, context.getScope()), reporter, context, depthOfSearch - 1);
  }
}

module.exports = {
  findAndReportHardCodedValues
};
