/// <reference types="react" />
export declare type ExpandableListItemProps = {
  /**
   * expandableListItem text element
   */
  textElement?: JSX.Element;
  /**
   * elements to be in expandableListItem carousel
   */
  contentElement?: JSX.Element;
  /**
   * expandableListItem icon color
   */
  iconColor?: string;
  };
declare function ExpandableListItem(props: ExpandableListItemProps): JSX.Element;
declare namespace ExpandableListItem {
    var displayName: string;
}
export default ExpandableListItem;
