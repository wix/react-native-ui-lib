import React from 'react';
import DocRoot from '@theme/DocRoot';
import StandWithUkraine from '@site/src/components/StandWithUkraine';

export default function CustomLayout(props) {
  return (
    <>
      <StandWithUkraine/>
      <DocRoot {...props}/>
    </>
  );
}
