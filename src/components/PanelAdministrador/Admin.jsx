import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import styles from './Admin.module.css';

const Admin = () => {
  const [editingProduct, setEditingProduct] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showInventory, setShowInventory] = useState(false); // Nuevo estado

  // Nueva función para listar inventario
  const handleListInventory = () => {
    setShowInventory(!showInventory);
  };

  const checkMobileDevice = () => {
    const isMobileDevice = window.matchMedia("(max-width: 768px)").matches;
    setIsMobile(isMobileDevice);
  };

  useEffect(() => {
    checkMobileDevice();
    window.addEventListener("resize", checkMobileDevice);
    return () => window.removeEventListener("resize", checkMobileDevice);
  }, []);

  if (isMobile) {
    return (
      <div className={styles.panel}>
        <h2>Panel de Administración</h2>
        <p>No disponible en dispositivos móviles.</p>
      </div>
    );
  }

  return (
    <div className={styles.panel}>
      <h2>Panel de Administración</h2>
      
      <div className={styles.act}>
        <div className="newProduct">
          <Link to="/RegistrarProducto">
            <Button type="submit">Agregar Juego</Button>
          </Link>
        </div>
        <div className="ListProduct">
          <Link to="/inventario">
            <Button type="submit" onClick={handleListInventory}>Listar inventario</Button> {/* Nuevo botón */}
          </Link>
        </div>
        <div>
          <Link to="">
            <Button type="submit" >Análisis y reportes</Button> {/* Nuevo botón */}
          </Link>
        </div>
        <div>
          <Link to="">
            <Button type="submit">Gestión de promociones</Button> {/* Nuevo botón */}
          </Link>
        </div>
        <div>
          <Link to="">
            <Button type="submit">Reservas</Button> {/* Nuevo botón */}
          </Link>
        </div>
        <div>
          <Link to="">
            <Button type="submit">Clientes</Button> {/* Nuevo botón */}
          </Link>
        </div>
      </div>

      {/* Mostrar inventario si showInventory es true */}
      {showInventory && (
        <div className="admin-inventory-container">
          <h3></h3>
          
        </div>
      )}

   
    </div>
  );
};

export default Admin;