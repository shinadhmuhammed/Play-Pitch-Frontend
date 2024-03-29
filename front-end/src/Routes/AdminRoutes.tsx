import { Route, Routes } from "react-router-dom";
import Adminlogin from "../Pages/Admin/Adminlogin";
import Admindashboard from "../Pages/Admin/Admindashboard";
import Users from "../Pages/Admin/Users";
import RequestVenue from "../Pages/Admin/RequestVenue";

function AdminRoutes() {
  return (
    <div>
        <Routes>
         <Route path="/adminlogin" element={<Adminlogin/>}></Route>
        <Route path="/dashboard" element={<Admindashboard/>}></Route>
        <Route path="/users" element={<Users/>}></Route>
        <Route path="/venue-request" element={<RequestVenue/>}></Route>
        </Routes>
    </div>
  )
}

export default AdminRoutes
