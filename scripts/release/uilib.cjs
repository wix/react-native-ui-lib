// Repository policy is separate from the release state machine. The runner is a
// port of react-native-navigation's scripts/release; only this adapter knows the
// ui-lib workspace layout, package order, and expected tarball contents.
module.exports = {
  repository: 'wix/react-native-ui-lib',
  branch: 'master',
  workflow: '.github/workflows/release.yml',
  // Package that owns the release: Git tags, GitHub release, and version PR naming.
  packageName: 'react-native-ui-lib',
  nativePackageName: 'uilib-native',
  // Publication order. uilib-native is only published when a native version is
  // selected (or for snapshots); react-native-ui-lib is published in every run.
  order: ['uilib-native', 'react-native-ui-lib'],
  nativeStatus: 'buildkite/react-native-ui-lib',
  nativeStatusUrl: 'https://buildkite.com/wix-mobile-oss/react-native-ui-lib/builds/',
  nativeStatusCreator: { login: 'buildkite-limited-access[bot]', id: 20291210 },
  label: 'release',
  packages: {
    'uilib-native': {
      directory: 'packages/uilib-native',
      native: true,
      allowedScripts: [],
      requiredFiles: [
        'package.json',
        'ReactNativeUiLib.podspec',
        'react-native.config.js',
        'components/index.js',
        'components/index.d.ts',
        'android/build.gradle',
        'android/src/main/AndroidManifest.xml',
        'specs/KeyboardTrackingViewNativeComponent.ts',
      ],
    },
    'react-native-ui-lib': {
      directory: 'packages/react-native-ui-lib',
      native: false,
      // The build copies the root scripts/ into the package; package.json#files
      // whitelists exactly these two for the shipped release-notes/docs helpers.
      allowedScripts: ['scripts/release/prReleaseNotesCommon.js', 'scripts/docs/buildDocsCommon.js'],
      requiredFiles: [
        'package.json',
        'README.md',
        'LICENSE',
        'src/index.js',
        'src/index.d.ts',
        'core.js',
        'style.js',
        'view.js',
        'testkit/package.json',
        'lib/package.json',
        'lib/ReactNativeUiLib.podspec',
        'lib/components/index.js',
        'lib/android/build.gradle',
        'scripts/release/prReleaseNotesCommon.js',
        'scripts/docs/buildDocsCommon.js',
      ],
    },
  },
};
