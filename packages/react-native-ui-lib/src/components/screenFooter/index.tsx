//IMPORTS
import React, { useCallback, useMemo } from 'react';
import { Image, StyleSheet } from 'react-native';
import View from '../view';
import {Colors, Shadows, Spacings} from '../../style';
import Button, { ButtonProps } from '../button';
import { render } from '@testing-library/react-native';


//ENUMS

export enum ScreenFooterLayouts {
    HORIZONTAL = 'horizontal',
    VERTICAL = 'vertical'
}

export enum ScreenFooterBackgrounds {
    FADING = 'fading',
    SOLID = 'solid',
    //TRANSPARENT?
}

//CHECK REGARDING A L/R ALLIGNMENT?
export enum FooterAlignment {
    START = 'start',
    CENTER = 'center', 
    END = 'end'
}

export enum ItemsDistribution {
    STACK = 'stack', 
    SPREAD = 'spread',
    // SPACE_EVENLY = 'space-evenly', perhaps rely on stretch + gap?
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

export type ScreenFooterButtonProps = ButtonProps & {
    stretch?: boolean;
}

export interface ScreenFooterProps {

    background?: ScreenFooterBackgrounds | `${ScreenFooterBackgrounds}`;

    layout?: ScreenFooterLayouts | `${ScreenFooterLayouts}`
    alignment?: FooterAlignment | `${FooterAlignment}`
    itemsDistribution?: ItemsDistribution | `${ItemsDistribution}`
    itemsFit?: ItemsFit | `${ItemsFit}`

    primaryButton?: ScreenFooterButtonProps;
    secondaryButton?: ScreenFooterButtonProps;
    tertiaryButton?: ScreenFooterButtonProps;

    //buttonMargin?: number

}

const screenFooter = (props: ScreenFooterProps) => {

    const {
        layout,
        alignment,
        primaryButton, 
        secondaryButton, 
        tertiaryButton,
        background

    } = props;

    // ADD STATE MANAGEMENT
    //ADD HOOKS

    const isSolid = background === ScreenFooterBackgrounds.SOLID;
    const isFading = background === ScreenFooterBackgrounds.FADING;
    const isHorizontal = layout === ScreenFooterLayouts.HORIZONTAL;

    const contentContainerStyle = useMemo(() => {

        return [
            styles.contentContainer,
            isHorizontal ? styles.horizontalContainer: styles.verticalContainer
            //Add alignment logic also        
        ]
    }, [layout, alignment]);


    const renderBackground = useCallback(() => {
        
        if (isSolid) {
            return <View style={styles.solidBackground}/>
        }

        else if (isFading) {
            return (
                <View style={styles.gradientBackground}>
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

    const renderButton = (props: ScreenFooterButtonProps) => {

        const {stretch, style, ...others} = props;

        return (
            <Button
            fullWidth={stretch}
            style={[style, stretch && {flex: 1}]}
             {...others}/>
        )

    }

    return (
        <View
          style={[styles.container]}
        >
            {renderBackground()}
            <View style={contentContainerStyle}>
                {layout === ScreenFooterLayouts.HORIZONTAL ? (
                    <>
                    {tertiaryButton && renderButton(tertiaryButton)}
                    {secondaryButton && renderButton(secondaryButton)}
                    {primaryButton && renderButton(primaryButton)}
                    </>
                ) : (
                    <>
                    {primaryButton && renderButton(primaryButton)}
                    {secondaryButton && renderButton(secondaryButton)}
                    {tertiaryButton && renderButton(tertiaryButton)} 
                    </>
                )}
            </View>
            
        </View>
    )
}




const styles = StyleSheet.create({
    container: {

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
    solidBackground: {
        backgroundColor: Colors.$backgroundElevated //maybe elevated light? not sure
    },
    gradientBackground: {
        
    },
    gradientImage: {

    }
});

export default screenFooter; 
