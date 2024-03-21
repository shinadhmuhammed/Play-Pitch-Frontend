import { Route, Routes } from "react-router-dom";
import LandinPage from "../Pages/Users/LandinPage";
import Signup from "../Pages/Users/Signup";
import Login from "../Pages/Users/Login";
import Home from "../Pages/Users/Home";
import ForgotPassword from "../Pages/Users/ForgotPassword";
import Ownersignup from "../Pages/TurfOwner/Ownersignup";
import Ownerotp from "../components/TurfOwner/Ownerotp";
import OwnerLogin from "../Pages/TurfOwner/OwnerLogin";
import Ownerhome from "../components/TurfOwner/Ownerhome";
import Venueadd from "../Pages/TurfOwner/Venueadd";
import Adminlogin from "../Pages/Admin/Adminlogin";
import Admindashboard from "../Pages/Admin/Admindashboard";
import Users from "../Pages/Admin/Users";
import OwnerForgot from "../Pages/TurfOwner/OwnerForgot";
import TurfPage from "../Pages/TurfOwner/TurfPage";
import EditPage from "../Pages/TurfOwner/EditPage";



function UserRoutes() {
  return (
    <div>
      <Routes>
        {/* Users */}
        <Route path="/" element={<LandinPage />}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/forgot-password" element={<ForgotPassword/>}></Route>


        {/* owners */}

        <Route path="/ownersignup" element={<Ownersignup/>}></Route>
        <Route path="/ownerotp" element={<Ownerotp/>}></Route>
        <Route path="/forgotpassword" element={<OwnerForgot/>}></Route>
        <Route path="/ownerlogin" element={<OwnerLogin/>}></Route>
        <Route path="/ownerhome" element={<Ownerhome/>}></Route>
        <Route path="/addvenue" element={<Venueadd/>}></Route>
        <Route path="/venue" element={<TurfPage/>}></Route>
        <Route path="/editturf/:turfId" element={<EditPage />} />


        
        {/* admin */}

        <Route path="/adminlogin" element={<Adminlogin/>}></Route>
        <Route path="/dashboard" element={<Admindashboard/>}></Route>
        <Route path="/users" element={<Users/>}></Route>
      </Routes>
    </div>
  );
}

export default UserRoutes;
