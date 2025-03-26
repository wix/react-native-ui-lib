import {useEffect, useState} from 'react';
import prettier from 'prettier/standalone';
import parser from 'prettier/parser-babel';

type UseFormattedCodeOptions = {
  printWidth?: number;
};
const useFormattedCode = (code: string, {printWidth = 35}: UseFormattedCodeOptions = {}) => {
  const [formattedCode, setFormattedCode] = useState<string>('');

  useEffect(() => {
    (async () => {
      const formattedCode = await prettier.format(code.trim(), {
        parser: 'babel',
        plugins: [parser],
        singleQuote: true,
        printWidth
      });
      const noLastSemiColonCode = formattedCode.trim().slice(0, -1);
      setFormattedCode(noLastSemiColonCode);
    })();
  }, [code, printWidth]);

  return {code: formattedCode};
};

export default useFormattedCode;
