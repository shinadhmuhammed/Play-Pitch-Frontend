import { Route, Routes } from "react-router-dom";
import LandinPage from "../Pages/Users/LandinPage";
import Signup from "../Pages/Users/Signup";
import Login from "../Pages/Users/Login";
import Home from "../Pages/Users/Home";
import ForgotPassword from "../Pages/Users/ForgotPassword";



function UserRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandinPage />}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
      </Routes>
    </div>
  );
}

export default UserRoutes;
