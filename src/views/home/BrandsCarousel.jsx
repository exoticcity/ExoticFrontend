import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box } from '@mui/material';
import './style.css'

// Array of dummy image URLs
const dummyImages = [
  '/assets/brands/africa.jpg', '/assets/brands/care.jpg',  '/assets/brands/congo.jpg', '/assets/brands/desi.jpg',
  '/assets/brands/exotic.jpg', '/assets/brands/mr.jpg', '/assets/brands/nuts.jpg', '/assets/brands/royal.jpg', '/assets/brands/thai.jpg', '/assets/brands/utouch.jpg',
  '/assets/brands/village.jpg'
];

const BrandCarousel = () => {
  const settings = {
    dots: true, infinite: true, speed: 1500, slidesToShow: 8, slidesToScroll: 1, autoplay: true, autoplaySpeed: 10,
  };

  return (
    <>
      <div style={{ maxWidth: '85%', margin: '0 auto', height: '100%'}} >
        <Slider {...settings}>
          {dummyImages?.map((image, index) => (
            <Box key={index} textAlign="center">
              <img className="hover-zoom" src={image} alt={`Brand ${index}`} style={{ maxWidth: '100%', cursor: 'pointer', transition: 'transform 0.2s', }} />
            </Box>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default BrandCarousel;
