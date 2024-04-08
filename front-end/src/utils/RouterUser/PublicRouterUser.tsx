import { Outlet, Navigate } from "react-router-dom";



function PublicRouterUser() {


    const userToken = localStorage.getItem('userToken');
    const isAuthenticated = userToken ? true : false;

    return isAuthenticated ?<Navigate to="/home" />: <Outlet /> 
}

export default PublicRouterUser
