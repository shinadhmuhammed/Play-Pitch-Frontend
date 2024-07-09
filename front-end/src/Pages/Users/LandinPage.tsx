import { Link } from "react-router-dom";
import foot from '../../assets/images/bg5.jpg';
import ball from '../../assets/images/bg7.jpg';
import UserFooter from "../../components/User/UserFooter";
import logo from '../../assets/images/football.png'
import background from '../../assets/images/bg3.jpeg'
import React from "react";

function LandingPage() {
  return (
    <>
      <div className="relative min-h-screen" style={{ backgroundColor:'floralwhite' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>

          <img src={logo} className="h-14 mt-4 ml-10" alt="Logo" />
          <h1 style={{ marginLeft: '2px', marginTop: '15px' }}>ℙ𝕝𝕒𝕪ℙ𝕚𝕥𝕔𝕙</h1>
        </div>

        <div className="absolute top-0 left-0 right-0 flex justify-end pt-4 pr-4 md:pr-6" >
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
        <div className="relative">
        <img
          src={foot}
          className="w-full mt-0 contrast-100"
          alt="bg1"
          style={{ height: "calc(100vh - 10px)" }}
        />
         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white p-4">
          <h1 className="font-extrabold mb-4 font-serif">
            <span className="text-2xl md:text-3xl lg:text-4xl">𝙷𝚎𝚢 𝙿𝚕𝚊𝚢𝚎𝚛𝚜,</span><br />
            <span className="text-3xl md:text-5xl lg:text-6xl">𝑳𝒆𝒕'𝒔 𝒇𝒐𝒐𝒕𝒃𝒂𝒍𝒍</span>
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
          alt="bg2"
          style={{ height: "calc(100vh - 10px)" }}
        />
         <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 text-center text-white p-4">
          <h1 className="font-extrabold mb-4 font-serif">
            <span className="text-2xl md:text-3xl lg:text-4xl">𝙵𝚒𝚗𝚍 𝚈𝚘𝚞𝚛 𝙽𝚎𝚊𝚛𝚎𝚜𝚝 𝚅𝚎𝚗𝚞𝚎 𝚊𝚗𝚍 𝚋𝚘𝚘𝚔 𝚢𝚘𝚞𝚛 𝚜𝚕𝚘𝚝𝚜</span><br />
            <span className="text-3xl md:text-5xl lg:text-6xl">𝐁𝐨𝐨𝐤 𝐘𝐨𝐮𝐫 𝐕𝐞𝐧𝐮𝐞</span>
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
          className="w-full mt-0 "
          alt="bg3"
          style={{ height: "calc(100vh - 10px)" }}
        />
         <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 text-center text-white p-4">
          <h1 className="font-extrabold mb-4 font-serif">
            <span className="text-2xl md:text-1xl lg:text-4xl">𝗃𝗈𝗂𝗇 𝗈𝗍𝗁𝖾𝗋 𝗁𝗈𝗌𝗍𝖾𝖽 𝗀𝖺𝗆𝖾 𝗉𝗅𝖺𝗒𝖾𝗋𝗌 𝖺𝗇𝖽 𝗆𝖺𝗄𝖾 𝗇𝖾𝗐 𝖿𝗋𝗂𝖾𝗇𝖽𝗌</span><br />
            <span className="text-3xl md:text-5xl lg:text-6xl">𝑷𝒍𝒂𝒚 𝑾𝒊𝒕𝒉 𝑶𝒕𝒉𝒆𝒓 𝑷𝒍𝒂𝒚𝒆𝒓𝒔</span>
          </h1>
          <Link to="/games">
            <button className="bg-green-500 hover:bg-green-600 text-white mb-4 px-4 py-2 md:py-3 md:px-6 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
              Play Now
            </button>
          </Link>
        </div>
        </div>

        <div className="mb-10 ml-10 mr-10">
        <UserFooter />
        </div>
       



      </div>


      
      

    </>
  );
}

export default LandingPage;
