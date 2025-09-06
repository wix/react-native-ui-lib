// Test file to simulate Metro's resolution
console.log('Testing helpers import...');

try {
  // This simulates exactly what Metro does when resolving './helpers' from src/index.ts
  const helpers = require('./src/helpers');
  console.log('✅ helpers directory resolved successfully');
  console.log('AvatarHelper type:', typeof helpers.AvatarHelper);
  console.log('Profiler type:', typeof helpers.Profiler);
} catch (error) {
  console.log('❌ Failed to resolve helpers:', error.message);
  
  // Try alternative resolutions
  try {
    const helpersIndex = require('./src/helpers/index');
    console.log('✅ helpers/index resolved successfully');
  } catch (err) {
    console.log('❌ helpers/index failed:', err.message);
  }
  
  try {
    const helpersIndexJs = require('./src/helpers/index.js');
    console.log('✅ helpers/index.js resolved successfully');
  } catch (err) {
    console.log('❌ helpers/index.js failed:', err.message);
  }
}
