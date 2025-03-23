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

const componentsWithoutApiJson = allExportedComponents.filter(
  component => !componentsWithApiJson.includes(component) && 
               !component.includes('TestKit') &&
               !componentsToExclude.includes(component) &&
               !component.includes('Driver') &&
               !component.includes('Factory') &&
               !isNonComponentDirectory(component)
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
    // Try different naming conventions and locations
    const possiblePaths = [
      // Direct component directories
      `./src/components/${componentName.toLowerCase()}`,
      `./src/incubator/${componentName.toLowerCase()}`,
      
      // PascalCase to kebab-case conversion
      `./src/components/${componentName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}`,
      `./src/incubator/${componentName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}`,
      
      // Check parent directories for nested components
      `./src/components/colorPicker`, // For ColorPickerDialog, ColorSliderGroup, GradientSlider
      `./src/incubator/panView`, // For PanView related components
      `./src/components/textField`, // For BaseInput, TextArea
      `./src/components/keyboardAwareFlatList`, // For KeyboardAwareFlatList
      `./src/components/scrollBar`, // For ScrollBar
      `./src/components/sharedTransition` // For SharedTransition
    ];
    
    // Check each possible path
    for (const dirPath of possiblePaths) {
      if (fs.existsSync(dirPath)) {
        return dirPath;
      }
    }
    
    // If still not found, try a more flexible search
    try {
      // Search for files containing the component name
      const findResult = childProcess.execSync(
        `find ./src -type f -name "*.tsx" -o -name "*.ts" | xargs grep -l "${componentName}" | head -n 1`
      ).toString().trim();
      
      if (findResult) {
        // Extract directory from file path
        return path.dirname(findResult);
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
        const componentDir = findComponentDirectory(componentName);
        
        if (componentDir) {
          const apiJsonPath = `${componentDir}/${componentName.toLowerCase()}.api.json`;
          const apiJsonTemplate = generateApiJsonTemplate(componentName);
          
          try {
            fs.writeFileSync(apiJsonPath, JSON.stringify(apiJsonTemplate, null, 2));
            console.log(`✅ Created ${apiJsonPath}`);
          } catch (error) {
            console.error(`❌ Error creating api.json for ${componentName}: ${error.message}`);
          }
        } else {
          console.error(`❌ Could not find directory for ${componentName}`);
        }
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
}

// Check if --generate flag is passed
if (process.argv.includes('--generate')) {
  generateMissingApiJsonFiles();
}
