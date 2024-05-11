
import { Link } from 'react-router-dom';
import styles from "./ProductCard.module.css";

const ProductCard = ({ product }) => {
  return (
    <div className={styles.productCard}>
      <div className={styles.productImage}>
        <img src={product.image} alt={product.name} />
      </div>
      <div className={styles.productDetails}>
        <h3>{product.name}</h3>
        <Link to={`/detalle/${product.id}`} className={styles.detailButton}>Ver Detalle</Link>
      </div>
    </div>
  );
};

export default ProductCard;

