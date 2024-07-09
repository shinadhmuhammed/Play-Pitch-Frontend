import React from "react";
import { Outlet, Navigate } from "react-router-dom";

function PrivateRouterAdmin() {
    const userToken = localStorage.getItem('adminToken');
    const isAuthenticated = userToken ? true : false;
    return isAuthenticated ? <Outlet /> : <Navigate to="/admin/adminlogin" />;
}

export default PrivateRouterAdmin
