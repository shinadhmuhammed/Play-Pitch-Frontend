import React from "react";
import { Outlet, Navigate } from "react-router-dom";


function PrivateRouterOwner() {
    const userToken = localStorage.getItem('ownerToken');
    const isAuthenticated = userToken ? true : false;
    return isAuthenticated ? <Outlet /> : <Navigate to="/owner/ownerlogin" />;
}

export default PrivateRouterOwner
