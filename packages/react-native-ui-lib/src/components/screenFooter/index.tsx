//IMPORTS
import React, {PropsWithChildren, useCallback, useMemo} from 'react';
import { Image, StyleSheet } from 'react-native';
import View from '../view';
import {Colors, Spacings} from '../../style';
import {asBaseComponent} from '../../commons/new';

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

    background?: ScreenFooterBackgrounds | `${ScreenFooterBackgrounds}`;
    layout?: ScreenFooterLayouts | `${ScreenFooterLayouts}`
    alignment?: FooterAlignment | `${FooterAlignment}`
    HorizontalItemsDistribution?: HorizontalItemsDistribution | `${HorizontalItemsDistribution}`
    itemsFit?: ItemsFit | `${ItemsFit}`

}

const ScreenFooter = (props: ScreenFooterProps) => {

    const {
        layout,
        alignment,
        background,
        children
    } = props;

    // ADD STATE MANAGEMENT
    //ADD HOOKS

    const isSolid = background === ScreenFooterBackgrounds.SOLID;
    const isFading = background === ScreenFooterBackgrounds.FADING;
    const isTransparent = background === ScreenFooterBackgrounds.TRANSPARENT;
    const isHorizontal = layout === ScreenFooterLayouts.HORIZONTAL;

    const contentContainerStyle = useMemo(() => {

        return [
            styles.contentContainer,
            layout === ScreenFooterLayouts.HORIZONTAL ? styles.horizontalContainer: styles.verticalContainer
            //Add alignment logic also        
        ]
    }, [layout]);


    const renderBackground = useCallback(() => {
        
        if (isSolid) {
            return <View style={[styles.background, styles.solidBackground]} pointerEvents="none"/>
        }

        else if (isFading) {
            return (
                <View style={[styles.background, styles.gradientBackground]} pointerEvents="none">
                    <Image
                        source={require('./gradient.png')}
                        style={styles.gradientImage}
                        resizeMode='stretch'
                        tintColor={Colors.$backgroundDefault}
                    />
                </View>
            )
        }

        return null;

    }, [isSolid, isFading]);

    const childrenArray = React.Children.toArray(children).slice(0, 3)

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
    container: {},
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
        zIndex: -1
    },
    solidBackground: {
        backgroundColor: Colors.$backgroundElevated //maybe elevated light? not sure
    },
    gradientBackground: {},
    gradientImage: {
        flex: 1,
        width: '100%',
        height: '100%'
    }
});

export default asBaseComponent<ScreenFooterProps, typeof ScreenFooter>(ScreenFooter);