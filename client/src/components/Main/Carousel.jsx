import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Carousel as MantineCarousel } from '@mantine/carousel';
import { Container, Image } from '@mantine/core';
import Autoplay from 'embla-carousel-autoplay';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import { PATH } from '../../constants';
import { addCoupon } from '../../api';
import { slidesQuery, verifyQuery } from '../../api/loader';

const Carousel = ({ modalOpen, setModalTitle }) => {
  const { data: slides } = useQuery(slidesQuery());
  const { data: verify } = useQuery(verifyQuery());
  const autoplay = useRef(Autoplay({ delay: 2000 }));
  const sideBackgroundColorsRef = useRef(slides.map(slide => slide.sideBackgroundColor));
  const [sideBackgroundColor, setSideBackgroundColor] = useState(sideBackgroundColorsRef.current.at(0));
  const navigate = useNavigate();

  const handleCarouselClick = async id => {
    if (!verify) navigate(PATH.SIGNIN);

    try {
      const { message } = await addCoupon(id);
      setModalTitle(message);
    } catch (e) {
      const { message } = e.response.data;
      setModalTitle(message);
    } finally {
      modalOpen();
    }
  };

  return (
    <Container
      w="100%"
      maw="100%"
      pos="relative"
      bg={sideBackgroundColor}
      sx={{
        transition: 'all .1s ',
      }}>
      <MantineCarousel
        mx="auto"
        maw="120rem"
        withIndicators
        loop
        plugins={[autoplay.current]}
        previousControlIcon={<SlArrowLeft size="5rem" color="white" />}
        nextControlIcon={<SlArrowRight size="5rem" color="white" />}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
        onSlideChange={idx => setSideBackgroundColor(sideBackgroundColorsRef.current.at(idx))}
        pos="static"
        sx={{
          '.mantine-Carousel-control': {
            border: 'none',
            backgroundColor: 'transparent',
            boxShadow: 'none',
          },
          '.mantine-Carousel-indicator': {
            width: '1rem',
            height: '1rem',
          },
        }}>
        {slides.map(({ id, imgURL, alt }) => (
          <Carousel.Slide key={id} onClick={() => handleCarouselClick(id)} sx={{ cursor: 'pointer' }}>
            <Image src={imgURL} alt={alt} fit="contain" height="45rem" />
          </Carousel.Slide>
        ))}
      </MantineCarousel>
    </Container>
  );
};

export default Carousel;
