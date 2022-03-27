import React from 'react';
import {isSvg, isSvgUri} from '../../utils/imageUtils';
import {SvgPackage} from '../../optionalDependencies';
const SvgXml = SvgPackage?.SvgXml;
const SvgCssUri = SvgPackage?.SvgCssUri;
// const SvgProps = SvgPackage?.SvgProps; TODO: not sure how (or if) we can use their props

export interface SvgImageProps {
  /**
   * the asset tint
   */
  tintColor?: string | null;
  data: any; // TODO: I thought this should be string | React.ReactNode but it doesn't work properly
}

function SvgImage(props: SvgImageProps) {
  // tintColor crashes Android, so we're removing this until we properly support it.
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const {data, tintColor, ...others} = props;

  if (!SvgXml) {
    // eslint-disable-next-line max-len
    console.error(`RNUILib Image "svg" prop requires installing "react-native-svg" and "react-native-svg-transformer" dependencies`);
    return null;
  }

  if (isSvgUri(data)) {
    return <SvgCssUri {...others} uri={data.uri}/>;
  } else if (typeof data === 'string') {
    return <SvgXml xml={data} {...others}/>;
  } else if (data) {
    const File = data; // Must be with capital letter
    return <File {...others}/>;
  }

  return null;
}

SvgImage.displayName = 'IGNORE';
SvgImage.isSvg = isSvg;

export default SvgImage;
