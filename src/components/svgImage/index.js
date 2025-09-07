import React from 'react';
import { isSvg, isSvgUri } from "../../utils/imageUtils";
import { SvgPackage, SvgCssUri } from "../../optionalDependencies";
import { LogService } from "../../services";
const SvgXml = SvgPackage?.SvgXml;
// const SvgProps = SvgPackage?.SvgProps; TODO: not sure how (or if) we can use their props

function SvgImage(props) {
  // tintColor crashes Android, so we're removing this until we properly support it.
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const {
    data,
    tintColor,
    ...others
  } = props;
  if (!SvgXml) {
    // eslint-disable-next-line max-len
    LogService.error(`RNUILib Image "svg" prop requires installing "react-native-svg" and "react-native-svg-transformer" dependencies`);
    return null;
  }
  if (isSvgUri(data)) {
    return <SvgCssUri {...others} uri={data.uri} display={undefined} />;
  } else if (typeof data === 'string') {
    return <SvgXml xml={data} {...others} display={undefined} />;
  } else if (data) {
    const File = data; // Must be with capital letter
    return <File {...others} display={undefined} />;
  }
  return null;
}
SvgImage.displayName = 'IGNORE';
SvgImage.isSvg = isSvg;
export default SvgImage;