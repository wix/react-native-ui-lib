/// <reference types="react" />
import { BaseComponent } from "../../commons";
declare type TagsInputProps = {
    tags?: (object | string)[];
    getLabel?: (...args: any[]) => any;
    renderTag?: (...args: any[]) => any;
    onChangeTags?: (...args: any[]) => any;
    onCreateTag?: (...args: any[]) => any;
    onTagPress?: (...args: any[]) => any;
    disableTagRemoval?: boolean;
    disableTagAdding?: boolean;
    containerStyle?: any;
    tagStyle?: any;
    inputStyle?: any;
    hideUnderline?: boolean;
};
declare type TagsInputState = {
    tags: any | any[];
    value: string | any;
    tagIndexToRemove: undefined | any | number;
};
/**
 * @description: Tags input component (chips)
 * @modifiers: Typography
 * @gif: https://camo.githubusercontent.com/9c2671024f60566b980638ea01b517f6fb509d0b/68747470733a2f2f6d656469612e67697068792e636f6d2f6d656469612f336f45686e374a79685431566658746963452f67697068792e676966
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/FormScreen.js
 */
export default class TagsInput extends BaseComponent<TagsInputProps, TagsInputState> {
    static displayName: string;
    static onChangeTagsActions: {
        ADDED: string;
        REMOVED: string;
    };
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentWillReceiveProps(nextProps: any): void;
    addTag(): void;
    removeMarkedTag(): void;
    markTagIndex(tagIndex: any): void;
    onChangeText(value: any): void;
    onTagPress(index: any): void;
    isLastTagMarked(): boolean;
    onKeyPress(event: any): void;
    getLabel(item: any): any;
    renderLabel(tag: any, shouldMarkTag: any): JSX.Element;
    renderTag(tag: any, index: any): any;
    renderTagWrapper(tag: any, index: any): JSX.Element;
    renderTextInput(): JSX.Element;
    render(): JSX.Element;
}
export {};
