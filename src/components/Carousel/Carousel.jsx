import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import { motion } from 'framer-motion';
// Componentes styled para los elementos de texto
const SlideTitle = styled(motion.div)`
  ${(props) =>
    props.$isTitle &&
    `
    color: #790f2e;
    font-size: 5.2rem;
    font-weight: 600;
  `}
`;

const SlideSubtitle = styled.div`
  ${(props) =>
    props.$isSubtitle &&
    `
    color: #685538;
    font-size: 1.8rem;
    font-weight: 600;
  `}
`;

const SlideDescription = styled.p`
  ${(props) =>
    props.$isDescription &&
    `
    color: #685538;
    font-size: 1.2rem;
    font-weight: 400;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  `}
`;

// Datos de ejemplo para las diapositivas
const slides = [
  {
    image: '../../../assets/globo-aerostatico.jpeg',
    title: 'Eleva tu diversión a nuevas alturas',
    subtitle: 'Descubre una perspectiva diferente de la emoción',
    description:
      'La vida se convierte en un lienzo de posibilidades, donde cada momento es una oportunidad para crear recuerdos inolvidables.',
  },
  {
    image: '../../../assets/juegoAqua.jpeg',
    title: 'Momentos acuáticos de alegría familiar',
    subtitle:
      'Donde los recuerdos felices se crean a través del juego y las risas',
    description:
      'Una experiencia revitalizante que fortalece los lazos familiares mientras disfrutan del verano al máximo.',
  },
  {
    image: '../../../assets/air-hockey.jpeg',
    title: 'Las Grandes Ligas de la Diversión',
    subtitle: '¡Donde los juegos cobran vida!',
    description:
      'Efectos de iluminación envolventes te transportarán a mundos de aventura sin límites.',
  },
];

// Componente styled para el contenedor de la diapositiva
const Slide = styled.div`
  position: relative;
  width: 100%;
  height: 500px;

  .image-container {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(3px);
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .slide-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    width: 100%;
    z-index: 1;
  }
`;

// Componente para cada diapositiva
const SlideContent = ({ image, title, subtitle, description }) => {
  return (
    <Slide>
      <div className='image-container'>
        <img src={image} alt='Slide' />
      </div>
      <div className='slide-text'>
        <SlideTitle $isTitle>{title}</SlideTitle>
        {subtitle && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <SlideSubtitle $isSubtitle>{subtitle}</SlideSubtitle>
          </motion.div>
        )}
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1.2 }}
          >
            <SlideDescription $isDescription>{description}</SlideDescription>
          </motion.p>
        )}
      </div>
    </Slide>
  );
};

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    vertical: true,
  };

  return (
    <Slider {...settings}>
      {slides.map((slide, index) => (
        <div key={index}>
          <SlideContent {...slide} />
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;
