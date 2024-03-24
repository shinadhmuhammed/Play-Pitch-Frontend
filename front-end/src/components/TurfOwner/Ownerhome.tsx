import { useDispatch } from "react-redux";
import { ownerLogin} from "../../services/Redux/slice/ownerSlices";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Navbar";

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

 

    return (
        <div>
            <Navbar/>

            <div className="bg-green-500 p-4 mt-20 rounded-lg">
                <p className="text-center text-gray-900 mb-12 font-bold">Please add your venue to get partnered with us</p>
                <a href="/addvenue" className="w-full bg-black hover:bg-green-400 text-white font-bold py-2 px-4 rounded flex justify-center">Add Your Venue</a>
            </div>
        </div>
    );
}

export default Ownerhome;
