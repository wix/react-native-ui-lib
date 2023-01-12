import React from 'react';
import {isSvg, isSvgUri, isBase64ImageContent} from '../../utils/imageUtils';


const asCss = (styleObj: object) => {
  return JSON.stringify(styleObj)
    .replace(/"/g, '') // remove all quotes
    .replace(/,/g, ';') // replace commas to semicolon
    .replace(/\}/g, ';}') // replace closing bracket
    .replace(/marginRight/g, 'margin-right')
    .replace(/marginLeft/g, 'margin-left')
    .replace(/marginTop/g, 'margin-top')
    .replace(/marginBottom/g, 'margin-bottom')
    .replace(/tintColor/g, 'fill');
  
};
export interface SvgImageProps {
  /**
   * the asset tint
   */
  tintColor?: string | null;
  data: any; // TODO: I thought this should be string | React.ReactNode but it doesn't work properly
  style?: object[];
}

function SvgImage(props: SvgImageProps) {
  const {
    data,
    style,
    ...other
  } = props;

  const styleObj = Object.assign({}, ...(style || []));
    
  
  if (isSvgUri(data)) {
    return <img {...other} src={data.uri} style={styleObj}/>;
  } else if (isBase64ImageContent(data)) {
    return <img {...other} src={data} style={styleObj}/>;
  } else if (data) {
    const JsCssPackage = require('../../optionalDependencies').JsCssPackage;
    if (JsCssPackage) {
      const {postcss, cssjs} = JsCssPackage;
      const svgStyleCss = postcss(styleObj, {parser: cssjs}).sync();
      // const svgStyle = asCss(styleObj);
      const svgStyleTag = `<style> svg ${svgStyleCss} </style>`;
  
      return (
        <div
          {...other}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{__html: svgStyleTag + data}}
        />
      );
    }
    
  }
  return null;
}

SvgImage.displayName = 'IGNORE';
SvgImage.isSvg = isSvg;

export default SvgImage;
