import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faBars } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { socketId } from "../../Providers/Socket";
import logo from '../../assets/images/football.png';
import React from "react";

function UserNav() {
  const [unreadMessages, setUnreadMessages] = useState<number>(0);
  const [bellClicked, setBellClicked] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    socketId.on("received-message", () => {
      if (!bellClicked) {
        setUnreadMessages((prevCount) => prevCount + 1);
      }
    });

    return () => {
      socketId.off("received-message");
    };
  }, [bellClicked]);

  const handleBellClick = () => {
    setBellClicked(true);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <nav className="p-4 border-b border-gray-300 shadow-lg flex justify-between items-center">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} className="h-10" alt="Logo" />
          <h1 style={{ marginLeft: '2px' }}>ℙ𝕝𝕒𝕪ℙ𝕚𝕥𝕔𝕙</h1>
        </div>

        <div className="flex items-center lg:hidden">
          <FontAwesomeIcon
            icon={faBars}
            className="h-8 w-8 text-black cursor-pointer"
            onClick={handleMenuToggle}
          />
        </div>

        <div
          className={`flex-col lg:flex-row items-center lg:flex ${isMenuOpen ? 'flex' : 'hidden'} lg:flex`}
        >
          <div className="relative" onClick={handleBellClick}>
            <FontAwesomeIcon
              icon={faBell}
              className="h-8 w-4 mr-3 mt-1 text-black cursor-pointer hover:text-gray-300"
            />
            {unreadMessages > 0 && !bellClicked ? (
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                {unreadMessages}
              </span>
            ) : (
              bellClicked && (
                <span className="text-xs text-gray-500">No new notifications</span>
              )
            )}
          </div>

          <a
            href="/activity"
            className="px-3 text-black cursor-pointer hover:text-blue-100"
          >
            Play
          </a>
          <a
            href="/home"
            className="px-3 text-black cursor-pointer hover:text-blue-100 mr-3 "
          >
            View Turf
          </a>
          <div>
            <a href="/booking">
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

export default UserNav;
