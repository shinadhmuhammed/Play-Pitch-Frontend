import { Route, Routes } from "react-router-dom";
import LandinPage from "../Pages/Users/LandinPage";
import Signup from "../Pages/Users/Signup";
import Login from "../Pages/Users/Login";
import Home from "../Pages/Users/Home";
import ForgotPassword from "../Pages/Users/ForgotPassword";
import TurfDetail from "../Pages/Users/TurfDetail";
import Booking from "../Pages/Users/Booking";
import VerificationUser from "../Pages/Users/VerificationUser";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutUser from "../Pages/Users/CheckoutUser";
import StripeError from "../components/User/StripeError";
import BookingDetails from "../components/User/BookingDetails";
import PersonalDetails from "../Pages/Users/PersonalDetails";
import PasswordChange from "../Pages/Users/PasswordChange";





const stripePromise = loadStripe(
  "pk_test_51P0Z54SCjCzqo5nbFuFb45Fe9C28gTVotIMvr0lOp9ByGvHYTmj1mhPzciKl6zhk7U1ZKk4NrmES8vtn0wlP5BAq00X3d8wQuZ"
);

function UserRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandinPage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/turf/:id" element={<TurfDetail />}></Route>
        <Route
          path="checkout"
          element={
            <Elements stripe={stripePromise}>
              <CheckoutUser />
            </Elements>
          }
        ></Route>
        <Route path="/booking" element={<Booking />}></Route>
        <Route
          path="/booking-verification"
          element={<VerificationUser />}
        ></Route>
        <Route path="/booking-cancel" element={<StripeError />}></Route>
        <Route path="/booking/:id" element={<BookingDetails />} />
        <Route path="/details" element={<PersonalDetails/>}></Route>
        <Route path="/password-change" element={<PasswordChange/>}></Route>
      </Routes>
    </div>
  );
}

export default UserRoutes;
