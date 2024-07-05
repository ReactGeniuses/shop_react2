import { Routes, Route,useLocation  } from "react-router-dom";
import HomePageClient from './views/HomePageClient';
import AdminProduct from "./views/AdminProduct";
import AdminCategory from "./views/AdminCategory";
import AdminCuenta from "./views/AdminCuenta";
import AdminSales from "./views/AdminSales";
import VendedorOrders from "./views/VendedorOrders";
import LoginPage from "./views/Login";
import './App.css';
import { useSelector } from 'react-redux';
import NavBarAdmin from "./Menu/NavBarAdmin";
import NavBarVentas from "./Menu/NavBarVendedor";
import NavBarCliente from "./Menu/NavBarCliente";
import CompraProceso from './views/ProcesoCompra';
import WishlistPage from "./views/WishlistPage";
import SingUpPage from "./views/SingUp";
import OrdenesUsuario from "./views/OrdenesUsuario"
function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.value);
  const location = useLocation();
  // Seleccionar la barra de navegación según el rol del usuario
  const renderNavBar = () => {
    if (location.pathname === '/Login') {
      return null;
    }else if(!isLoggedIn){
      return <NavBarCliente />;
    }
    switch (role) {
      case 1:
        return <NavBarAdmin />;
      case 2:
        return <NavBarVentas />;
      case 3:
        return <NavBarCliente />;
      default:
        return null;
    }
  };

  return (
    <div className="app">
        {renderNavBar()}
        <Routes>
          <Route path='/' element={<HomePageClient />} />
          <Route path='/Login' element={<LoginPage />} />
          <Route path='/admin' element={<AdminProduct />} />
          <Route path='/admin/category' element={<AdminCategory />} />
          <Route path='/admin/sales' element={<AdminSales />} />
          <Route path='/vendedor/order' element={<VendedorOrders />} />
          <Route path='/compra' element={<CompraProceso />} />
          <Route path='/cuenta' element={<AdminCuenta />} />
          <Route path='/usuario/deseo' element={<WishlistPage />} />
          <Route path='/Signup' element={<SingUpPage/>} />
          <Route path='/orden' element={<OrdenesUsuario/>} />
        </Routes>
    </div>
  );
}

export default App;
