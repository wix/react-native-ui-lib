import React from 'react';

// For use of applying dynamic context over all components

export default class UIComponent<P = {}, S = {}, SS = any> extends React.PureComponent<P, S, SS> {}
