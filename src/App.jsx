import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RandomProductsList from './components/Card/RandomProductsList';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar.jsx';
import Admin from './components/PanelAdministrador/Admin.jsx'
import DetailProduct from './components/DetailProduct/DetailProduct.jsx';
import FeaturedProducts from './components/ProductsFav/FeaturedProducts.jsx';
import LogoFestivall from '../public/FestivallSVG.svg';
import ProductCard from './components/Card/ProductCard.jsx';
import CategorySection from './components/Categorias/CategorySection.jsx';
<<<<<<< Updated upstream
import { MdAdminPanelSettings } from 'react-icons/md'; // Agregar la importación aquí

import RegistrarProducto from './components/PanelAdministrador/RegistrarProducto.jsx';

=======
// import AdminListProd from './components/AdminListProd/AdminListProd.jsx'; // esta importacion iria en el panel de administracion
>>>>>>> Stashed changes
const menuItems = ['Nosotros', 'Servicios', 'Contacto', 'Galería'];

/* import RegistrarProducto from "./components/PanelAdministrador/RegistrarProducto.jsx"; */
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar menuItems={menuItems} logo={LogoFestivall} />
        <CategorySection />
        <Routes>
          <Route
            path='/'
            element={
              <div>
                <RandomProductsList />
                <FeaturedProducts />
              </div>
            }
          />
          <Route path='/detalle/:id' element={<DetailProduct />} />
          <Route path='/product/:id' element={<ProductCard />} />
          <Route path='/RegistrarProducto' element={<RegistrarProducto />} />
          <Route path='/admin' element={<Admin />} />
        </Routes>
        <RegistrarProducto/>
        <Footer />
      </BrowserRouter>
      {/* <AdminListProd /> // este componente es el que iria en el panel de
      Administracion */}
    </>
  );
};

export default App;

