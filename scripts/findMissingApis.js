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

// Helper function to check if a component is from services or assets directory
function isNonComponentDirectory(component) {
  // Components from services directory
  if (['LogService', 'HapticService'].includes(component)) {
    return true;
  }
  
  // Components from assets directory
  if (component === 'Assets') {
    return true;
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
function generateApiJsonTemplate(componentName) {
  return {
    name: componentName,
    category: 'to be filled',
    description: 'to be filled',
    example: 'to be filled',
    images: [],
    props: [],
    snippet: {
      js: `import {${componentName}} from 'react-native-ui-lib';`,
      jsx: `<${componentName}></${componentName}>`
    }
  };
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
  
  // Generate and save api.json file
  const apiJsonPath = `${componentDir}/${componentName.toLowerCase()}.api.json`;
  const apiJsonTemplate = generateApiJsonTemplate(componentName);
  
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
