import _pt from "prop-types";
import React from 'react';
export let PageControlPosition;

(function (PageControlPosition) {
  PageControlPosition["OVER"] = "over";
  PageControlPosition["UNDER"] = "under";
})(PageControlPosition || (PageControlPosition = {}));

// @ts-ignore
class CarouselTypesForDocs extends React.Component {
  static propTypes = {
    /**
       * the first page to start with
       */
    initialPage: _pt.number,

    /**
       * the page width (all pages should have the same width). Does not work if passing 'loop' prop
       */
    pageWidth: _pt.number,

    /**
       * the page height (all pages should have the same height).
       */
    pageHeight: _pt.number,

    /**
       * the spacing between the items
       */
    itemSpacings: _pt.number,

    /**
       * Horizontal margin for the container
       */
    containerMarginHorizontal: _pt.number,

    /**
       * Vertical padding for the container.
       * Sometimes needed when there are overflows that are cut in Android.
       */
    containerPaddingVertical: _pt.number,

    /**
       * if true, will have infinite scroll (do not turn on for vertical scrolling)
       */
    loop: _pt.bool,

    /**
       * callback for when page has changed
       */
    onChangePage: _pt.func,

    /**
       * callback for onScroll event of the internal ScrollView
       */
    onScroll: _pt.func,

    /**
       * Should the container be animated (send the animation style via containerStyle)
       */
    animated: _pt.bool,

    /**
       * The position of the PageControl component ['over', 'under'], otherwise it won't display
       */
    pageControlPosition: _pt.oneOf(["over", "under"]),

    /**
       * whether to show a page counter (will not work with 'pageWidth' prop)
       */
    showCounter: _pt.bool,

    /**
       * will block multiple pages scroll (will not work with 'pageWidth' prop)
       */
    pagingEnabled: _pt.bool,

    /**
       * Whether to layout Carousel for accessibility
       */
    allowAccessibleLayout: _pt.bool,

    /**
       * Whether to switch automatically between the pages
       */
    autoplay: _pt.bool,

    /**
       * the amount of ms to wait before switching to the next page, in case autoplay is on
       */
    autoplayInterval: _pt.number,

    /**
       * When true the scroll view's children are arranged horizontally in a row
       * instead of vertically in a column. The default value is true.
       */
    horizontal: _pt.oneOfType([_pt.bool, _pt.oneOf([null])])
  };
  // eslint-disable-line
  static displayName = 'Carousel';

  render() {
    return null;
  }

}