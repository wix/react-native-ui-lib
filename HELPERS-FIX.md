# React Native UI Lib - Helpers Fix

## Problem
The `react-native-ui-lib` package was missing the compiled JavaScript files for the `src/helpers` directory, causing Metro bundler to fail with:

```
error Unable to resolve module ./helpers from /path/to/node_modules/react-native-ui-lib/src/index.ts
```

## Solution
This fix ensures that the TypeScript files in `src/helpers/` are properly transpiled to JavaScript and made available for Metro bundler consumption.

## What was done:

1. **Added a build script** (`scripts/build/buildHelpers.js`) that:
   - Transpiles the `src/helpers/` TypeScript files to JavaScript
   - Transpiles the main `src/index.ts` to `src/index.js`
   - Fixes import extensions for Metro bundler compatibility
   - Updates `package.json` to point to the JavaScript entry point

2. **Updated package.json** to include the new build script:
   ```json
   {
     "scripts": {
       "build:helpers": "node scripts/build/buildHelpers.js"
     }
   }
   ```

3. **Generated missing files**:
   - `src/helpers/index.js`
   - `src/helpers/AvatarHelper.js`
   - `src/helpers/Profiler.js`
   - `src/helpers/FormattingPresenter.js`
   - `src/index.js`

## Usage

### For library maintainers:
Run this whenever you make changes to the helpers:
```bash
npm run build:helpers
```

### For users experiencing the build error:
If you're using this library as a git dependency and encountering the helpers import error, you can fix it by running:

```bash
cd node_modules/react-native-ui-lib
npm run build:helpers
```

Or clone the fixed version of this repository.

## Long-term solution:
The build process should be updated to automatically include these transpilation steps in the main build pipeline to prevent this issue from occurring in future releases.
