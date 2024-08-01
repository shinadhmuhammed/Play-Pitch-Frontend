import React from "react";
import { Link } from "react-router-dom";
import foot from "../../assets/images/bg5.jpg";
import ball from "../../assets/images/bg7.jpg";
import UserFooter from "../../components/User/UserFooter";
import logo from "../../assets/images/football.png";

function LandingPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'gainsboro' }}>
      <header className="flex justify-between items-center p-4 md:p-6">
        <div className="flex items-center">
          <img src={logo} className="h-8 md:h-14" alt="Logo" />
          <h1 className="text-xl md:text-2xl font-bold ml-2">ℙ𝕝𝕒𝕪ℙ𝕚𝕥𝕔𝕙</h1>
        </div>
        <div className="flex space-x-2 md:space-x-4">
          <Link
            to="/login"
            className="bg-green-500 text-white border border-white px-3 py-2 rounded shadow-md hover:bg-green-600 transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-white text-black px-3 py-2 rounded shadow-md hover:bg-gray-100 transition duration-300"
          >
            Register
          </Link>
        </div>
      </header>

      {[
        { img: foot, title: "𝙷𝚎𝚢 𝙿𝚕𝚊𝚢𝚎𝚛𝚜,", subtitle: "𝑳𝒆𝒕'𝒔 𝒇𝒐𝒐𝒕𝒃𝒂𝒍𝒍", btnText: "Login Now", link: "/login" },
        { img: ball, title: "𝙵𝚒𝚗𝚍 𝚈𝚘𝚞𝚛 𝙽𝚎𝚊𝚛𝚎𝚜𝚝 𝚅𝚎𝚗𝚞𝚎 𝚊𝚗𝚍 𝚋𝚘𝚘𝚔 𝚢𝚘𝚞𝚛 𝚜𝚕𝚘𝚝𝚜", subtitle: "𝐁𝐨𝐨𝐤 𝐘𝐨𝐮𝐫 𝐕𝐞𝐧𝐮𝐞", btnText: "Book Now", link: "/homePage" },
        { img: foot, title: "𝗃𝗈𝗂𝗇 𝗈𝗍𝗁𝖾𝗋 𝗁𝗈𝗌𝗍𝖾𝖽 𝗀𝖺𝗆𝖾 𝗉𝗅𝖺𝗒𝖾𝗋𝗌 𝖺𝗇𝖽 𝗆𝖺𝗄𝖾 𝗇𝖾𝗐 𝖿𝗋𝗂𝖾𝗇𝖽𝗌", subtitle: "𝑷𝒍𝒂𝒚 𝑾𝒊𝒕𝒉 𝑶𝒕𝒉𝒆𝒓 𝑷𝒍𝒂𝒚𝒆𝒓𝒔", btnText: "Play Now", link: "/games" }
      ].map((section, index) => (
        <div key={index} className="relative h-screen">
          <img
            src={section.img}
            className="w-full h-full object-cover"
            alt={`bg${index + 1}`}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white p-4 max-w-3xl">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">{section.title}</h2>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6">{section.subtitle}</h1>
              <Link to={section.link}>
                <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300 transform hover:scale-105">
                  {section.btnText}
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}

      <footer className="px-4 md:px-10 py-8">
        <UserFooter />
      </footer>
    </div>
  );
}

export default LandingPage;