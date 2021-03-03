import React from 'react';
export declare type ExpandableSectionProps = {
    /**
     * expandableSection header element
     */
    sectionHeader?: JSX.Element;
    /**
     * expandableSection expandable children
     */
    children?: React.ReactNode;
    /**
     * should the expandableSection be expanded
     */
    expanded?: boolean;
    /**
     * should the expandableSection open above the sectionHeader
     */
    top?: boolean;
    /**
     * action for when pressing the header of the expandableSection
     */
    onPress?: () => void;
};
/**
 * @description: ExpandableSection component to render expanded section below or above the sectionHeader
 * @gif: https://media.giphy.com/media/uCGZ92nZPdBOmF1H1z/giphy.gif, https://media.giphy.com/media/0VIh41mkSl8omS49oD/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ExpandableSectionScreen.tsx
 */
declare function ExpandableSection(props: ExpandableSectionProps): JSX.Element;
export default ExpandableSection;
