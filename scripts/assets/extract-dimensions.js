const fs = require('fs');
const path = require('path');
const mime = require('mime-types');
const {imageSize: sizeOf} = require('image-size');

// Base paths
const ICONS_PATH = path.resolve(__dirname, '../../src/assets/internal/icons');
const IMAGES_PATH = path.resolve(__dirname, '../../src/assets/internal/images');

// Function to check if file is an image
function isImageFile(filePath) {
  const mimeType = mime.lookup(filePath);
  return !!mimeType && mimeType.includes('image');
}

// Function to get dimensions of an image
function getDimensions(imagePath) {
  try {
    if (!isImageFile(imagePath)) {
      console.warn(`File is not an image: ${imagePath}`);
      return {width: 0, height: 0};
    }

    try {
      const buffer = fs.readFileSync(imagePath);
      const dimensions = sizeOf(buffer);
      return {
        width: dimensions.width,
        height: dimensions.height
      };
    } catch (sizeError) {
      console.log(`Error getting dimensions for ${imagePath}:`, sizeError);
      // Default dimensions if sizeOf fails
      return {width: 24, height: 24};
    }
  } catch (error) {
    console.log(`Error getting dimensions for ${imagePath}:`, error);
    return {width: 0, height: 0};
  }
}

// Function to create index files with dimensions
function createIndexFile(sourcePath, targetPath, fileType) {
  const files = fs.readdirSync(sourcePath).filter(file => !file.includes('@') && !file.startsWith('.'));

  let content = '';

  if (fileType === 'icons') {
    content = 'export const icons = {\n';
  } else if (fileType === 'images') {
    content = 'export const images = {\n';
  }

  files.forEach((file, index) => {
    const filePath = path.join(sourcePath, file);
    const mimeType = mime.lookup(filePath);
    const isImage = !!mimeType && mimeType.includes('image');

    if (!isImage) {
      console.warn(`Skipping non-image file: ${filePath}`);
      return;
    }

    const name = path.basename(file, path.extname(file));
    const dimensions = getDimensions(filePath);

    // Handle hyphenated filenames by converting to camelCase
    const propertyName = name.replace(/-([a-z])/g, (_match, letter) => letter.toUpperCase());

    content += `  get ${propertyName}() {\n`;
    // eslint-disable-next-line max-len
    content += `    return {uri: require('./${file}').default, width: ${dimensions.width}, height: ${dimensions.height}};\n`;
    content += index === files.length - 1 ? `  }\n` : `  },\n`; // Conditional check for the last file
  });

  content += '};\n';

  fs.writeFileSync(targetPath, content);
  console.log(`Created ${targetPath}`);
}

// Create index files
createIndexFile(ICONS_PATH, path.join(ICONS_PATH, 'index.web.js'), 'icons');
createIndexFile(IMAGES_PATH, path.join(IMAGES_PATH, 'index.web.js'), 'images');

console.log('Index files created successfully!');
