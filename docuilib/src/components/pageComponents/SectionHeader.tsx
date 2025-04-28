import React, {useMemo} from 'react';
import showdownMarkdown from 'showdown';
import ReactHtmlParser from 'react-html-parser';
import {isComponentSupported} from '../../utils/componentUtils';
import '../ComponentPage.module.scss';

export const SectionHeader = ({section, component, isListHeader = false}) => {
  const {title, description, type} = section;

  const getTitleSize = type => {
    switch (type) {
      case 'hero':
        return '48px';
      case 'item':
        return '16px';
      default:
        return '32px';
    }
  };

  const getTitleWeight = type => {
    return type === 'item' ? '400' : isListHeader ? '700' : '500';
  };

  const getDescriptionColor = type => {
    return type === 'item' ? '#6E7881' : '#495059';
  };

  const getUsageTitle = () => {
    const title = isComponentSupported(component.name) ? 'Playground' : 'Usage';
    if (component.snippet) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 12
          }}
        >
          {getTitle(type, title)}
          {getCodeExampleLink()}
        </div>
      );
    }
  };

  const getCodeExampleLink = () => {
    return (
      <a
        href={component.example}
        target="_blank"
        rel="noreferrer"
        style={{fontSize: '16px', fontWeight: '700', lineHeight: '18px', borderBottom: '1px solid'}}
      >
        Code Example
      </a>
    );
  };

  const getTitle = (type, title) => {
    const size = getTitleSize(type);
    const weight = getTitleWeight(type);
    return <span style={{fontSize: size, fontWeight: weight, marginBottom: '20px'}}>{title}</span>;
  };

  const desColor = getDescriptionColor(type);

  const markdownConverter = useMemo(() => {
    return new showdownMarkdown.Converter();
  }, []);

  const _description = useMemo(() => {
    if (description?.startsWith('markdown:')) {
      return ReactHtmlParser(markdownConverter.makeHtml(description.replace('markdown:', '')));
    } else if (description?.startsWith('html:')) {
      return ReactHtmlParser(description.replace('html:', ''));
    } else {
      return description;
    }
  }, [markdownConverter, description]);

  if (!title && !description) {
    return;
  }

  switch (type) {
    case 'usage':
      return getUsageTitle();
    default:
      return (
        <div
          style={{display: 'flex', flexDirection: 'column', flex: 4, alignContent: 'start', margin: '0 40px 40px 0'}}
        >
          {title && getTitle(type, title)}
          {description && <span style={{fontSize: '16px', fontWeight: '400', color: desColor}}>{_description}</span>}
        </div>
      );
  }
};
