import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Button,
} from "@fluentui/react-components";
import { toast, ToastContainer } from "react-toastify";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import styled from "styled-components";
import {
  ListContainer,
  ListHeader,
  ListBody,
  ListRow,
  ListCell,
  AccordionContent,
  IconButton,
  DescriptionTitle,
} from "./AdminListCategorias.style";
import useAdminListCategorias from "./useAdminListCategorias";
import { eliminarCategoriaPorNombre } from "../../data/dataService";
import EditCategoryForm from "./EditCategoryForm";

const SecondaryButton = styled(Button)`
  background-color: #f5e9fc;
  color: #795af6;

  &:hover {
    background-color: #795af6;
    color: white;
  }
`;

const PrimaryButton = styled(Button)`
  background-color: #f5e9fc;
  color: #795af6;

  &:hover {
    background-color: #795af6;
    color: white;
  }
`;

const AdminListCategorias = () => {
  const [datos, setDatos] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [categoriaActual, setCategoriaActual] = useState(null);
  const [categoriaAEliminar, setCategoriaAEliminar] = useState(null);
  const { data, isLoading, error } = useAdminListCategorias();

  useEffect(() => {
    if (isLoading) {
      toast.info("Cargando...", { autoClose: false, toastId: "ToastyLoad" });
    } else {
      toast.dismiss("ToastyLoad");
    }
    if (error) {
      toast.error("Error al cargar la data");
    }
    if (data) {
      setDatos(data);
    }
  }, [isLoading, error, data]);

  const toggleEditModal = () => {
    setIsEditOpen(!isEditOpen);
  };

  const toggleDeleteModal = () => {
    setIsDeleteOpen(!isDeleteOpen);
  };

  const handleEditClick = (categoria) => {
    setCategoriaActual(categoria);
    toggleEditModal();
  };

  const handleRowClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleDeleteClick = (e, categoria) => {
    e.stopPropagation();
    setCategoriaAEliminar(categoria);
    toggleDeleteModal();
  };

  const confirmDelete = async () => {
    try {
      await eliminarCategoriaPorNombre(categoriaAEliminar.title);
      setDatos((prevData) =>
        prevData.filter((categoria) => categoria.title !== categoriaAEliminar.title)
      );
      toast.success("Categoría eliminada correctamente");
    } catch (error) {
      console.error("Error al eliminar la categoría:", error.message);
      toast.error("Error al eliminar la categoría.");
    } finally {
      toggleDeleteModal();
    }
  };

  const handleUpdateCategory = (categoriaActualizada) => {
    setDatos((prevDatos) => {
      return prevDatos.map((categoria) =>
        categoria.title === categoriaActualizada.title ? categoriaActualizada : categoria
      );
    });
    toggleEditModal();
    toast.success("Categoría actualizada correctamente");
  };

  return (
    <ListContainer>
      <ListHeader>
        <ListCell>ID</ListCell>
        <ListCell>Nombre</ListCell>
        <ListCell>Imagen</ListCell>
        <ListCell>Acciones</ListCell>
      </ListHeader>
      <ListBody>
        {datos &&
          datos.map((categoria, index) => (
            <React.Fragment key={categoria.id}>
              <ListRow onClick={() => handleRowClick(index)}>
                <ListCell>{categoria.id}</ListCell>
                <ListCell>{categoria.title}</ListCell>
                <ListCell>
                  <img
                    src={categoria.img_url}
                    alt="imagen"
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "path_to_fallback_image";
                    }}
                  />
                </ListCell>
                <ListCell>
                  <IconButton onClick={() => handleEditClick(categoria)}>
                    <AiFillEdit />
                  </IconButton>
                  <IconButton onClick={(e) => handleDeleteClick(e, categoria)}>
                    <AiFillDelete />
                  </IconButton>
                </ListCell>
              </ListRow>
              <AccordionContent isOpen={openIndex === index}>
                <DescriptionTitle>Descripción:</DescriptionTitle>
                <p>{categoria.description}</p>
              </AccordionContent>
            </React.Fragment>
          ))}
      </ListBody>
      <ToastContainer position="top-center" />

      <Dialog open={isEditOpen} onDismiss={toggleEditModal}>
        <DialogSurface style={{ width: '98%', padding: '15px 30px 15px 30px' }}>
          <DialogBody>
            <DialogTitle>Editar Categoría</DialogTitle>
            <DialogContent>
              <EditCategoryForm
                categoria={categoriaActual}
                onSave={handleUpdateCategory}
              />
            </DialogContent>
            <DialogActions>
              <SecondaryButton onClick={toggleEditModal}>Cerrar</SecondaryButton>
              <PrimaryButton form="edit-category-form" type="submit">
                Guardar Cambios
              </PrimaryButton>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>

      <Dialog open={isDeleteOpen} onDismiss={toggleDeleteModal}>
        <DialogSurface style={{ width: '98%', padding: '15px 30px 15px 30px' }}>
          <DialogBody>
            <DialogTitle>Confirmar Eliminación</DialogTitle>
            <DialogContent>
              <p>¿Estás seguro de que deseas eliminar la categoría <strong>{categoriaAEliminar?.title}</strong>?</p>
            </DialogContent>
            <DialogActions>
              <SecondaryButton onClick={toggleDeleteModal}>Cancelar</SecondaryButton>
              <PrimaryButton onClick={confirmDelete}>Eliminar</PrimaryButton>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </ListContainer>
  );
};

export default AdminListCategorias;



