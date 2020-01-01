import {ScaledSize} from 'react-native';

export namespace Constants {
  export const orientations: {
    PORTRAIT: string;
    LANDSCAPE: string;
  };

  export const isAndroid: boolean;
  export const isIOS: boolean;

  export function getAndroidVersion(): number | undefined;

  export let statusBarHeight: number | undefined;
  export const isRTL: boolean;
  export let orientation: string;
  export let isLandscape: boolean;
  export let screenWidth: number;
  export let screenHeight: number;
  export let isSmallScreen: boolean;
  export let isShortScreen: boolean;
  export const screenAspectRatio: number;
  export const isTablet: boolean;

  export interface SafeAreaInsets {
    left: number;
    right: number;
    bottom: number;
    top: number;
  }

  export function getSafeAreaInsets(): SafeAreaInsets;
  export const isIphoneX: boolean;

  export function addDimensionsEventListener(
    callback: (event: { window: ScaledSize, screen: ScaledSize }) => void
  ): void;
  export function removeDimensionsEventListener(
    callback: (event: { window: ScaledSize, screen: ScaledSize }) => void
  ): void;
}
