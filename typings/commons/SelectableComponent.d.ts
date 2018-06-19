/// <reference types="react" />
import BaseComponent from "./BaseComponent";
declare type SelectableComponentProps = {
    selectable?: boolean;
    selected?: boolean;
    selectableIndicatorSize?: number;
    selectableIndicatorType?: any;
    selectableIndicatorColor?: string;
};
declare type SelectableComponentState = {
    selected: any | boolean;
};
export default class SelectableComponent extends BaseComponent<SelectableComponentProps, SelectableComponentState> {
    static defaultProps: {
        selectableIndicatorSize: number;
        selectableIndicatorType: string;
        selectableIndicatorColor: any;
    };
    static indicatorTypes: {
        CIRCLE: string;
        CLEAN: string;
    };
    constructor(props: any);
    componentWillReceiveProps(newProps: any): void;
    generateStyles(): void;
    getIndicatorContainerStyle(): any[];
    getIndicatorIconStyle(): any[];
    renderSelectableIndicator(): JSX.Element;
    onSelect(): void;
}
export {};
