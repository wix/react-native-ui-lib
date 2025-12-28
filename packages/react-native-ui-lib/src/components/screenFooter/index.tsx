//IMPORTS
import React, {PropsWithChildren, useCallback, useMemo} from 'react';
import { DimensionValue, Image, StyleSheet } from 'react-native';
import View from '../view';
import {Colors, Spacings} from '../../style';
import {asBaseComponent} from '../../commons/new';
// import { useKeyboardHeight } from 'hooks';

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

    backgroundType?: ScreenFooterBackgrounds | `${ScreenFooterBackgrounds}`;
    layout?: ScreenFooterLayouts | `${ScreenFooterLayouts}`
    alignment?: FooterAlignment | `${FooterAlignment}`
    HorizontalItemsDistribution?: HorizontalItemsDistribution | `${HorizontalItemsDistribution}`
    itemsFit?: ItemsFit | `${ItemsFit}`
    position?: ScreenFooterPosition | `${ScreenFooterPosition}`;
    itemWidth?: DimensionValue;

}

const ScreenFooter = (props: ScreenFooterProps) => {

    const {
        layout,
        alignment,
        backgroundType,
        children,
        position = ScreenFooterPosition.STICKY,
        itemsFit,
        itemWidth
    } = props;

    // ADD STATE MANAGEMENT
    //ADD HOOKS

    const isSolid = backgroundType === ScreenFooterBackgrounds.SOLID;
    const isFading = backgroundType === ScreenFooterBackgrounds.FADING;
    const isHorizontal = layout === ScreenFooterLayouts.HORIZONTAL;
    // const isHoisted = position === ScreenFooterPosition.HOISTED;

    const alignItems = useMemo(() => {

    if(layout === ScreenFooterLayouts.VERTICAL) {
        if(itemsFit === ItemsFit.STRETCH) {
            return 'stretch' as const;
        }
        switch (alignment) {
            case FooterAlignment.START: return 'flex-start' as const;
            case FooterAlignment.END: return 'flex-end' as const;
            default: return 'center' as const;
        }
    }
        return 'center';
    }, [layout, itemsFit, alignment]);

    const contentContainerStyle = useMemo(() => {
        return [
            styles.contentContainer,
            layout === ScreenFooterLayouts.HORIZONTAL ? styles.horizontalContainer: styles.verticalContainer,
            {alignItems}        
        ]
    }, [layout, alignItems]);


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
        if (itemsFit === ItemsFit.FIXED && itemWidth && layout === ScreenFooterLayouts.VERTICAL) {
            return (
                <View key={index} style={{width: itemWidth}}>
                    {child}
                </View>
            );
        }
        return child;
    }, [itemsFit, itemWidth, isHorizontal]);

    const childrenArray = React.Children.toArray(children).slice(0, 3).map(renderChild);

    return (
        <View
          style={[styles.container]}>
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
        paddingBottom: Spacings.s5
    },
    horizontalContainer: {
        flexDirection: 'row',
        gap: Spacings.s3,
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