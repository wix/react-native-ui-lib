import React from 'react';
import {StyleProp, ImageStyle, ColorValue} from 'react-native';
import {isSvg, isSvgUri} from '../../utils/imageUtils';
import {SvgPackage, SvgCssUri} from '../../optionalDependencies';
import {LogService} from 'services';

const SvgXml = SvgPackage?.SvgXml;
// const SvgProps = SvgPackage?.SvgProps; TODO: not sure how (or if) we can use their props

type SvgTintProps = {
  fill?: ColorValue;
  stroke?: ColorValue;
};

const createSvgTintProps = (style: StyleProp<ImageStyle> | undefined,
  tintColor: string | null | undefined): SvgTintProps | undefined => {
  const svgProps: SvgTintProps = {};
  const effectiveTintColor =
    (style && typeof style === 'object' && 'tintColor' in style ? style.tintColor : undefined) || tintColor;

  if (effectiveTintColor) {
    svgProps.fill = effectiveTintColor;
    svgProps.stroke = effectiveTintColor;
  }
  return svgProps;
};

export interface SvgImageProps {
  /**
   * the asset tint
   */
  tintColor?: string | null;
  data: any; // TODO: I thought this should be string | React.ReactNode but it doesn't work properly
  style?: StyleProp<ImageStyle> | undefined;
}

function SvgImage(props: SvgImageProps) {
  // tintColor crashes Android, so we're removing this until we properly support it.
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const {data, tintColor, style, ...others} = props;

  if (!SvgXml) {
    // eslint-disable-next-line max-len
    LogService.error(`RNUILib Image "svg" prop requires installing "react-native-svg" and "react-native-svg-transformer" dependencies`);
    return null;
  }

  if (isSvgUri(data)) {
    return <SvgCssUri {...others} uri={data.uri} display={undefined}/>;
  } else if (typeof data === 'string') {
    return <SvgXml xml={data} {...others} display={undefined}/>;
  } else if (data) {
    const File = data; // Must be with capital letter
    const svgProps = createSvgTintProps(style, tintColor);
    return <File {...others} {...svgProps} style={style} display={undefined}/>;
  }

  return null;
}

SvgImage.displayName = 'IGNORE';
SvgImage.isSvg = isSvg;

export default SvgImage;
