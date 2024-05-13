import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { socketId } from "../../Providers/Socket";

function UserNav() {
  const [unreadMessages, setUnreadMessages] = useState<number>(0);
  const [bellClicked, setBellClicked] = useState<boolean>(false);

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

  return (
    <div>
      <nav className="p-2 border-b border-gray-300 shadow-lg">
        <h1 className="text-3xl font-bold text-black cursor-pointer hover:text-gray-300 flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-green-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm1 15h-2v-2h2v2zm0-4h-2v-2h2v2zm-4 4H7v-2h2v2zm0-4H7v-2h2v2zm0-4H7V7h2v2zm4 8h-2v-2h2v2zm0-4h-2V7h2v4z" />
          </svg>
          <span className="text-green-500">Play</span>
          <span className="text-blue-500">Pitch</span>
        </h1>

        <div className="flex justify-end items-center">
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
            className="px-3 text-black cursor-pointer hover:text-gray-300"
          >
            Play
          </a>
          <a
            href="/home"
            className="px-3 text-black cursor-pointer hover:text-gray-300 mr-3"
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
