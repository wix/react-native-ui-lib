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
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ExpandableSectionScreen.tsx
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/ExpandableSection/ExpandableSection.gif?raw=true
 */
declare function ExpandableSection(props: ExpandableSectionProps): JSX.Element;
export default ExpandableSection;
