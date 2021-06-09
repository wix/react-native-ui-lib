import _pt from "prop-types";
import React from 'react';
import { SvgPackage } from "../../optionalDependencies";
const SvgXml = SvgPackage?.SvgXml; // const SvgProps = SvgPackage?.SvgProps; TODO: not sure how (or if) we can use their props

function SvgImage(props) {
  const {
    data,
    ...others
  } = props;

  if (!SvgXml) {
    // eslint-disable-next-line max-len
    console.error(`RNUILib Image "svg" prop requires installing "react-native-svg" and "react-native-svg-transformer" dependencies`);
    return null;
  }

  if (typeof data === 'string') {
    return <SvgXml xml={data} {...others} />;
  } else if (data) {
    const File = data; // Must be with capital letter

    return <File {...others} />;
  }

  return null;
}

SvgImage.propTypes = {
  data: _pt.any.isRequired
};
SvgImage.displayName = 'IGNORE';
export default SvgImage;