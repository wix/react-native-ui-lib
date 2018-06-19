/// <reference types="react" />
import { BaseComponent } from "../commons";
declare type BaseListItemProps = {
    onPress?: (...args: any[]) => any;
};
/** THIS IS DEPRECATED */
/**
 * BaseListItem component
 */
export default class BaseListItem extends BaseComponent<BaseListItemProps, {}> {
    static displayName: string;
    renderLeft(): any;
    renderMiddle(): JSX.Element;
    renderMiddleTop(): any;
    renderMiddleBottom(): any;
    renderRight(): any;
    generateStyles(overrides: any): void;
    render(): JSX.Element;
}
export {};
