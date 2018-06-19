/// <reference types="react" />
import GridListItem from "./GridListItem";
/** THIS IS DEPRECATED */
/**
 * GridListNewItem component
 */
export default class GridListNewItem extends GridListItem {
    static displayName: string;
    static propTypes: {
        index: any;
        imageSource: any;
        imageSize: any;
        title: any;
        titleStyle: any;
        onPress: any;
        height: any;
    };
    static defaultProps: any;
    generateStyles(): void;
    renderTop(): JSX.Element;
    renderBottom(): JSX.Element;
    renderImage(): JSX.Element;
    renderTitle(): JSX.Element;
}
