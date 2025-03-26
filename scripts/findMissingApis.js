/**
 * This script finds components that are exported but don't have a corresponding api.json file
 */
const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

// Get all component names from api.json files
console.log('Finding all api.json files...');
const apiJsonFiles = childProcess.execSync('find ./src -name "*.api.json"')
  .toString()
  .trim()
  .split('\n');

// Extract component names from api.json files
const componentsWithApiJson = apiJsonFiles.map(filePath => {
  const file = fs.readFileSync(filePath);
  const api = JSON.parse(file.toString());
  return api.name;
});

// Helper function to extract component names from a file
function extractExportedComponentsFromFile(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Match all default exports using regex
    const exportMatches = fileContent.match(/export\s+\{\s*default\s+as\s+([^,}\s]+)/g) || [];
    
    return exportMatches.map(match => {
      // Extract the component name from the match
      const componentName = match.match(/export\s+\{\s*default\s+as\s+([^,}\s]+)/)[1];
      return componentName;
    });
  } catch (error) {
    console.error(`Error reading file ${filePath}: ${error.message}`);
    return [];
  }
}

// Get components exported from src/index.ts and src/incubator/index.ts
console.log('Extracting exported components...');
const mainIndexComponents = extractExportedComponentsFromFile('./src/index.ts');
const incubatorComponents = extractExportedComponentsFromFile('./src/incubator/index.ts');

// Combine all exported components
const allExportedComponents = [...mainIndexComponents, ...incubatorComponents];

// Find components without api.json, excluding TestKits and components with displayName="IGNORE"
const componentsToExclude = ['Swipeable', 'FadedScrollView', 'SliderContext', 'Item', 
  'OverlayFadingBackground', 'DialogDismissibleView', 'SvgImage', 'PanningProvider', 
  'TargetElement', 'SharedArea', 'SourceElement'];

// Helper function to check if a component is from services, assets, or lib directory
function isNonComponentDirectory(component) {
  // Components from services directory
  if (['LogService', 'HapticService'].includes(component)) {
    return true;
  }
  
  // Components from assets directory
  if (component === 'Assets') {
    return true;
  }
  
  // Components from lib directory
  // Check if the component is from lib directory by searching for it in lib files
  try {
    const findInLibResult = childProcess.execSync(
      `find ./lib -type f -name "*.tsx" -o -name "*.ts" | xargs grep -l "${component}" | head -n 1`
    ).toString().trim();
    
    if (findInLibResult) {
      return true;
    }
  } catch (error) {
    // If grep doesn't find anything, it returns non-zero exit code
    // We can ignore this error
  }
  
  return false;
}

// Cache for displayName checks to avoid rechecking files
const displayNameCache = {};

// Helper function to check if a component has displayName="IGNORE" (case-insensitive)
function hasIgnoreDisplayName(componentName) {
  // Return cached result if available
  if (displayNameCache[componentName] !== undefined) {
    return displayNameCache[componentName];
  }
  
  try {
    // First, find all potential files that might define this component
    const findComponentFiles = childProcess.execSync(
      `find ./src -type f -name "*.tsx" -o -name "*.ts" -o -name "*.js" | xargs grep -l "${componentName}[^a-zA-Z0-9]" | head -n 5`
    ).toString().trim().split('\n').filter(Boolean);
    
    // Check each file for displayName="IGNORE" (case-insensitive)
    for (const filePath of findComponentFiles) {
      if (!filePath) continue;
      const fileContent = fs.readFileSync(filePath, 'utf8');
      
      // Look for patterns like:
      // - ComponentName.displayName = 'IGNORE'
      // - static displayName = 'IGNORE'
      // - displayName = 'IGNORE'
      // Case-insensitive for 'ignore'
      const pattern1 = new RegExp(`${componentName}\\.displayName\\s*=\\s*['"](?:IGNORE|ignore|Ignore)['"]`, 'i');
      const pattern2 = new RegExp(`static\\s+displayName\\s*=\\s*['"](?:IGNORE|ignore|Ignore)['"]`, 'i');
      const pattern3 = new RegExp(`displayName\\s*=\\s*['"](?:IGNORE|ignore|Ignore)['"]`, 'i');
      
      if (fileContent.match(pattern1) || fileContent.match(pattern2) || fileContent.match(pattern3)) {
        displayNameCache[componentName] = true;
        return true;
      }
    }
    
    displayNameCache[componentName] = false;
    return false;
  } catch (error) {
    // If any error occurs, assume the component doesn't have IGNORE displayName
    displayNameCache[componentName] = false;
    return false;
  }
}

const componentsWithoutApiJson = allExportedComponents.filter(
  component => !componentsWithApiJson.includes(component) && 
               !component.includes('TestKit') &&
               !componentsToExclude.includes(component) &&
               !component.includes('Driver') &&
               !component.includes('Factory') &&
               !isNonComponentDirectory(component) &&
               !hasIgnoreDisplayName(component)
);

// Print results
console.log('\n=== Components without api.json files ===');
if (componentsWithoutApiJson.length === 0) {
  console.log('All components have api.json files!');
} else {
  // Create a formatted list of components without api.json
  const componentsList = componentsWithoutApiJson.map(component => `- ${component}`).join('\n');
  
  // Log the list with more emphasis
  console.log('\x1b[33m%s\x1b[0m', componentsList); // Yellow color for better visibility
  console.log(`\nTotal: \x1b[1m${componentsWithoutApiJson.length}\x1b[0m component(s) missing api.json files`);
  
  // Also log the list to a file for reference
  try {
    fs.writeFileSync('./missing-api-components.log', 
      `=== Components without api.json files ===\n${componentsList}\n\nTotal: ${componentsWithoutApiJson.length} component(s) missing api.json files\n\nGenerated on: ${new Date().toISOString()}`
    );
    console.log('List saved to missing-api-components.log');
  } catch (error) {
    console.error('Error saving list to file:', error.message);
  }
}

console.log('\n=== Summary ===');
console.log(`Total exported components: ${allExportedComponents.length}`);
console.log(`Components with api.json: ${componentsWithApiJson.length}`);
console.log(`Components without api.json: ${componentsWithoutApiJson.length}`);

// Function to generate a template api.json file for a component
function generateApiJsonTemplate(componentName, description = '', props = []) {
  return {
    name: componentName,
    category: '',
    description: description || 'A component',
    example: 'to be filled',
    images: [],
    props: props,
    snippet: `<${componentName}></${componentName}>`
  };
}

/**
 * Extract component description from JSDoc comments in component file
 * @param {string} componentDir - Component directory
 * @param {string} componentName - Component name
 * @returns {string} - Component description or empty string if not found
 */
function extractComponentDescription(componentDir, componentName) {
  try {
    // Try to find the component file (index.tsx, componentName.tsx, etc.)
    const possibleFiles = [
      `${componentDir}/index.tsx`,
      `${componentDir}/index.ts`,
      `${componentDir}/${componentName}.tsx`,
      `${componentDir}/${componentName}.ts`,
      `${componentDir}/${componentName.toLowerCase()}.tsx`,
      `${componentDir}/${componentName.toLowerCase()}.ts`
    ];

    for (const filePath of possibleFiles) {
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        
        // Look for JSDoc description in various formats
        // @description: text
        const descriptionMatch = fileContent.match(/@description:\s*([^\n]*)/);
        if (descriptionMatch && descriptionMatch[1]) {
          return descriptionMatch[1].trim();
        }
        
        // Component description in block comment
        const blockCommentMatch = fileContent.match(/\/\*\*[\s\S]*?\*\//);
        if (blockCommentMatch) {
          const blockComment = blockCommentMatch[0];
          const descInBlockMatch = blockComment.match(/@description:?\s*([^\n@]*)/);
          if (descInBlockMatch && descInBlockMatch[1]) {
            return descInBlockMatch[1].trim();
          }
        }
      }
    }
    
    return '';
  } catch (error) {
    console.error(`Error extracting description for ${componentName}: ${error.message}`);
    return '';
  }
}

/**
 * Find the props interface file for a component
 * @param {string} componentDir - Component directory
 * @param {string} componentName - Component name
 * @returns {Object|null} - Object with filePath and interfaceName or null if not found
 */
function findPropsInterface(componentDir, componentName) {
  try {
    // Special case mappings for components with props in different locations
    const specialCaseMappings = {
      'GradientSlider': {
        dir: path.resolve(process.cwd(), 'src/components/slider'),
        interfaceName: 'GradientSliderProps'
      },
      'ColorSliderGroup': {
        dir: path.resolve(process.cwd(), 'src/components/slider'),
        interfaceName: 'ColorSliderGroupProps'
      }
    };
    
    // Check if we have a special case mapping for this component
    if (specialCaseMappings[componentName]) {
      const { dir, interfaceName } = specialCaseMappings[componentName];
      const typesFilePath = `${dir}/types.ts`;
      
      if (fs.existsSync(typesFilePath)) {
        return {
          filePath: typesFilePath,
          interfaceName
        };
      }
    }
    
    // Check types.ts file first
    const typesFilePath = `${componentDir}/types.ts`;
    if (fs.existsSync(typesFilePath)) {
      const typesContent = fs.readFileSync(typesFilePath, 'utf8');
      
      // Look for interface or type export that includes "Props"
      const propsMatchRegex = new RegExp(`export\\s+(type|interface)\\s+(${componentName}Props|Props)\\s*=?\\s*`, 'i');
      const propsMatch = typesContent.match(propsMatchRegex);
      
      if (propsMatch) {
        return {
          filePath: typesFilePath,
          interfaceName: propsMatch[2]
        };
      }
    }
    
    // If not found in types.ts, check component file
    const possibleFiles = [
      `${componentDir}/index.tsx`,
      `${componentDir}/index.ts`,
      `${componentDir}/${componentName}.tsx`,
      `${componentDir}/${componentName}.ts`,
      `${componentDir}/${componentName.toLowerCase()}.tsx`,
      `${componentDir}/${componentName.toLowerCase()}.ts`
    ];
    
    for (const filePath of possibleFiles) {
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        
        // Look for interface or type export that includes "Props"
        const propsMatchRegex = new RegExp(`export\\s+(type|interface)\\s+(${componentName}Props|Props)\\s*=?\\s*`, 'i');
        const propsMatch = fileContent.match(propsMatchRegex);
        
        if (propsMatch) {
          return {
            filePath,
            interfaceName: propsMatch[2]
          };
        }
        
        // Also look for interface definitions within the file
        const interfaceRegex = new RegExp(`interface\\s+(${componentName}Props|Props)\\s*\\{`, 'i');
        const interfaceMatch = fileContent.match(interfaceRegex);
        
        if (interfaceMatch) {
          return {
            filePath,
            interfaceName: interfaceMatch[1]
          };
        }
        
        // Look for type imports that might contain the props
        const importTypeRegex = new RegExp(`import.*\\{.*${componentName}Props.*\\}.*from`, 'i');
        const importTypeMatch = fileContent.match(importTypeRegex);
        
        if (importTypeMatch) {
          // Try to find the import source
          const importSourceRegex = /from\s+['"](.+)['"]/;
          const importSourceMatch = fileContent.match(importSourceRegex);
          
          if (importSourceMatch && importSourceMatch[1]) {
            const importSource = importSourceMatch[1];
            
            // Handle relative imports
            if (importSource.startsWith('./') || importSource.startsWith('../')) {
              const importDir = path.dirname(filePath);
              const importPath = path.resolve(importDir, importSource);
              
              // Check if it's a directory or file
              let resolvedPath = importPath;
              if (!importPath.endsWith('.ts') && !importPath.endsWith('.tsx')) {
                resolvedPath = `${importPath}.ts`;
                if (!fs.existsSync(resolvedPath)) {
                  resolvedPath = `${importPath}/types.ts`;
                }
              }
              
              if (fs.existsSync(resolvedPath)) {
                return {
                  filePath: resolvedPath,
                  interfaceName: `${componentName}Props`
                };
              }
            }
          }
        }
      }
    }
    
    return null;
  } catch (error) {
    console.error(`Error finding props interface for ${componentName}: ${error.message}`);
    return null;
  }
}

/**
 * Extract props from component interface
 * @param {Object} propsInterfaceInfo - Object with filePath and interfaceName
 * @returns {Array} - Array of prop objects with name, type, and description
 */
function extractProps(propsInterfaceInfo) {
  if (!propsInterfaceInfo) {
    return [];
  }
  
  try {
    const { filePath, interfaceName } = propsInterfaceInfo;
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Find the interface or type definition
    let propsContent = '';
    
    // For interfaces
    const interfaceRegex = new RegExp(`interface\\s+${interfaceName}\\s*\\{([\\s\\S]*?)\\}`, 'i');
    const interfaceMatch = fileContent.match(interfaceRegex);
    
    if (interfaceMatch && interfaceMatch[1]) {
      propsContent = interfaceMatch[1];
    } else {
      // For export type declarations with generic parameters
      const exportTypeRegex = new RegExp(`export\\s+type\\s+${interfaceName}(?:<[^>]*>)?\\s*=\\s*\\{([\\s\\S]*?)\\};`, 'i');
      const exportTypeMatch = fileContent.match(exportTypeRegex);
      
      if (exportTypeMatch && exportTypeMatch[1]) {
        propsContent = exportTypeMatch[1];
      } else {
        // For type aliases that are objects
        const typeObjectRegex = new RegExp(`type\\s+${interfaceName}\\s*=\\s*\\{([\\s\\S]*?)\\}`, 'i');
        const typeObjectMatch = fileContent.match(typeObjectRegex);
        
        if (typeObjectMatch && typeObjectMatch[1]) {
          propsContent = typeObjectMatch[1];
        } else {
          // For type aliases that extend other types (e.g., Omit<SliderProps, 'onValueChange'> & {...})
          const typeExtendRegex = new RegExp(`type\\s+${interfaceName}\\s*=\\s*[^{]*\\{([\\s\\S]*?)\\}`, 'i');
          const typeExtendMatch = fileContent.match(typeExtendRegex);
          
          if (typeExtendMatch && typeExtendMatch[1]) {
            propsContent = typeExtendMatch[1];
          }
        }
      }
    }
    
    if (!propsContent) {
      console.log(`No props content found for ${interfaceName} in ${filePath}`);
      return [];
    }
    
    // Extract individual props with their JSDoc comments
    const props = [];
    
    // Match JSDoc comments followed by prop definitions
    // This regex handles both optional (?) and required props
    const propRegex = /\/\*\*([\s\S]*?)\*\/\s*([a-zA-Z0-9_]+)(\?)?:\s*([^;]*);/g;
    
    let match;
    while ((match = propRegex.exec(propsContent)) !== null) {
      const jsdoc = match[1];
      const propName = match[2];
      const isOptional = match[3] === '?';
      const propType = match[4].trim();
      
      // Extract description from JSDoc comment
      let description = '';
      
      if (jsdoc) {
        // Remove * at the beginning of lines and clean up whitespace
        description = jsdoc
          .replace(/^\s*\*\s*/gm, '')
          .trim();
      }
      
      // Simplify complex TypeScript types for api.json
      let simplifiedType = propType;
      
      // Handle common type patterns
      if (propType.includes('StyleProp<')) {
        simplifiedType = 'style';
      } else if (propType.includes('GradientSliderTypes')) {
        simplifiedType = 'enum';
      } else if (propType.includes('(') && propType.includes(')')) {
        simplifiedType = 'function';
      } else if (propType.includes('|')) {
        // For union types, use the first non-null type or 'union'
        const types = propType.split('|').map(t => t.trim());
        const nonNullType = types.find(t => t !== 'null' && t !== 'undefined');
        simplifiedType = nonNullType || 'union';
      }
      
      props.push({
        name: propName,
        type: simplifiedType,
        description
      });
    }
    
    return props;
  } catch (error) {
    console.error(`Error extracting props: ${error.message}`);
    return [];
  }
}

// Function to find the component directory
function findComponentDirectory(componentName) {
  try {
    // Special case mappings for known components
    const specialCaseMappings = {
      'PanView': './src/incubator/panView',
      'PanDismissibleView': './src/incubator/panView',
      'PanGestureView': './src/incubator/panView',
      'PanListenerView': './src/incubator/panView',
      'PanningContext': './src/incubator/panView',
      'PanResponderView': './src/incubator/panView',
      'asPanViewConsumer': './src/incubator/panView',
      'ColorPickerDialog': './src/components/colorPicker',
      'GradientSlider': './src/components/colorPicker',
      'ColorSliderGroup': './src/components/colorPicker',
      'BaseInput': './src/components/textField',
      'TextArea': './src/components/textField',
      'KeyboardAwareFlatList': './src/components/keyboardAwareFlatList',
      'ScrollBar': './src/components/scrollBar',
      'SharedTransition': './src/components/sharedTransition',
      'Calendar': './src/components/calendar',
      'ExpandableOverlay': './src/incubator/expandableOverlay'
    };
    
    // Check if we have a special case mapping for this component
    if (specialCaseMappings[componentName]) {
      return specialCaseMappings[componentName];
    }
    
    // Try different naming conventions and locations
    const possiblePaths = [
      // Direct component directories
      `./src/components/${componentName.toLowerCase()}`,
      `./src/incubator/${componentName.toLowerCase()}`,
      
      // PascalCase to kebab-case conversion
      `./src/components/${componentName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}`,
      `./src/incubator/${componentName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}`
    ];
    
    // Check each possible path
    for (const dirPath of possiblePaths) {
      if (fs.existsSync(dirPath)) {
        return dirPath;
      }
    }
    
    // If still not found, try a more flexible search
    try {
      // First try to find files that export the component
      const findExportResult = childProcess.execSync(
        `find ./src -type f -name "*.tsx" -o -name "*.ts" | xargs grep -l "export.*default.*as.*${componentName}[^a-zA-Z0-9]" | head -n 1`
      ).toString().trim();
      
      if (findExportResult) {
        // Extract directory from file path
        return path.dirname(findExportResult);
      }
      
      // If that fails, try to find files that define the component
      const findDefResult = childProcess.execSync(
        `find ./src -type f -name "*.tsx" -o -name "*.ts" | xargs grep -l "class.*${componentName}.*extends\\|function.*${componentName}\\|const.*${componentName}.*=" | head -n 1`
      ).toString().trim();
      
      if (findDefResult) {
        // Extract directory from file path
        return path.dirname(findDefResult);
      }
    } catch (e) {
      // Ignore errors from the find command
    }
    
    return null;
  } catch (error) {
    console.error(`Error finding directory for ${componentName}: ${error.message}`);
    return null;
  }
}

// Function to generate an api.json file for a specific component
function generateApiJsonForComponent(componentName) {
  console.log(`\n=== Generating API File for ${componentName} ===`);
  
  // Check if component exists in the list of exported components
  if (!allExportedComponents.includes(componentName)) {
    console.error(`❌ Error: ${componentName} is not an exported component.`);
    console.log('Available components:');
    console.log(allExportedComponents.join(', '));
    return false;
  }
  
  // Check if component already has an api.json file
  if (componentsWithApiJson.includes(componentName)) {
    console.log(`⚠️ Warning: ${componentName} already has an api.json file.`);
    const existingApiFile = apiJsonFiles.find(file => {
      try {
        const content = fs.readFileSync(file);
        const api = JSON.parse(content.toString());
        return api.name === componentName;
      } catch (e) {
        return false;
      }
    });
    console.log(`Existing file: ${existingApiFile}`);
    return false;
  }
  
  // Find component directory
  const componentDir = findComponentDirectory(componentName);
  if (!componentDir) {
    console.error(`❌ Error: Could not find directory for ${componentName}`);
    return false;
  }
  
  // Extract component description
  const description = extractComponentDescription(componentDir, componentName);
  
  // Find props interface and extract props
  const propsInterfaceInfo = findPropsInterface(componentDir, componentName);
  console.log(`Props interface info for ${componentName}:`, propsInterfaceInfo);
  
  const props = extractProps(propsInterfaceInfo);
  console.log(`Extracted props for ${componentName}:`, props.length);
  
  // Generate api.json template with extracted information
  const apiJsonTemplate = generateApiJsonTemplate(componentName, description, props);
  
  // Generate and save api.json file
  const apiJsonPath = `${componentDir}/${componentName.toLowerCase()}.api.json`;
  
  try {
    fs.writeFileSync(apiJsonPath, JSON.stringify(apiJsonTemplate, null, 2));
    console.log(`✅ Created ${apiJsonPath}`);
    return true;
  } catch (error) {
    console.error(`❌ Error creating api.json for ${componentName}: ${error.message}`);
    return false;
  }
}

// Function to generate api.json files for missing components
function generateMissingApiJsonFiles() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log('\n=== Generate Missing API Files ===');
  
  // Handle components sequentially using a recursive approach
  function processComponents(index) {
    if (index >= componentsWithoutApiJson.length) {
      console.log('\nFinished processing all components.');
      rl.close();
      return;
    }
    
    const componentName = componentsWithoutApiJson[index];
    rl.question(`Generate api.json for ${componentName}? (y/n): `, (answer) => {
      if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
        generateApiJsonForComponent(componentName);
      }
      
      // Process the next component
      processComponents(index + 1);
    });
  }

  rl.question('Do you want to generate api.json files for missing components? (y/n): ', (answer) => {
    if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
      processComponents(0);
    } else {
      console.log('No api.json files will be generated.');
      rl.close();
    }
  });
}

// Ask if user wants to generate missing api.json files
if (componentsWithoutApiJson.length > 0) {
  console.log('\nYou can generate api.json files for missing components by running:');
  console.log('node scripts/findMissingApis.js --generate');
  console.log('Or generate for a specific component:');
  console.log('node scripts/findMissingApis.js --generate ComponentName');
}

// Check command line arguments
const generateIndex = process.argv.indexOf('--generate');
if (generateIndex !== -1) {
  const specificComponent = process.argv[generateIndex + 1];
  
  // If a component name is provided after --generate
  if (specificComponent && !specificComponent.startsWith('--')) {
    generateApiJsonForComponent(specificComponent);
  } else {
    // Otherwise, run the interactive mode
    generateMissingApiJsonFiles();
  }
}
