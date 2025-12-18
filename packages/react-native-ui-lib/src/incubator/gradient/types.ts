import type {LinearGradientProps} from 'react-native-linear-gradient';

type CommonGradientProps = Pick<LinearGradientProps, 'colors' | 'children'> & {
  angle?: number;
  center?: boolean;
  centerH?: boolean;
  centerV?: boolean;
};

// type GradientType = 'rectangle' | 'circle' | 'border';

export type GradientProps =
  | ({
      type: 'rectangle';
    } & RectangleGradientProps)
  | ({
      type: 'circle';
    } & CircleGradientProps)
  | ({
      type: 'border';
    } & BorderGradientProps);

export type RectangleGradientProps = CommonGradientProps & {
  width?: number;
  height?: number;
};

export type CircleGradientProps = CommonGradientProps & {
  radius: number;
};

export type BorderGradientProps = RectangleGradientProps & {
  borderWidth?: number;
  borderRadius?: number;
};
