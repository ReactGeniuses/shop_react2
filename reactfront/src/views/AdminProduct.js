import {ProductSearchBar} from '../Product/ProductSearchBar.js';
import {AdminProductList} from '../Product/ProductAdmin.js';
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const AdminProduct = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const role = useSelector((state) => state.auth.value)
  if(!isLoggedIn || role !== 1){
      return <Navigate to="/Login" replace={true} />
  }
  return (
    <div className="home-page">
            <div className="home-page-header">
              
            </div>
            <ProductSearchBar></ProductSearchBar>
            <AdminProductList></AdminProductList>
        </div>
  );
}

export default AdminProduct;
