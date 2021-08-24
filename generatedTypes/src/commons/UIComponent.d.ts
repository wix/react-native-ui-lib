import React from 'react';
export default class UIComponent<P = {}, S = {}, SS = any> extends React.PureComponent<P, S, SS> {
    static defaultProps: any;
}
