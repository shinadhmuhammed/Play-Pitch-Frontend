import { Route, Routes } from "react-router-dom";
import Adminlogin from "../Pages/Admin/Adminlogin";
import Admindashboard from "../Pages/Admin/Admindashboard";
import Users from "../Pages/Admin/Users";
import RequestVenue from "../Pages/Admin/RequestVenue";
import VenueDetails from "../Pages/Admin/VenueDetails";
import PrivateRouterAdmin from "../utils/RouterAdmin/PrivateRouterAdmin";
import PublicRouterAdmin from "../utils/RouterAdmin/PublicRouterAdmin";

function AdminRoutes() {
  return (
    <div>
        <Routes>
          <Route element={<PublicRouterAdmin/>}>
         <Route path="/adminlogin" element={<Adminlogin/>}></Route>
         </Route>

         <Route element={<PrivateRouterAdmin/>}>
        <Route path="/dashboard" element={<Admindashboard/>}></Route>
        <Route path="/users" element={<Users/>}></Route>
        <Route path="/venue-request" element={<RequestVenue/>}></Route>
        <Route path="/venue-details/:turfId" element={<VenueDetails/>}></Route>
        </Route>
        </Routes>
    </div>
  )
}

export default AdminRoutes
