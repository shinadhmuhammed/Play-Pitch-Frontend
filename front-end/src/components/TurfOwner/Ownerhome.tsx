import { useDispatch } from "react-redux";
import { ownerLogin, ownerLogout } from "../../services/Redux/slice/ownerSlices";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Ownerhome() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const ownerData = JSON.parse(atob(token.split('.')[1]));
            dispatch(ownerLogin(ownerData));
        } else {
            navigate('/ownerlogin');
        }
    }, [dispatch, navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(ownerLogout());
        navigate('/ownerlogin');
    };

    return (
        <div>
            <nav className="bg-gray-800 p-4">
                <div className="container mx-auto flex justify-between">
                    <div className="flex items-center space-x-4">
                        <a href="#" className="text-white font-bold">Dashboard</a>
                        <a href="#" className="text-white font-bold">Game Requests</a>
                        <a href="/addvenue" className="text-white font-bold">Add Turf</a>
                        <a href="/venue" className="text-white font-bold">Edit Turf</a>
                    </div>
                    <div>
                        <a href="#" className="text-white font-bold">Your Profile</a>
                        <button onClick={handleLogout} className="ml-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            <div className="bg-green-500 p-4 mt-20 rounded-lg">
                <p className="text-center text-gray-900 mb-12 font-bold">Please add your venue to get partnered with us</p>
                <a href="/addvenue" className="w-full bg-black hover:bg-green-400 text-white font-bold py-2 px-4 rounded flex justify-center">Add Your Venue</a>
            </div>
        </div>
    );
}

export default Ownerhome;
