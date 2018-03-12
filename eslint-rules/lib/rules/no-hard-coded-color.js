
const _ = require('lodash');
const colors  = require('../../../dist/style/colors').colorsPallete;
const invertedColorsDict = _.invert(colors)

module.exports = {
  meta: {
    docs: {
      description: 'disallow hard coded colors',
      category: 'Possible Errors',
      recommended: true,
    },
    fixable: 'whitespace',
    schema: [], // no options
  },
  create(context) {

    //Helpers
    const colorKeys = ['color', 'backgroundColor', 'borderColor'];
    function isHex(s) {
      if (s.length === 7 && s[0] === "#") {
        return true;
      }
      return false
    }
    
    function isString(type) {
      return (type === 'Literal' || type === 'TemplateLiteral')
    }

    function findValueNodeOfIdentifier(name) {
      const varsInScope = context.getScope().variables
      let valueNode = false;
      varsInScope.forEach(variable => {
        if (variable.name === name) {
          valueNode = variable.defs[variable.defs.length - 1].node.init
        }
      })
      return valueNode
    }

    function findRawValueAndReport(value, reporter) {
      if (isString(value.type)) {
        reporter(value)
      } else if (value.type === "ConditionalExpression") { 
        findRawValueAndReport(value.consequent, reporter)
        findRawValueAndReport(value.alternate, reporter)
      } else if (value.type === "Identifier") {
        findRawValueAndReport(findValueNodeOfIdentifier(value.name), reporter)
      }
    }
    function reportAndFixHardCodedColorString(node) {
      context.report({
        node,
        message: "Use UILib colors instead of hardcoded colors.",  
        fix: function(fixer) {
          if (node.extra) {
            const colorString = node.extra.rawValue
          if (invertedColorsDict[colorString]) {
            return fixer.replaceText(node, `Colors.${invertedColorsDict[colorString]}`)
          }
          return fixer.insertTextAfter(node, ` Colors. not work the if  `);
          }
        }
      });
    }  

    return {
      // ObjectExpression: function (node) {
      //   node.properties.forEach((property) => {
      //     if (property.key) {
      //       const propName = property.key.name;
      //       if (colorKeys.indexOf(propName) !== -1) {
      //         findRawValueAndReport(property.value, reportAndFixHardCodedColorString)
      //       } 
      //     }
      //     return
      //   });
      // },
      // "CallExpression[arguments.length != 0][callee.object.name=StyleSheet][callee.property.name=create]": function (node) {
      //   if (node.arguments[0].type === "ObjectExpression") {
      //     node.arguments[0].properties.forEach(prop => {
      //       if (prop.value.type === "ObjectExpression") {
      //       	prop.value.properties.forEach(style => {
      //             if (['color', 'backgroundColor'].indexOf(style.key.name) !== -1) {
      //               if (style.value.type === 'Literal' || style.value.type === 'TemplateLiteral') {
      //               	context.report({
      //                     node: style.key,
      //                     message: style.key.name,
      //         			  });
      //               } else { 
                      
      //               }	
      //             }
      //           })
      //       }
      //     }) 
      //  }
      // },
  //   "CallExpression[arguments.length != 0]": function (node) {
  //     if (node.callee.type === "MemberExpression" &&
  //         (node.callee.object.name==="StyleSheet" && node.callee.property.name==="create" )) {
  //         if (node.arguments[0].type === "ObjectExpression") {
  //           node.arguments[0].properties.forEach((component) => { 
  //             context.report({
  //             node,
  //             message: component.key.name
  //             });
  //           })
            
  //     }
  //     }
      
  // },
    "CallExpression[arguments.length != 0][callee.object.name=StyleSheet][callee.property.name=create] ObjectExpression": function (node) {
      node.properties.forEach((property) => {
        if (property.key) {
          const propName = property.key.name;
          if (colorKeys.indexOf(propName) !== -1) {
            findRawValueAndReport(property.value, reportAndFixHardCodedColorString)
          } 
        }
        return
      });
  },
  "JSXAttribute[name.name = style] ObjectExpression": function (node) {
    node.properties.forEach((property) => {
      if (property.key) {
        const propName = property.key.name;
        if (colorKeys.indexOf(propName) !== -1) {
          
          findRawValueAndReport(property.value, reportAndFixHardCodedColorString)
        } 
      }
      return
    });
  }
    };
  },
};
