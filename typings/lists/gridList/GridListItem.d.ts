/// <reference types="react" />
import { BaseComponent } from "../../commons";
declare type GridListItemProps = {
    index: number;
    title?: string;
    titleStyle?: object;
    secondaryTitle?: string;
    secondaryTitleStyle?: object;
    subtitle?: string;
    subtitleStyle?: object;
    onPress?: (...args: any[]) => any;
    height?: number;
    imageSource?: object;
    disabled?: boolean;
};
/** THIS IS DEPRECATED */
/**
 * GridListItem component
 */
export default class GridListItem extends BaseComponent<GridListItemProps, {}> {
    static displayName: string;
    static defaultProps: any;
    generateStyles(): void;
    renderTop(): JSX.Element;
    renderBottom(): JSX.Element;
    renderImage(): JSX.Element;
    renderSecondaryTitle(): JSX.Element;
    renderTitle(): JSX.Element;
    renderSubtitle(): JSX.Element;
    render(): JSX.Element;
}
export {};
