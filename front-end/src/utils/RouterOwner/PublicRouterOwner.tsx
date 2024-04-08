import { Outlet, Navigate } from "react-router-dom";


function PublicRouterOwner() {
    const userToken = localStorage.getItem('ownerToken');
    const isAuthenticated = userToken ? true : false;

    return isAuthenticated ?<Navigate to="/owner/ownerhome" />: <Outlet /> 
}

export default PublicRouterOwner
