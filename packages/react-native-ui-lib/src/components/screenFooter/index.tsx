//IMPORTS
import React, {PropsWithChildren, useCallback, useMemo} from 'react';
import {DimensionValue, Image, StyleSheet} from 'react-native';
import View from '../view';
import {Colors, Spacings} from '../../style';
import {asBaseComponent} from '../../commons/new';
import {useKeyboardHeight} from '../../hooks';

//ENUMS

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
    SPREAD = 'spread',
}

export enum ItemsFit {
    FIT = 'fit',
    STRETCH = 'stretch',
    FIXED = 'fixed'
}

export enum ScreenFooterPosition {
    STICKY = 'sticky',
    HOISTED = 'hoisted'
}


//TYPE
export interface ScreenFooterProps extends PropsWithChildren<{}> {
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
     * Distribution of items in horizontal layout
     */
    HorizontalItemsDistribution?: HorizontalItemsDistribution | `${HorizontalItemsDistribution}`;
    /**
     * How items should fit in vertical layout
     */
    itemsFit?: ItemsFit | `${ItemsFit}`;
    /**
     * Footer position behavior
     */
    position?: ScreenFooterPosition | `${ScreenFooterPosition}`;
    /**
     * Fixed width for items (used with ItemsFit.FIXED)
     */
    itemWidth?: DimensionValue;
}

const ScreenFooter = (props: ScreenFooterProps) => {

    const {
        layout,
        alignment,
        horizontalAlignment,
        backgroundType,
        children,
        position = ScreenFooterPosition.STICKY,
        itemsFit,
        itemWidth,
        HorizontalItemsDistribution: distribution
    } = props;

    const keyboardHeight = useKeyboardHeight();
    const bottom = position === ScreenFooterPosition.HOISTED ? keyboardHeight : 0;

    const isSolid = backgroundType === ScreenFooterBackgrounds.SOLID;
    const isFading = backgroundType === ScreenFooterBackgrounds.FADING;
    const isHorizontal = layout === ScreenFooterLayouts.HORIZONTAL;
    // const isHoisted = position === ScreenFooterPosition.HOISTED;

    const justifyContent = useMemo(() => {
        if (isHorizontal) {
            // When SPREAD, items are distributed with space-between
            if (distribution === HorizontalItemsDistribution.SPREAD) {
                return 'space-between' as const;
            }
            // When STACK, horizontalAlignment controls left/center/right positioning
            switch (horizontalAlignment) {
                case FooterAlignment.START: return 'flex-start' as const;
                case FooterAlignment.END: return 'flex-end' as const;
                default: return 'center' as const;
            }
        }
        return 'flex-start' as const;
    }, [isHorizontal, distribution, horizontalAlignment]);

    const alignItems = useMemo(() => {
    
    if(layout === ScreenFooterLayouts.VERTICAL) {
        if(itemsFit === ItemsFit.STRETCH) {
            return 'stretch' as const;
        }
    }
    
    switch (alignment) {
        case FooterAlignment.START: return 'flex-start' as const;
        case FooterAlignment.END: return 'flex-end' as const;
        default: return 'center' as const;
    }
    }, [layout, itemsFit, alignment]);

    const contentContainerStyle = useMemo(() => {
        return [
            styles.contentContainer,
            layout === ScreenFooterLayouts.HORIZONTAL ? styles.horizontalContainer: styles.verticalContainer,
            {alignItems, justifyContent}        
        ]
    }, [layout, alignItems, justifyContent]);


    const renderBackground = useCallback(() => {
        
        if (isSolid) {
            return <View style={[styles.background, styles.solidBackground]} pointerEvents="none"/>
        }

        else if (isFading) {
            return (
                <View style={styles.background} pointerEvents="none">
                    <Image
                        source={require('./gradient.png')}
                        style={styles.background}
                        resizeMode='stretch'
                        tintColor={Colors.$backgroundDefault}
                    />
                </View>
            )
        }

        return null;

    }, [isSolid, isFading]);

    const renderChild = useCallback((child: React.ReactNode, index: number) => {
        if (itemsFit === ItemsFit.FIXED && itemWidth) {
            const fixedStyle = isHorizontal 
                ? {width: itemWidth, flexShrink: 1} 
                : {width: itemWidth};
            return (
                <View key={index} style={fixedStyle}>
                    {child}
                </View>
            );
        }

        if (isHorizontal && React.isValidElement(child)) {
            const flexStyle = itemsFit === ItemsFit.STRETCH ? {flex: 1} : {flexShrink: 1};
            return React.cloneElement<any>(child, {
                key: index,
                style: [child.props.style, flexStyle]
            });
        }

        return child;
    }, [itemsFit, itemWidth, isHorizontal]);

    const childrenArray = React.Children.toArray(children).slice(0, 3).map(renderChild);

    return (
        <View
          style={[styles.container, {bottom}]}>
            {renderBackground()}
            <View style={contentContainerStyle}>
                {childrenArray}
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    },
    contentContainer: {
        paddingTop: Spacings.s4,
        paddingHorizontal: Spacings.s5,
        paddingBottom: Spacings.s5,
    },
    horizontalContainer: {
        flexDirection: 'row',
        gap: Spacings.s5,
    },
    verticalContainer: {
        flexDirection: 'column',
        gap: Spacings.s3
    },
    background: {
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        height: '100%'
    },
    solidBackground: {
        backgroundColor: Colors.$backgroundElevated //maybe elevated light? not sure
    }
});

export default asBaseComponent<ScreenFooterProps, typeof ScreenFooter>(ScreenFooter);