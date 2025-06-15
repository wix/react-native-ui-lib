import type {ViewProps} from 'react-native';
import type {
  Float,
  Int32,
  WithDefault
} from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

export interface HighlightFrame {
  x: Float;
  y: Float;
  width: Float;
  height: Float;
}

export interface MinimumRectSize {
  width: Float;
  height: Float;
}

export interface HighlightViewTagParams {
  paddingLeft?: WithDefault<Float, 0>;
  paddingTop?: WithDefault<Float, 0>;
  paddingRight?: WithDefault<Float, 0>;
  paddingBottom?: WithDefault<Float, 0>;
  offsetX?: WithDefault<Float, 0>;
  offsetY?: WithDefault<Float, 0>;
}

export interface NativeProps extends ViewProps {
  /**
   * The frame to highlight with x, y, width, height coordinates
   */
  highlightFrame?: HighlightFrame;
  
  /**
   * The overlay color (processed color int for Android)
   */
  overlayColor?: WithDefault<Int32, 0>;
  
  /**
   * The border radius for the highlighted area
   */
  borderRadius?: WithDefault<Float, 0>;
  
  /**
   * The stroke color (processed color int for Android)
   */
  strokeColor?: WithDefault<Int32, 0>;
  
  /**
   * The stroke width
   */
  strokeWidth?: WithDefault<Float, 0>;
  
  /**
   * The React tag of the view to highlight
   */
  highlightViewTag?: Int32;
  
  /**
   * Parameters for view-based highlighting including padding and offset
   */
  highlightViewTagParams?: HighlightViewTagParams;
  
  /**
   * Minimum rectangle size for the highlight area
   */
  minimumRectSize?: MinimumRectSize;
  
  /**
   * Inner padding for the highlight area
   */
  innerPadding?: WithDefault<Float, 0>;
}

export default codegenNativeComponent<NativeProps>('HighlighterView');
