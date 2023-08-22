import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import Image from '../image';
import {isSvg, isSvgUri, isBase64ImageContent} from '../../utils/imageUtils';

const DEFAULT_SIZE = 16;
export interface SvgImageProps {
  /**
   * the asset tint
   */
  id?: string;
  tintColor?: string | null;
  data: any; // TODO: I thought this should be string | React.ReactNode but it doesn't work properly
  style?: object[];
}

type CreateStyleSvgCssProps = {
  PostCssPackage: {postcss: any; cssjs: any};
  styleObj?: Record<string, any>;
  className: string
}

function SvgImage(props: SvgImageProps) {
  const {data, style = [], tintColor, ...others} = props;
  const [svgStyleCss, setSvgStyleCss] = useState<string | undefined>(undefined);
  const className = `${props?.id ?? 'svg-icon'} `;
  useEffect(() => {
    const PostCssPackage = require('../../optionalDependencies').PostCssPackage;
    
    const createStyleSvgCss = async ({PostCssPackage, className, styleObj}: CreateStyleSvgCssProps) => {
      const {postcss, cssjs} = PostCssPackage;
      postcss()
        .process(styleObj, {parser: cssjs})
        .then((style: {css: any}) => {
          const svgPathCss = styleObj?.tintColor ? `.${className} > svg path {fill: ${styleObj?.tintColor}}` : '';
          setSvgStyleCss(`.${className} > svg {${style.css}} ${svgPathCss}}`);
        });
    };
    createStyleSvgCss({PostCssPackage, styleObj: StyleSheet.flatten(style), className});
  }, [className, style]);
      
  if (isSvgUri(data)) {
    return <img {...others} src={data.uri} style={StyleSheet.flatten(style)}/>;
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
    return <img {...others} src={data} style={StyleSheet.flatten(style)}/>;
  } else if (data && svgStyleCss) {
    const svgStyleTag = `<style> ${svgStyleCss} </style>`;
    return (
      <div
        {...others}
        className={className}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{__html: svgStyleTag + data}}
      />
    );
  }
  return null;
}

SvgImage.displayName = 'IGNORE';
SvgImage.isSvg = isSvg;

export default SvgImage;
