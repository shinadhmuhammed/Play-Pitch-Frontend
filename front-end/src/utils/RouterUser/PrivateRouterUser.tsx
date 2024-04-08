import { Outlet, Navigate } from "react-router-dom";

function PrivateRouterUser() {
    const userToken = localStorage.getItem('userToken');
    const isAuthenticated = userToken ? true : false;
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRouterUser;
