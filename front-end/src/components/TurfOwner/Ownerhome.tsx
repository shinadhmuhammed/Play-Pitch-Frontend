import Navbar from "./Navbar";


function Ownerhome() {


 

    return (
        <div>
            <Navbar/>

            <div className="bg-green-500 p-4 mt-20 rounded-lg">
                <p className="text-center text-gray-900 mb-12 font-bold">Please add your venue to get partnered with us</p>
                <a href="/owner/addvenue" className="w-full bg-black hover:bg-green-400 text-white font-bold py-2 px-4 rounded flex justify-center">Add Your Venue</a>
            </div>
        </div>
    );
}

export default Ownerhome;
