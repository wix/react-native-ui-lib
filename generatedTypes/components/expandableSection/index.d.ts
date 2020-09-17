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
     * expandableSection icon color
     */
    iconColor?: string;
};
declare function ExpandableSection(props: ExpandableSectionProps): JSX.Element;
export default ExpandableSection;
