import React, {useState} from 'react';
import Image from '../image';
import {isSvg, isSvgUri, isBase64ImageContent} from '../../utils/imageUtils';

const DEFAULT_SIZE = 16;
export interface SvgImageProps {
  /**
   * the asset tint
   */
  tintColor?: string | null;
  data: any; // TODO: I thought this should be string | React.ReactNode but it doesn't work properly
  style?: object[];
}

function SvgImage(props: SvgImageProps) {
  const {data, style = [], tintColor, ...others} = props;
  const [svgStyleCss, setSvgStyleCss] = useState<string | undefined>(undefined);
  const [postCssStyleCalled, setPostCssStyleCalled] = useState(false);
  
  let styleObj = JSON.parse(JSON.stringify(style));

  const createStyleSvgCss = async (PostCssPackage: {postcss: any; cssjs: any}, styleObj?: Record<string, any>) => {
    setPostCssStyleCalled(true);
    const {postcss, cssjs} = PostCssPackage;
    postcss()
      .process(styleObj, {parser: cssjs})
      .then((style: {css: any}) => {
        const svgPathCss = (styleObj?.tintColor) ? `svg path {fill: ${styleObj?.tintColor}}` : '';
        setSvgStyleCss(`svg {${style.css}} ${svgPathCss}}`);
      });
  };

  if (isSvgUri(data)) {
    return <img {...others} src={data.uri} style={styleObj}/>;
  } else if (isBase64ImageContent(data)) {
    if (tintColor) {
      return (
        <Image
          source={{uri: data}}
          width={DEFAULT_SIZE}
          height={DEFAULT_SIZE}
          style={[style, {tintColor}]}
          {...others}
        />
      );
    }
    return <img {...others} src={data} style={styleObj}/>;
  } else if (data) {
    styleObj = Object.assign({}, ...(style || []));
    const PostCssPackage = require('../../optionalDependencies').PostCssPackage;
    if (PostCssPackage) {
      if (!postCssStyleCalled) {
        createStyleSvgCss(PostCssPackage, styleObj);
        return null;
      }
      
      if (svgStyleCss) {
        const svgStyleTag = `<style> ${svgStyleCss} </style>`;
        return (
          <div
            {...others}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{__html: svgStyleTag + data}}
          />
        );
      }
    }
  }
  return null;
}

SvgImage.displayName = 'IGNORE';
SvgImage.isSvg = isSvg;

export default SvgImage;
