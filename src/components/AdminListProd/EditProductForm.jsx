import { useState, useEffect } from "react";
import styles from "./EditProductForm.module.css";
import { actualizarProducto } from "../../data/juegos";
import { LeerCategorias } from "../../data/dataService";
import {
  crearCaracteristica,
  obtenerCaracteristicas,
} from "../../data/caracteristicas";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
} from "@fluentui/react-components";


import styled from "styled-components";


const SecondaryButton = styled(Button)`
  background-color: #f5e9fc;
  color: #795af6;

  &:hover {
    background-color: #795af6;
    color: white;
  }

`;

export const InlineInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  margin-bottom: 10px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #f5e9fc;
  }
`;

export const InlineSelect = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  margin-bottom: 10px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #f5e9fc;
  }
`;

export const InlineTextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  margin-bottom: 10px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #f5e9fc;
  }
`;

const EditProductForm = ({ producto, onSave }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [largo, setLargo] = useState("");
  const [ancho, setAncho] = useState("");
  const [altura, setAltura] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [valorArriendo, setValorArriendo] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [img_url, setImgUrl] = useState("");
  const [categoria, setCategoria] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [caracteristicas, setCaracteristicas] = useState([]);
  const [selectedCaracteristicas, setSelectedCaracteristicas] = useState([]);
  const [error, setError] = useState("");
  const [nuevaCaracteristica, setNuevaCaracteristica] = useState("");

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const categoriasData = await LeerCategorias();
        setCategorias(categoriasData);
      } catch (error) {
        console.error("Error al leer las categorías", error);
      }
    };
    const fetchCaracteristicas = async () => {
      try {
        const caracteristicasData = await obtenerCaracteristicas();
        setCaracteristicas(caracteristicasData);
      } catch (error) {
        console.error("Error al obtener características", error);
      }
    };

    fetchCategorias();
    fetchCaracteristicas();
  }, []);

  useEffect(() => {
    if (producto) {
      setNombre(producto.nombre);
      setDescripcion(producto.descripcion);
      setLargo(producto.largo);
      setAncho(producto.ancho);
      setAltura(producto.altura);
      setCapacidad(producto.capacidad);
      setValorArriendo(producto.valorArriendo);
      setCantidad(producto.cantidad);
      setImgUrl(producto.img_url);
      setCategoria(producto.tipo.id.toString());
      setSelectedCaracteristicas(producto.caracteristicas.map((car) => car.id));
    }
  }, [producto]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (
      !nombre ||
      !descripcion ||
      !largo ||
      !ancho ||
      !altura ||
      !capacidad ||
      !valorArriendo ||
      !cantidad ||
      !img_url ||
      !categoria ||
      selectedCaracteristicas.length === 0
    ) {
      setError("Por favor complete todos los campos.");
      return;
    }

    const categoriaSeleccionada = categorias.find(
      (cat) => cat.id.toString() === categoria
    );
    if (!categoriaSeleccionada) {
      setError("Categoría seleccionada no es válida.");
      return;
    }

    const nuevoProducto = {
      id: producto.id,
      nombre,
      descripcion,
      largo: parseFloat(largo),
      ancho: parseFloat(ancho),
      altura: parseFloat(altura),
      capacidad: parseInt(capacidad),
      valorArriendo: parseInt(valorArriendo),
      cantidad: parseInt(cantidad),
      img_url,
      tipo: {
        id: categoriaSeleccionada.id,
        title: categoriaSeleccionada.title,
        description: categoriaSeleccionada.description,
        img_url: categoriaSeleccionada.img_url,
      },
      caracteristicas: selectedCaracteristicas.map((id) => {
        const caracteristica = caracteristicas.find((car) => car.id === id);
        return {
          id: caracteristica.id,
          nombre: caracteristica.nombre,
        };
      }),
    };

    try {
      await actualizarProducto(nuevoProducto);
      onSave(nuevoProducto);
    } catch (error) {
      setError(
        error.message || "Error al actualizar el producto. Inténtelo de nuevo."
      );
      console.error("Error al actualizar el producto:", error);
    }
  };

  const handleChangeNumericInput = (setter, value) => {
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue) && numericValue >= 0) {
      setter(numericValue);
    }
  };

  const handleCrearCaracteristica = async () => {
    if (!nuevaCaracteristica) {
      setError("Ingrese un nombre para la nueva característica.");
      return;
    }

    try {
      const caracteristicaCreada = await crearCaracteristica(
        nuevaCaracteristica
      );
      setCaracteristicas([...caracteristicas, caracteristicaCreada]);
      setNuevaCaracteristica("");
    } catch (error) {
      setError("Error al crear la característica. Inténtelo de nuevo.");
      console.error("Error al crear la característica:", error);
    }
  };

  

  return (
    <div className={styles.containerPrincipal}>
      <div className={styles.formContainer}>
        {error && <p className={styles.error}>{error}</p>}
        <form
          className={styles.form}
          onSubmit={handleFormSubmit}
          id="edit-product-form"
        >
          <div className={styles.formSection}>
            <div className={styles.generalInfo}>
              <div className={styles.inputContainer}>
                <label htmlFor="nombre" className={styles.label}>
                  Nombre:
                </label>
                <InlineInput
                  type="text"
                  id="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className={`${styles.input} ${styles.textInput}`}
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="descripcion" className={styles.label}>
                  Descripción:
                </label>
                <InlineTextArea
                  id="descripcion"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  className={`${styles.input} ${styles.textAreaInput}`}
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="largo" className={styles.label}>
                  Largo (metros):
                </label>
                <InlineInput
                  type="number"
                  id="largo"
                  value={largo}
                  onChange={(e) =>
                    handleChangeNumericInput(setLargo, e.target.value)
                  }
                  className={`${styles.input} ${styles.numberInput}`}
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="ancho" className={styles.label}>
                  Ancho (metros):
                </label>
                <InlineInput
                  type="number"
                  id="ancho"
                  value={ancho}
                  onChange={(e) =>
                    handleChangeNumericInput(setAncho, e.target.value)
                  }
                  className={`${styles.input} ${styles.numberInput}`}
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="altura" className={styles.label}>
                  Altura (metros):
                </label>
                <InlineInput
                  type="number"
                  id="altura"
                  value={altura}
                  onChange={(e) =>
                    handleChangeNumericInput(setAltura, e.target.value)
                  }
                  className={`${styles.input} ${styles.numberInput}`}
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="categoria" className={styles.label}>
                  Categoría:
                </label>
                <InlineSelect
                  id="categoria"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className={`${styles.input} ${styles.selectInput}`}
                  required
                >
                  <option value="">Seleccione una categoría</option>
                  {categorias.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.title}
                    </option>
                  ))}
                </InlineSelect>
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="capacidad" className={styles.label}>
                  Capacidad:
                </label>
                <InlineInput
                  type="number"
                  id="capacidad"
                  value={capacidad}
                  onChange={(e) =>
                    handleChangeNumericInput(setCapacidad, e.target.value)
                  }
                  className={`${styles.input} ${styles.numberInput}`}
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="valorArriendo" className={styles.label}>
                  Valor Arriendo:
                </label>
                <InlineInput
                  type="number"
                  id="valorArriendo"
                  value={valorArriendo}
                  onChange={(e) =>
                    handleChangeNumericInput(setValorArriendo, e.target.value)
                  }
                  className={`${styles.input} ${styles.numberInput}`}
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="cantidad" className={styles.label}>
                  Cantidad:
                </label>
                <InlineInput
                  type="number"
                  id="cantidad"
                  value={cantidad}
                  onChange={(e) =>
                    handleChangeNumericInput(setCantidad, e.target.value)
                  }
                  className={`${styles.input} ${styles.numberInput}`}
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="img_url" className={styles.label}>
                  URL de la Imagen:
                </label>
                <InlineInput
                  type="text"
                  id="img_url"
                  value={img_url}
                  onChange={(e) => setImgUrl(e.target.value)}
                  className={`${styles.input} ${styles.textInput}`}
                  required
                />
                {img_url && (
                  <img
                    src={img_url}
                    alt="Imagen proporcionada"
                    className={styles.imagePreview}
                  />
                )}
              </div>
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="nuevaCaracteristica" className={styles.label}>
                Nueva Característica:
              </label>
              <InlineInput
                type="text"
                id="nuevaCaracteristica"
                value={nuevaCaracteristica}
                onChange={(e) => setNuevaCaracteristica(e.target.value)}
                className={`${styles.input} ${styles.textInput}`}
              />
              <SecondaryButton
                type="button"
                onClick={handleCrearCaracteristica}
                className={styles.addButton}
              >
                Agregar
              </SecondaryButton>
            </div>
          </div>
          

          <div className={styles.caracteristicasList}>
            {caracteristicas.map((caracteristica) => (
              <div
                key={caracteristica.id}
                className={styles.caracteristicaItem}
              >              
                <div className={styles.checkboxContainer}>
                  <input
                    type="checkbox"
                    id={`caracteristica-${caracteristica.id}`}
                    checked={selectedCaracteristicas.includes(
                      caracteristica.id
                    )}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedCaracteristicas([
                          ...selectedCaracteristicas,
                          caracteristica.id,
                        ]);
                      } else {
                        setSelectedCaracteristicas(
                          selectedCaracteristicas.filter(
                            (id) => id !== caracteristica.id
                          )
                        );
                      }
                    }}
                  />
                </div>
                <div className={styles.labelContainer}>
                  <label htmlFor={`caracteristica-${caracteristica.id}`}>
                    {caracteristica.nombre}
                  </label>
                </div>
               
              </div>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductForm;
