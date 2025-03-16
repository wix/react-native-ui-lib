const fs = require('fs');
const path = require('path');
const sizeOf = require('image-size');

// Base paths
const ICONS_PATH = path.resolve(__dirname, '../../src/assets/internal/icons');
const IMAGES_PATH = path.resolve(__dirname, '../../src/assets/internal/images');

// Function to get dimensions of an image
function getDimensions(imagePath) {
  try {
    const dimensions = sizeOf(imagePath);
    return {
      width: dimensions.width,
      height: dimensions.height
    };
  } catch (error) {
    console.error(`Error getting dimensions for ${imagePath}:`, error);
    return {width: 0, height: 0};
  }
}

// Function to create web index files with dimensions
function createWebIndexFile(sourcePath, targetPath, fileType) {
  const files = fs.readdirSync(sourcePath).filter(file => file.endsWith('.png') && !file.includes('@'));

  let content = '';

  if (fileType === 'icons') {
    content = 'export const icons = {\n';
  } else if (fileType === 'images') {
    content = 'export const images = {\n';
  }

  files.forEach(file => {
    const name = path.basename(file, '.png');
    const dimensions = getDimensions(path.join(sourcePath, file));

    // Handle hyphenated filenames by converting to camelCase
    const propertyName = name.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());

    content += `  get ${propertyName}() {\n`;
    content += `    return {uri: require('./${file}'), dimensions: {width: ${dimensions.width}, height: ${dimensions.height}}};\n`;
    content += `  },\n`;
  });

  content += '};\n';

  fs.writeFileSync(targetPath, content);
  console.log(`Created ${targetPath}`);
}

// Create web index files
createWebIndexFile(ICONS_PATH, path.join(ICONS_PATH, 'index.web.ts'), 'icons');
createWebIndexFile(IMAGES_PATH, path.join(IMAGES_PATH, 'index.web.ts'), 'images');

console.log('Web index files created successfully!');
