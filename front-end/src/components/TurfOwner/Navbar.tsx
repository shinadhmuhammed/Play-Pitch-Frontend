
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("ownerToken");
    if (!token) {
      navigate("/owner/ownerlogin");
    }
  }, [navigate]);


  return (
    <div>
      <nav className=" p-4">
        <div className="container mx-auto flex justify-between shadow-md p-9">
          <div className="flex items-center space-x-4 ">
            <a href="#" className="text-black font-bold">
              Dashboard
            </a>
            <a href="/owner/addvenue" className="text-black font-bold">
              Add Turf
            </a>
            <a href="/owner/venue" className="text-black font-bold">
              View Turf
            </a>
          </div>
          <div>
            <a href="/owner/ownerprofile">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
