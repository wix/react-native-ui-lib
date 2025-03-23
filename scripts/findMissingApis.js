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

const componentsWithoutApiJson = allExportedComponents.filter(
  component => !componentsWithApiJson.includes(component) && 
               !component.includes('TestKit') &&
               !componentsToExclude.includes(component)
);

// Print results
console.log('\n=== Components without api.json files ===');
if (componentsWithoutApiJson.length === 0) {
  console.log('All components have api.json files!');
} else {
  componentsWithoutApiJson.forEach(component => {
    console.log(`- ${component}`);
  });
  console.log(`\nTotal: ${componentsWithoutApiJson.length} component(s) missing api.json files`);
}

console.log('\n=== Summary ===');
console.log(`Total exported components: ${allExportedComponents.length}`);
console.log(`Components with api.json: ${componentsWithApiJson.length}`);
console.log(`Components without api.json: ${componentsWithoutApiJson.length}`);
