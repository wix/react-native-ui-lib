import React, {useState} from 'react';
import {isSvg, isSvgUri, isBase64ImageContent} from '../../utils/imageUtils';

const EMPTY_STYLE = '{}';
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

  
  const [svgStyleCss, setsvgStyleCss] = useState<string>(EMPTY_STYLE);
  const [prossJsStyleCalled, setProssJsStyleCalled] = useState(false);

  const createStyleSvgCss = async (JsCssPackage: {postcss: any, cssjs:any}) => {
    setProssJsStyleCalled(true);
    const {postcss, cssjs} = JsCssPackage;
    postcss().process(styleObj, {parser: cssjs})
      .then((style: {css: any}) => setsvgStyleCss(style.css));
  };

  if (isSvgUri(data)) {
    return <img {...other} src={data.uri} style={styleObj}/>;
  } else if (isBase64ImageContent(data)) {
    return <img {...other} src={data} style={styleObj}/>;
  } else if (data) {
    const JsCssPackage = require('../../optionalDependencies').JsCssPackage;
    if (JsCssPackage) {
      if (!prossJsStyleCalled) {
        createStyleSvgCss(JsCssPackage);
        return null;
      }
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
