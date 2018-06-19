/// <reference types="react" />
import { TextInput } from "../inputs";
/**
 * @description: Picker Component, support single or multiple selection, blurModel and floatingPlaceholder
 * @extends: TextInput
 * @extendslink: docs/TextInput
 * @gif: https://media.giphy.com/media/3o751SiuZZiByET2lq/giphy.gif, https://media.giphy.com/media/TgMQnyw5grJIDohzvx/giphy.gif, https://media.giphy.com/media/5hsdmVptBRskZKn787/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/FormScreen.js
 */
declare class Picker extends TextInput {
    static displayName: string;
    static modes: {
        SINGLE: string;
        MULTI: string;
    };
    static propTypes: any;
    static defaultProps: any;
    constructor(props: any);
    componentWillReceiveProps(nexProps: any): void;
    toggleItemSelection(item: any): void;
    onDoneSelecting(item: any): void;
    onSearchChange: (searchValue: any) => void;
    cancelSelect(): void;
    onSelectedItemLayout: ({ nativeEvent: { layout: { y } } }: {
        nativeEvent: {
            layout: {
                y: any;
            };
        };
    }) => void;
    appendPropsToChildren(): any;
    getLabel(): any;
    handlePickerOnPress(): void;
    renderExpandableInput(): JSX.Element;
    renderExpandableModal(): JSX.Element;
    render(): any;
}
export default Picker;
