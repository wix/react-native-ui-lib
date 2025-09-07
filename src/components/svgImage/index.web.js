import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import Image from "../image";
import { isSvg, isSvgUri, isBase64ImageContent } from "../../utils/imageUtils";
const PostCssPackage = require("../../optionalDependencies").PostCssPackage;
const DEFAULT_SIZE = 16;
function SvgImage(props) {
  const {
    id,
    data,
    style = [],
    tintColor,
    width,
    height,
    ...others
  } = props;
  const [className] = useState(`svg-${id ? id : new Date().getTime().toString()}`);
  const [svgStyleCss, setSvgStyleCss] = useState(undefined);
  useEffect(() => {
    if (PostCssPackage) {
      const {
        postcss,
        cssjs
      } = PostCssPackage;
      const styleObj = StyleSheet.flatten(style);
      postcss().process({
        width,
        height,
        ...styleObj
      }, {
        parser: cssjs
      }).then(style => {
        const svgPathCss = styleObj?.tintColor ? `path {fill: ${styleObj?.tintColor}}` : '';
        setSvgStyleCss(`.${className} > svg {${style.css}; ${svgPathCss}}`);
      });
    }
  }, [style, className, width, height]);
  if (isSvgUri(data)) {
    return <img {...others} src={data.uri} style={StyleSheet.flatten(style)} />;
  } else if (isBase64ImageContent(data)) {
    if (tintColor) {
      return <Image source={{
        uri: data
      }} width={DEFAULT_SIZE} height={DEFAULT_SIZE} style={[style, {
        tintColor
      }]} {...others} />;
    }
    return <img {...others} src={data} style={StyleSheet.flatten(style)} />;
  } else if (data && svgStyleCss) {
    const svgStyleTag = `<style> ${svgStyleCss} </style>`;
    return <div style={{
      display: 'flex',
      justifyContent: 'center',
      flexShrink: 0
    }} className={className}
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{
      __html: svgStyleTag + data
    }} />;
  }
  return null;
}
SvgImage.displayName = 'IGNORE';
SvgImage.isSvg = isSvg;
export default SvgImage;