/// <reference types="node" />
import React, { PureComponent } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Carousel from '../carousel';
import { ColorSwatchProps, ColorInfo } from '../colorSwatch';
interface Props {
    /**
     * Array of colors to render in the palette
     */
    colors: string[];
    /**
     * Style to pass the palette container
     */
    containerStyle?: StyleProp<ViewStyle>;
    /**
     * The container margins
     */
    containerWidth?: number;
    /**
     * Whether to use pagination when number of colors exceeds the number of rows
     */
    usePagination?: boolean;
    /**
     * Whether the colors pagination scrolls in a loop
     */
    loop?: boolean;
    /**
     * The number of color rows from 2 to 5
     */
    numberOfRows?: number;
    /**
     * Style to pass all the ColorSwatches in the palette
     */
    swatchStyle?: StyleProp<ViewStyle>;
    /**
     * The value of the selected swatch
     */
    value?: string;
    /**
     * The index of the item to animate at first render (default is last)
     */
    animatedIndex?: number;
    /**
     * Invoked once when value changes by selecting one of the swatches in the palette
     */
    onValueChange?: ColorSwatchProps['onPress'];
    style?: StyleProp<ViewStyle>;
    testID?: string;
    /**
     * The ColorPalette's background color
     */
    backgroundColor?: string;
}
export type ColorPaletteProps = Props;
interface State {
    currentPage: number;
    scrollable: boolean;
    orientation?: string;
    contentWidth?: number;
}
/**
 * @description: A color palette component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ColorPickerScreen.tsx
 * @notes: This is a screen width component
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/ColorPalette/ColorPalette.gif?raw=true
 */
declare class ColorPalette extends PureComponent<Props, State> {
    static displayName: string;
    static defaultProps: {
        numberOfRows: number;
        usePagination: boolean;
        loop: boolean;
        backgroundColor: string;
    };
    constructor(props: Props);
    carousel: React.RefObject<typeof Carousel>;
    scrollBar: React.RefObject<any>;
    itemsRefs?: any;
    selectedColorIndex?: number;
    selectedPage?: number;
    currentColorsCount?: number;
    itemsPerRow: number;
    itemsPerPage: number;
    usePagination?: boolean;
    innerMargin?: number;
    swatchStyles?: StyleProp<ViewStyle>[];
    private dimensionsChangeListener;
    componentDidMount(): void;
    componentDidUpdate(prevProps: Props): void;
    componentWillUnmount(): void;
    onOrientationChanged: () => void;
    initLocalVariables(): void;
    get value(): string | undefined;
    get colors(): any[];
    get containerWidth(): number;
    getUniqueColors: (this: any, colors: any) => any[];
    getNumberOfRows(): number;
    getItemsPerRow(): number;
    shouldUsePagination(): boolean | undefined;
    getInnerMargin(): number;
    scrollToSelected: () => NodeJS.Timeout;
    onContentSizeChange: (contentWidth: number) => void;
    onChangePage: (index: number) => void;
    onValueChange: (value: string, colorInfo: ColorInfo) => void;
    getHorizontalMargins: (index: number) => {
        marginLeft: number | undefined;
        marginRight: number | undefined;
    };
    getSwatchStyle: (index: number) => StyleProp<ViewStyle>;
    renderColorSwatch(color: string, index: number): React.JSX.Element;
    renderPalette(props: Props, contentStyle: StyleProp<ViewStyle>, colors: string[], pageIndex: number): React.JSX.Element;
    renderScrollableContent(): React.JSX.Element;
    renderPaginationContent(): React.JSX.Element;
    render(): React.JSX.Element;
}
export default ColorPalette;
