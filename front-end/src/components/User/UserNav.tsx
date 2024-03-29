function UserNav() {
  return (
    <div>
      <nav className="p-6 border-b border-gray-300 shadow-lg">
        <h1 className="text-3xl font-bold text-black cursor-pointer hover:text-gray-300 flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-green-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm1 15h-2v-2h2v2zm0-4h-2V7h2v4zm-4 4H7v-2h2v2zm0-4H7v-2h2v2zm0-4H7V7h2v2zm4 8h-2v-2h2v2zm0-4h-2V7h2v4z" />
          </svg>
          <span className="text-green-500">Play</span>
          <span className="text-blue-500">Pitch</span>
        </h1>

        <div className="flex justify-end items-center">
          <a
            href="#"
            className="px-3 text-black cursor-pointer hover:text-gray-300"
          >
            Play
          </a>
          <a
            href="/home"
            className="px-3 text-black cursor-pointer hover:text-gray-300"
          >
            View Turf
          </a>
          <div className="relative ml-2">
            <a href="/booking">Profile</a>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default UserNav;
