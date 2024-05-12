/* import { useState, useEffect } from 'react';
import styles from "./FeaturedProducts.module.css";
import ProductCard from '../Card/ProductCard';

const FeaturedProducts = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const numCardsToShow = 3; // Número de tarjetas para mostrar a la vez

  useEffect(() => {
    if (products.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [products]);

  // Generar un array de índices para mostrar
  const cardIndices = Array.from(Array(numCardsToShow).keys()).map(i => (currentIndex + i) % products.length);

  return (
    <div className={styles.featuredProducts}>
      <div className={styles.productGrid}>
        {cardIndices.map((index) => (
          <div key={index} className={styles.active}>
            <ProductCard product={products[index]} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts; */



