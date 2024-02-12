import React from 'react';
import AliceCarousel from 'react-alice-carousel';

const Carousel = ({ children }: { children: React.ReactNode }) => {
  const responsive = {
    0: {
      items: 1.4,
    },
    580: {
      items: 1.8,
      itemsFit: 'contain',
    },
    640: {
      items: 2.2,
      itemsFit: 'contain',
    },
    768: {
      items: 2.5,
      itemsFit: 'contain',
    },
    840: {
      items: 2.8,
      itemsFit: 'contain',
    },
    915: {
      items: 3.2,
      itemsFit: 'contain',
    },
    1024: {
      items: 3.8,
      itemsFit: 'contain',
    },
    1200: {
      items: 4.5,
      itemsFit: 'contain',
    },
    1400: {
      items: 5.5,
      itemsFit: 'contain',
    },
    1600: {
      items: 6.5,
      itemsFit: 'contain',
    },
    1800: {
      items: 7.5,
      itemsFit: 'contain',
    },
  };

  return (
    <AliceCarousel
      mouseTracking
      touchTracking
      animationType="slide"
      disableDotsControls={true}
      disableButtonsControls={true}
      keyboardNavigation={true}
      responsive={responsive}
    >
      {children}
    </AliceCarousel>
  );
};

export default Carousel;
