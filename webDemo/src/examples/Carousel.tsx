import React, {useState} from 'react';
import Carousel from 'react-native-ui-lib/Carousel';
import Text from 'react-native-ui-lib/Text';
import View from 'react-native-ui-lib/View';
import {Spacings} from 'react-native-ui-lib/style';


const INITIAL_PAGE = 2;
const IMAGES = [
  'https://images.pexels.com/photos/2529159/pexels-photo-2529159.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/2529146/pexels-photo-2529146.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/2529158/pexels-photo-2529158.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
];


const CarouselWrapper = () => {
  const carousel = React.useRef<typeof Carousel>(undefined);

  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);

  const onPagePress = (index: number) => {
    if (carousel && carousel.current) {
      carousel.current.goToPage(index, true);
    }
  };

  const onChangePage = (currentPage: number) => {
    setCurrentPage(currentPage);
  };

  // @ts-ignore
  const Page = ({children, style, ...others}) => {
    return (
      <View
        {...others} style={[{
          flex: 1,
          borderWidth: 1,
          borderRadius: 8
        }, style]}
      >
        {children}
      </View>
    );
  };

  return (
    <View style={{width: 300}}>
      <Carousel
        key={'car-ro'}
        ref={carousel}
        //loop
        autoplay
        onChangePage={onChangePage}
        pageWidth={200}
        itemSpacings={Spacings.s3}
        containerMarginHorizontal={Spacings.s2}
        initialPage={INITIAL_PAGE}
        containerStyle={{height: 160, width: '100%'}}
        pageControlPosition={Carousel.pageControlPositions.UNDER}
        pageControlProps={{onPagePress}}
      >
        {IMAGES.map((item, index) => (
          <Page style={{backgroundColor: item}} key={index}>
            <Text margin-15>CARD {index}</Text>
          </Page>
        ))}
      </Carousel>
    </View>
  );
};

export default CarouselWrapper;
