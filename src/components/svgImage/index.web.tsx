import React, {useState} from 'react';
import Image from '../image';
import {isSvg, isSvgUri, isBase64ImageContent} from '../../utils/imageUtils';

const EMPTY_STYLE = '{}';
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
  const {data, style, tintColor, ...others} = props;

  const styleObj = Object.assign({}, ...(style || []));

  const [svgStyleCss, setSvgStyleCss] = useState<string>(EMPTY_STYLE);
  const [postCssStyleCalled, setPostCssStyleCalled] = useState(false);

  const createStyleSvgCss = async (PostCssPackage: {postcss: any; cssjs: any}) => {
    setPostCssStyleCalled(true);
    const {postcss, cssjs} = PostCssPackage;
    postcss()
      .process(styleObj, {parser: cssjs})
      .then((style: {css: any}) => setSvgStyleCss(`{${style.css}}`));
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
    const PostCssPackage = require('../../optionalDependencies').PostCssPackage;
    if (PostCssPackage) {
      if (!postCssStyleCalled) {
        createStyleSvgCss(PostCssPackage);
        return null;
      }
      const svgStyleTag = `<style> svg ${svgStyleCss} </style>`;

      return (
        <div
          {...others}
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
