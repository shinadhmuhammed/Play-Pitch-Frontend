import UserFooter from "../../components/User/UserFooter";


function LandinPage() {


  return (
    <div className="relative bg-black">
      <img src="/images/landingturf2.jpg" className="w-full object-cover mt-0 mb-10" alt="hello" style={{ height: "calc(100vh - 100px)" }} />
    
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center z-10">
        <h1 className="text-4xl font-bold mb-4">Welcome to Play Pitch</h1>
        <p className="text-lg mb-8">Book Now</p>
        <div>
          <a className="bg-green-500 text-white border border-white px-4 py-2 rounded mr-2 shadow-md" href="/login">Login</a>
          <a className="bg-white text-black px-4 py-2 rounded shadow-md" href="/signup">Register</a>
        </div>
      </div>
  
      <UserFooter />
    </div>
  
  );
  }  

export default LandinPage
