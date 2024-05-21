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
      
        <div className="absolute top-0 left-0 right-0 flex justify-end pt-4 pr-4 md:pr-6">
          <a
            className="bg-green-500 text-white border border-white px-3 py-2 rounded mr-2 shadow-md"
            href="/login"
          >
            Login
          </a>
          <a
            className="bg-white text-black px-3 py-2 rounded shadow-md"
            href="/signup"
          >
            Register
          </a>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white p-4">
          <h1 className="font-extrabold mb-4 font-serif">
            <span className="text-2xl md:text-3xl lg:text-4xl">Hey players,</span><br />
            <span className="text-3xl md:text-5xl lg:text-6xl">Let's football</span>
          </h1>
          <Link to="/login">
            <button className="bg-green-500 hover:bg-green-600 text-white mb-4 px-4 py-2 md:py-3 md:px-6 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
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
        <div className="absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 text-center text-black p-4">
          <h1 className="font-extrabold mb-4 font-serif">
            <span className="text-base md:text-lg lg:text-xl">Find the nearest venue, book your slot, and host the game</span><br />
            <span className="text-xl md:text-3xl lg:text-4xl">Book Your Venues</span>
          </h1>
          <Link to="/homePage">
            <button className="bg-green-500 hover:bg-green-600 text-white mb-4 px-4 py-2 md:py-3 md:px-6 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
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
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white p-4">
          <h1 className="font-extrabold mb-4 font-serif">
            <span className="text-2xl md:text-3xl lg:text-4xl">Join other hosted games, meet players</span><br />
            <span className="text-3xl md:text-4xl lg:text-5xl">Play with other players</span>
          </h1>
          <Link to="/games">
            <button className="bg-green-500 hover:bg-green-600 text-white mb-4 px-4 py-2 md:py-3 md:px-6 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
              Play Now
            </button>
          </Link>
        </div>
      </div>

      <div className="mt-0 p-4 md:p-10">
        <UserFooter />
      </div>
    </div>
  );
}

export default LandingPage;
