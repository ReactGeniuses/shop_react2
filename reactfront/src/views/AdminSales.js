import {SalesOrderList} from '../Sales/SalesOrder.js';
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminSales = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const role = useSelector((state) => state.auth.value)
  if(!isLoggedIn || role !== 1){
      return <Navigate to="/Login" replace={true} />
  }
  return (
    <div className="home-page">
            <div className="home-page-header">
            </div>
            <SalesOrderList></SalesOrderList>
        </div>
  );
}

export default AdminSales;
