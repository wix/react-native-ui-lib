import React, {useEffect, useState} from 'react';
import {default as ThemeCodeBlock, Props} from '@theme/CodeBlock';
import prettier from 'prettier/standalone';
import parser from 'prettier/parser-babel';

type CodeBlockProps = {
  snippet: string;
  printWidth?: number;
  fontSize?: number;
  show: boolean;
} & Omit<Props, 'children'>;

const CodeBlock: React.FC<CodeBlockProps> = ({
  snippet,
  language,
  printWidth = 30,
  fontSize = 14,
  showLineNumbers,
  show,
  ...others
}) => {
  const [code, setCode] = useState<string>('formatting...');

  useEffect(() => {
    (async () => {
      const formattedCode = await prettier.format(snippet.trim(), {
        parser: 'babel',
        plugins: [parser],
        trailingComma: 'none',
        singleQuote: true,
        printWidth
      });
      const noLastSemiColonCode = formattedCode.trim().slice(0, -1);
      setCode(noLastSemiColonCode);
    })();
  }, [snippet, printWidth]);

  return (
    <div
      style={{
        textAlign: 'left',
        fontSize,
        maxWidth: printWidth * fontSize,
        maxHeight: show ? 400 : 0,
        overflowY: 'auto',
        transition: 'maxHeight 500ms'
      }}
    >
      <ThemeCodeBlock language={language ?? 'jsx'} showLineNumbers={showLineNumbers ?? true} {...others}>
        {code}
      </ThemeCodeBlock>
    </div>
  );
};

export default CodeBlock;
