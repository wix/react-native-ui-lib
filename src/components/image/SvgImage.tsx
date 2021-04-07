import React from 'react';
import {SvgPackage} from '../../optionalDependencies';
const SvgXml = SvgPackage?.SvgXml;
// const SvgProps = SvgPackage?.SvgProps; TODO: not sure how (or if) we can use their props

export interface SvgImageProps {
  data: any; // TODO: I thought this should be string | React.ReactNode but it doesn't work properly
}

function SvgImage(props: SvgImageProps) {
  const {data, ...others} = props;

  if (!SvgXml) {
    // eslint-disable-next-line max-len
    console.error(`RNUILib Image "svg" prop requires installing "react-native-svg" and "react-native-svg-transformer" dependencies`);
    return null;
  }

  if (typeof data === 'string') {
    return <SvgXml xml={data} {...others}/>;
  } else if (data) {
    const File = data; // Must be with capital letter
    return <File {...others}/>;
  }

  return null;
}

SvgImage.displayName = 'IGNORE';

export default SvgImage;
