import { useState, useEffect } from "react";
import { Rating as FluentRating } from "@fluentui/react-components";
import axios from "axios";
import RatingPopup from "../Rating/RatingPopup";
import { Button } from "@fluentui/react-components";
import { useStore } from "../../data/Store/store";
const Rating = ({ promedioValoracion, user, hasReservation }) => {
  const [averageRating, setAverageRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  const [userRating, setUserRating] = useState(null);
  const [showAverage, setShowAverage] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [comments, setComments] = useState([]);
   const cantidadValoracion = useStore((state) => state.cantidadValoracion);

  useEffect(() => {
    const getProductData = async () => {
      try {
        console.log(
          `Fetching data for promedioValoracion: ${promedioValoracion}`
        );
        const response = await axios.get(`http://localhost:8080/api/juegos`);
        const productData = response.data;

        if (productData.length > 0) {
          const product = productData[0];
          setAverageRating(product.promedioValoracion);
          setRatingCount(product.cantidad_valoraciones || 0);
          setComments(product.comentario || []);
        } else {
          console.warn("No products found with the given promedioValoracion");
        }
      } catch (error) {
        console.error("Error al obtener los datos del producto:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        }
      }
    };

    if (promedioValoracion) {
      getProductData();
    } else {
      console.error("ayudaaaaaaa");
    }
  }, [promedioValoracion]);

  const handleRatingChange = (event, newRating) => {
    setUserRating(newRating);
    setShowAverage(true);
    // Simulación de enviar la calificación del usuario a la API
    console.log(
      `Nuevo rating para el producto con promedioValoracion ${promedioValoracion}: ${newRating}`
    );
  };

  const handleViewComments = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div>
      <div>
        <FluentRating color="marigold" value={averageRating} readOnly />
        <p
          style={{
            fontFamily: "Verdana",
            fontSize: "16px",
            fontWeight: "400",
            color: "#333",
          }}
        >
          Puntuación: {averageRating} estrellas ({cantidadValoracion}{" "}
          calificaciones)
        </p>
      </div>
      {user && hasReservation && (
        <FluentRating
          step={0.5}
          defaultValue={0}
          onChange={handleRatingChange}
        />
      )}
      <Button
        onClick={handleViewComments}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          backgroundColor: "#795af6",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Ver comentarios
      </Button>
      {isPopupOpen && <RatingPopup onClose={handleClosePopup} />}
    </div>
  );
};

export default Rating;
