import React from "react";
import { Outlet, Navigate } from "react-router-dom";


function PublicRouterAdmin() {
    const userToken = localStorage.getItem('adminToken');
    const isAuthenticated = userToken ? true : false;

    return isAuthenticated ?<Navigate to="/admin/dashboard" />: <Outlet /> 
}

export default PublicRouterAdmin
