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
import OwnerProfile from "../components/TurfOwner/OwnerProfile";
import OwnerPersonalDetails from "../Pages/TurfOwner/OwnerPersonalDetails";
import OwnerPasswordChange from "../Pages/TurfOwner/OwnerPasswordChange";
import PublicRouterOwner from "../utils/RouterOwner/PublicRouterOwner";
import PrivateRouterOwner from "../utils/RouterOwner/PrivateRouterOwner";
import WalletPage from "../Pages/TurfOwner/WalletPage";


function OwnerRoutes() {
  return (
    <div>
        <Routes>
          <Route element={<PublicRouterOwner/>}>
        <Route path="/ownersignup" element={<Ownersignup/>}></Route>
        <Route path="/ownerotp" element={<Ownerotp/>}></Route>
        <Route path="/forgotpassword" element={<OwnerForgot/>}></Route>
        <Route path="/ownerlogin" element={<OwnerLogin/>}></Route>
        </Route>

        <Route element={<PrivateRouterOwner/>}>
        <Route path="/ownerhome" element={<Ownerhome/>}></Route>
        <Route path="/addvenue" element={<Venueadd/>}></Route>
        <Route path="/venue" element={<TurfPage/>}></Route>
        <Route path="/editturf/:turfId" element={<EditPage />} />
        <Route path="/editturf/:turfId" element={<EditPage />} />
        <Route path="/verification-pending" element={<Verification />} />
        <Route path="/editturf/:turfId" element={<EditPage />} />
        <Route path="/venuerequest" element={<Request />} />
        <Route path="/ownerprofile" element={<OwnerProfile/>}/>
        <Route path="/personal-details" element={<OwnerPersonalDetails/>}/>
        <Route path="/change-password" element={<OwnerPasswordChange/>}/>
        <Route path="/wallet" element={<WalletPage/>}/>
        </Route>
        </Routes>
    </div>
  )
}

export default OwnerRoutes
