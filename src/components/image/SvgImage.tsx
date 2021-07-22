import React from 'react';
import {SvgPackage} from '../../optionalDependencies';
const SvgXml = SvgPackage?.SvgXml;
// const SvgProps = SvgPackage?.SvgProps; TODO: not sure how (or if) we can use their props

export interface SvgImageProps {
  data: any; // TODO: I thought this should be string | React.ReactNode but it doesn't work properly
  fill?: string; // fill works on files if SVGR is configured appropriately, see https://github.com/kristerkari/react-native-svg-transformer/blob/f10c8d579490826227d1bcfa84ba6eabc124b70a/README.md#changing-svg-fill-color-in-js-code
}

function SvgImage(props: SvgImageProps) {
  const {data, fill, ...others} = props;

  if (!SvgXml) {
    // eslint-disable-next-line max-len
    console.error(`RNUILib Image "svg" prop requires installing "react-native-svg" and "react-native-svg-transformer" dependencies`);
    return null;
  }

  if (typeof data === 'string') {
    // TODO can fill be applied here too?
    return <SvgXml xml={data} {...others}/>;
  } else if (data) {
    const File = data; // Must be with capital letter
    return <File fill={fill} {...others}/>;
  }

  return null;
}

SvgImage.displayName = 'IGNORE';

export default SvgImage;
