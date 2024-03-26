

function UserFooter() {
  return (
    <footer className="bg-black mt-11 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-2">About</h3>
            <ul className="list-none">
              <li>About Us</li>
              <li>Our Team</li>
              <li>Our Story</li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-2">Contact</h3>
            <ul className="list-none">
              <li>Contact Us</li>
              <li>Support</li>
              <li>Feedback</li>
            </ul>
          </div>
          
          {/* Privacy Policy */}
          <div>
            <h3 className="text-lg font-bold mb-2">Privacy Policy</h3>
            <ul className="list-none">
              <li>Terms of Service</li>
              <li>Privacy Statement</li>
              <li>Cookie Policy</li>
            </ul>
          </div>
          
          {/* Developers */}
          <div>
            <h3 className="text-lg font-bold mb-2">Developers</h3>
            <ul className="list-none">
              <li>API Documentation</li>
              <li>Developer Resources</li>
              <li>Community</li>
            </ul>
          </div>
        </div>
        
        {/* Partner with Us Button */}
        <div className="mt-6 text-center">
          <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none">
            Partner with Us
          </button>
        </div>
      </div>
    </footer>
  );
}

export default UserFooter;
