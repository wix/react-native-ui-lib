import React, {useEffect, useState} from 'react';
import {default as ThemeCodeBlock, Props} from '@theme/CodeBlock';
import prettier from 'prettier/standalone';
import parser from 'prettier/parser-babel';

type CodeBlockProps = {
  snippet: string;
  printWidth?: number;
  fontSize?: number;
} & Omit<Props, 'children'>;

const CodeBlock: React.FC<CodeBlockProps> = ({
  snippet,
  language,
  printWidth = 30,
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

  return (
    <div
      style={{
        textAlign: 'left',
        fontSize,
        maxWidth: printWidth * fontSize,
        maxHeight: 400,
        overflowY: 'auto'
      }}
    >
      <ThemeCodeBlock language={language ?? 'jsx'} showLineNumbers={showLineNumbers ?? true} {...others}>
        {code}
      </ThemeCodeBlock>
    </div>
  );
};

export default CodeBlock;
