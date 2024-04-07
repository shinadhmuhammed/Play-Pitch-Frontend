import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ownerLogout } from "../../services/Redux/slice/ownerSlices";
import Navbar from "./Navbar";

function OwnerProfile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem('ownerToken');
        dispatch(ownerLogout());
        navigate('/owner/ownerlogin');
    };

    return (
        <>
        <Navbar/>
        <div className="mt-32 flex flex-col items-center">
            <div className="space-y-4">
                <NavLink to="/owner/venuerequest">Game Request</NavLink>
                <NavLink to="/owner/personal-details">Personal Details</NavLink>
                <NavLink to="/owner/change-password">Reset Password</NavLink>
                <NavLink to="/wallet">Wallet</NavLink>
            </div>
            <button
                onClick={handleLogout}
                className="mt-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-600 focus:outline-none"
            >
                Logout
            </button>
        </div>
        </>
    );
}


export default OwnerProfile;


// NavLink component to handle routing
const NavLink = ({ to, children }) => {
    return (
        <div className="flex justify-center">
            <a href={to} className="text-lg font-semibold hover:text-blue-500">
                {children}
            </a>
        </div>
    );
};
