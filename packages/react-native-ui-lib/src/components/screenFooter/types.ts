import {PropsWithChildren} from 'react';
import {DimensionValue, StyleProp, ViewStyle} from 'react-native';

export enum ScreenFooterLayouts {
    HORIZONTAL = 'horizontal',
    VERTICAL = 'vertical'
}

export enum ScreenFooterBackgrounds {
    FADING = 'fading',
    SOLID = 'solid',
    TRANSPARENT = 'transparent'
}

export enum FooterAlignment {
    START = 'start',
    CENTER = 'center',
    END = 'end'
}

export enum HorizontalItemsDistribution {
    STACK = 'stack',
    SPREAD = 'spread'
}

export enum ItemsFit {
    FIT = 'fit',
    STRETCH = 'stretch',
    FIXED = 'fixed'
}

export enum KeyboardBehavior {
    STICKY = 'sticky',
    HOISTED = 'hoisted'
}

export enum ScreenFooterShadow {
    SH10 = 'sh10',
    SH20 = 'sh20',
    SH30 = 'sh30'
}

export enum ScreenFooterAnimation {
    NONE = 'none',
    SLIDE = 'slide',
    FADE = 'fade'
}

export type ScreenFooterAnimationTypeProp = ScreenFooterAnimation | `${ScreenFooterAnimation}`;

export interface AnimatedFooterStyleProps {
    /**
     * The type of animation to use when showing or hiding the footer.
     * @default 'slide'
     */
    animationType?: ScreenFooterAnimationTypeProp;
    /**
     * Duration of the show/hide animation in ms (sending 0 will disable the animation).
     * @default 200
     */
    animationDuration?: number;
}

export interface ScreenFooterProps extends AnimatedFooterStyleProps, PropsWithChildren<{}> {
    /**
     * Used as testing identifier
     */
    testID?: string;
    /**
     * The background style of the footer
     */
    backgroundType?: ScreenFooterBackgrounds | `${ScreenFooterBackgrounds}`;
    /**
     * The layout direction of footer items
     */
    layout?: ScreenFooterLayouts | `${ScreenFooterLayouts}`;
    /**
     * Cross-axis alignment:
     * - Vertical layout: controls horizontal position (left/center/right)
     * - Horizontal layout: controls vertical position (top/center/bottom)
     */
    alignment?: FooterAlignment | `${FooterAlignment}`;
    /**
     * Main-axis alignment for horizontal layout only (when distribution is STACK):
     * Controls horizontal position (left/center/right) of the stacked items
     */
    horizontalAlignment?: FooterAlignment | `${FooterAlignment}`;
    /**
     * Distribution of items in horizontal layout (stack/spread)
     */
    horizontalItemsDistribution?: HorizontalItemsDistribution | `${HorizontalItemsDistribution}`;
    /**
     * How items should fit in vertical layout (fit/fixed/stretch)
     */
    itemsFit?: ItemsFit | `${ItemsFit}`;
    /**
     * The footer's keyboard behavior.
     * When STICKY, the footer will stay at the bottom of the screen when keyboard is opened.
     * When HOISTED, the footer will be pushed up when keyboard is opened.
     */
    keyboardBehavior?: KeyboardBehavior | `${KeyboardBehavior}`;
    /**
     * Fixed width for all items (used with ItemsFit.FIXED)
     */
    itemWidth?: DimensionValue;
    /**
     * If true, the footer is visible. If false, it slides down.
     */
    visible?: boolean;
    /**
     * If true, the footer will respect the safe area (add bottom padding)
     */
    useSafeArea?: boolean;
    /**
     * Shadow preset for solid background (default: SH20)
     * Only applies when backgroundType is 'solid'
     */
    shadow?: ScreenFooterShadow | `${ScreenFooterShadow}`;
    /**
     * If true, hides the top divider for solid background (default: false)
     * Only applies when backgroundType is 'solid'
     */
    hideDivider?: boolean;
    /**
     * Custom style for the outer container of the footer.
     */
    containerStyle?: StyleProp<ViewStyle>;
    /**
     * Custom style for the content container that wraps the footer's children.
     * Can be used to override default padding, gap, or other layout properties.
     */
    contentContainerStyle?: StyleProp<ViewStyle>;
    /**
     * Is this an Android device that supports edge-to-edge
     * Defaults to true for Android with version 35 and above, undefined for others
     */
    isAndroidEdgeToEdge?: boolean;
}

