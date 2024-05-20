import { Link } from "react-router-dom";
import foot from '../../assets/images/new football.jpg';
import ball from '../../assets/images/footballl.jpeg';
import UserFooter from "../../components/User/UserFooter";

function LandingPage() {
  return (
    <div className="bg-gray-200 text-white min-h-screen">
      <div className="relative">
        <img
          src={foot}
          className="w-full mt-0 contrast-50"
          alt="hello"
          style={{ height: "calc(100vh - 10px)" }}
        />
      
        <div className="absolute top-0 left-0 right-0 flex justify-end pt-4 mr-6">
          <a
            className="bg-green-500 text-white border border-white px-4 py-2 rounded mr-2 shadow-md"
            href="/login"
          >
            Login
          </a>
          <a
            className="bg-white text-black px-4 py-2 rounded shadow-md"
            href="/signup"
          >
            Register
          </a>
        </div>
        <div className="absolute top-1/2 left-10 transform -translate-y-1/2 text-white">
          <h1 className="font-extrabold mb-10 font-serif">
            <span style={{ fontSize: "2rem" }}>Hey players,</span><br />
            <span style={{ fontSize: "4rem" }}>Let's football</span>
          </h1>
          <Link to="/login">
            <button className="bg-green-500 hover:bg-green-600 text-white mb-10 px-4 py-4 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
              Login Now
            </button>
          </Link>
        </div>
      </div>

      <div className="relative">
        <img
          src={ball}
          className="w-full mt-0 contrast-100"
          alt="hello"
          style={{ height: "calc(100vh - 10px)" }}
        />
        <div className="absolute top-1/2 right-10 transform -translate-y-1/2 text-black">
          <h1 className="font-extrabold mb-10 font-serif text-right">
            <span style={{ fontSize: "1rem" }}>Find the nearest venue, book your slot, and host the game</span><br />
            <span style={{ fontSize: "2rem" }}>Book Your Venues</span>
          </h1>
          <Link to="/homePage">
            <button className="bg-green-500 hover:bg-green-600 text-white mb-10 ml-64 px-4 py-4 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
              Book Now
            </button>
          </Link>
        </div>
      </div>

      <div className="relative">
        <img
          src={foot}
          className="w-full mt-0 contrast-50"
          alt="hello"
          style={{ height: "calc(100vh - 10px)" }}
        />
        <div className="absolute top-1/2  transform -translate-y-1/2 text-white ml-5">
          <h1 className="font-extrabold mb-10 font-serif ">
            <span style={{ fontSize: "2rem" }}>join other hosted game meet players </span><br />
            <span style={{ fontSize: "3rem" }}>play with other players</span>
          </h1>
          <Link to="/games">
            <button className="bg-green-500 hover:bg-green-600 text-white mb-10 ml-64 px-4 py-4 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
              Play Now
            </button>
          </Link>
        </div>
      </div>

      <div className="mt-0 p-10">
        <UserFooter />
      </div>
    </div>
  );
}

export default LandingPage;
