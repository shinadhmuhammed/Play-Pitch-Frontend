import { Route, Routes } from "react-router-dom";
import Ownersignup from "../Pages/TurfOwner/Ownersignup";
import Ownerotp from "../components/TurfOwner/Ownerotp";
import OwnerForgot from "../Pages/TurfOwner/OwnerForgot";
import OwnerLogin from "../Pages/TurfOwner/OwnerLogin";
import Ownerhome from "../components/TurfOwner/Ownerhome";
import Venueadd from "../Pages/TurfOwner/Venueadd";
import TurfPage from "../Pages/TurfOwner/TurfPage";
import EditPage from "../Pages/TurfOwner/EditPage";
import Verification from "../Pages/TurfOwner/Verification";
import Request from "../Pages/TurfOwner/Request";


function OwnerRoutes() {
  return (
    <div>
        <Routes>
        <Route path="/ownersignup" element={<Ownersignup/>}></Route>
        <Route path="/ownerotp" element={<Ownerotp/>}></Route>
        <Route path="/forgotpassword" element={<OwnerForgot/>}></Route>
        <Route path="/ownerlogin" element={<OwnerLogin/>}></Route>
        <Route path="/ownerhome" element={<Ownerhome/>}></Route>
        <Route path="/addvenue" element={<Venueadd/>}></Route>
        <Route path="/venue" element={<TurfPage/>}></Route>
        <Route path="/editturf/:turfId" element={<EditPage />} />
        <Route path="/editturf/:turfId" element={<EditPage />} />
        <Route path="/verification-pending" element={<Verification />} />
        <Route path="/editturf/:turfId" element={<EditPage />} />
        <Route path="/venuerequest" element={<Request />} />
        </Routes>
    </div>
  )
}

export default OwnerRoutes
