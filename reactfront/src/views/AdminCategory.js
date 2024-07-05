import {AdminCategoryList} from '../Category/CategoryAdmin.js';
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const AdminCategory = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const role = useSelector((state) => state.auth.value)
  if(!isLoggedIn || role !== 1){
      return <Navigate to="/Login" replace={true} />
  }
  return (
    <div className="home-page">
            <div className="home-page-header">
            </div>
            <AdminCategoryList></AdminCategoryList>
        </div>
  );
}

export default AdminCategory;
