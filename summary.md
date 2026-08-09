# React Native Modal Android Back Button Investigation

## Issue

In `demo/src/screens/componentScreens/ActionSheetScreen.tsx`, closing a React Native `Modal` with the Android hardware back button left the underlying screen in a bad state.

Observed behavior:

- After the first hardware-back dismissal, buttons underneath the modal were not fully tappable.
- Later attempts showed the button press feedback, but the modal did not open again.
- The issue reproduced on a physical Android device.

## Relevant Findings

- React Native documents `Modal.onRequestClose` as the Android back-button callback. While a `Modal` is open, normal `BackHandler` events are not emitted.
- React Native documents `Modal.onDismiss` as iOS-only. Android `onDismiss` support is still not reliable; there is an open React Native proposal around adding Android support.
- Known Android reports around RN `Modal` mention touch/press events becoming blocked after modal usage, especially in RN 0.71+ and newer.
- A common workaround reported online is wrapping the `Modal` in a plain React Native `View`.
- Disabling dismissal animation can help in some `react-native-navigation` cases, but it did not solve this issue by itself.

## Tried and Failed

- Fixed JSX indentation only.
  - This solved lint formatting, but did not address the Android modal issue.
- Controlled the modal with `visible={showModal}` instead of conditionally mounting it with a hard-coded `visible`.
  - The issue still reproduced.
- Switched from React Native's raw `Modal` to `react-native-ui-lib`'s `Modal` wrapper.
  - The issue still reproduced on device.
- Removed reliance on Android `onDismiss`.
  - The issue still reproduced.
- Disabled Android modal animation with `animationType="none"`.
  - The issue still reproduced.
- Added a delayed two-phase unmount after setting `visible={false}`.
  - This caused a new problem: button press feedback appeared, but the modal did not open again after the first hardware-back close.

## Workaround That Worked

The working workaround keeps React Native's raw `Modal`, but:

- Conditionally mounts the modal only while `showModal` is true.
- Wraps the modal in a plain React Native `View` (`RNView`), not a UI-lib `View`.
- Forces a fresh native modal instance on each open by incrementing `modalKey` and using it in the wrapper key.
- Handles Android hardware back only through `onRequestClose`.
- Keeps Android `animationType="none"`.
- Enables `hardwareAccelerated`.

The user verified this workaround on an Android device.

## Current Implementation Notes

- `showModal` controls whether the modal is rendered.
- `modalKey` is incremented before each open so Android does not reuse the previously dismissed native modal instance.
- `dismissReactNativeModal` only sets `showModal` to `false`.
- The workaround is currently scoped to the demo screen and does not change the shared `Modal` or `Dialog` components.
