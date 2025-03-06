import React, {useEffect, useState, useMemo} from 'react';
import {default as ThemeCodeBlock, Props} from '@theme/CodeBlock';
import prettier from 'prettier/standalone';
import parser from 'prettier/parser-babel';
import styles from './CodeBlock.module.scss';

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
  const [code, setCode] = useState<string>('formatting...');

  useEffect(() => {
    (async () => {
      const formattedCode = await prettier.format(snippet.trim(), {
        parser: 'babel',
        plugins: [parser],
        singleQuote: true,
        printWidth
      });
      const noLastSemiColonCode = formattedCode.trim().slice(0, -1);
      setCode(noLastSemiColonCode);
    })();
  }, [snippet, printWidth]);

  const containerStyle = useMemo(() => {
    return {
      fontSize,
      maxWidth: printWidth * fontSize
    };
  }, [fontSize, printWidth]);

  return (
    <div style={containerStyle}>
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
