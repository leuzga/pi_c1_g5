import { useState, useEffect } from 'react';
import styles from "./RandomProductsList.module.css";
import PaginationProductCard from "./PaginationProductCard";


const RandomProductsList = () => {
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    // Lógica para obtener productos aleatorios (cuando tengas la API)
    // Por ahora, usaremos datos de ejemplo
    const exampleProducts = [
      { id: 1, name: "Producto 1",  image: "https://via.placeholder.com/400" },
      { id: 2, name: "Producto 2",  image: "https://via.placeholder.com/400" },
      { id: 3, name: "Producto 3",  image: "https://via.placeholder.com/400" },
      { id: 4, name: "Producto 4",  image: "https://via.placeholder.com/400" },
      { id: 5, name: "Producto 5",  image: "https://via.placeholder.com/400" },
      { id: 6, name: "Producto 6",  image: "https://via.placeholder.com/400" },
      { id: 7, name: "Producto 7",  image: "https://via.placeholder.com/400" },
      { id: 8, name: "Producto 8",  image: "https://via.placeholder.com/400" },
      { id: 9, name: "Producto 9",  image: "https://via.placeholder.com/400" },
      { id: 10, name: "Producto 10",  image: "https://via.placeholder.com/400" },
      { id: 11, name: "Producto 11",  image: "https://via.placeholder.com/400" },
      // Más productos...
    ];

    // Obtener 10 productos aleatorios sin repetir
    const getRandomProducts = (products, count) => {
      const shuffledProducts = products.sort(() => 0.5 - Math.random());
      return shuffledProducts.slice(0, count);
    };

    setRandomProducts(getRandomProducts(exampleProducts, 10));
  }, []);

  return (
    <div className={styles.randomProductsList}>
    <h2>Productos Aleatorios</h2>
   
    <PaginationProductCard products={randomProducts} itemsPerPage={6} />
  </div>
);
};

export default RandomProductsList;