import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserRoutes from "./Routes/UserRoutes";
import OwnerRoutes from "./Routes/OwnerRoutes";
import AdminRoutes from "./Routes/AdminRoutes";
import React from "react";

function App() {
  return (
    <>
      <Router basename="/">
        <Routes>
          <Route path="/*" element={<UserRoutes />}></Route>
          <Route path="/owner/*" element={<OwnerRoutes />}></Route>
          <Route path="/admin/*" element={<AdminRoutes />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
