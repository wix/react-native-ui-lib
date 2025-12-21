//IMPORTS



//ENUMS

export enum ScreenFooterLayouts {
    HORIZONTAL = 'horizontal',
    VERTICAL = 'vertical'
}

export enum ScreenFooterBackgrounds {
    FADING = 'fading',
    SOLID = 'solid'
}

//CHECK REGARDING A L/R ALLIGNMENT?
export enum FooterAlignment {
    TOP = 'top',
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

export interface ScreenFooterProps {

    visible?: boolean;
    withoutAnimation?: boolean;
    animationDuration?: boolean;
    //animationType?: ScreenFooterAnimationType | `${ScreenFooterAnimationType}`
    hideOnScroll?: boolean; //Not sure whether how it's supposed to be working with the parent

    background?: ScreenFooterBackgrounds | `${ScreenFooterBackgrounds}`;
    layout?: ScreenFooterLayouts | `${ScreenFooterLayouts}`;
    alignment?: FooterAlignment | `${FooterAlignment}`;
    itemsDistribution?: ItemsDistribution | `${ItemsDistribution}`;
    itemsFit?: ItemsFit | `${ItemsFit}`;
    footerPosition?: ScreenFooterPosition | `${ScreenFooterPosition}`;






}