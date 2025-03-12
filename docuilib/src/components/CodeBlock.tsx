import React, {useMemo, ComponentProps} from 'react';
import {default as ThemeCodeBlock, Props} from '@theme/CodeBlock';
import styles from './CodeBlock.module.scss';
import useFormattedCode from '../hooks/useFormattedCode';

type CodeBlockProps = {
  snippet: string;
  printWidth?: number;
  fontSize?: number;
} & Omit<Props, 'children'>;

const CodeBlock: React.FC<CodeBlockProps> = ({
  snippet,
  language,
  printWidth = 35,
  fontSize = 14,
  showLineNumbers,
  ...others
}) => {
  const {code} = useFormattedCode(snippet, {printWidth});

  const containerStyle = useMemo<ComponentProps<'div'>['style']>(() => {
    return {
      fontSize,
      maxWidth: printWidth * fontSize
    };
  }, [fontSize, printWidth]);

  return (
    <div style={containerStyle} className={styles.codeBlockContainer}>
      <ThemeCodeBlock
        className={styles.codeBlock}
        language={language ?? 'jsx'}
        showLineNumbers={showLineNumbers ?? true}
        {...others}
      >
        {code}
      </ThemeCodeBlock>
    </div>
  );
};

export default CodeBlock;
