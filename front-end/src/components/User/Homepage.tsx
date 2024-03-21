import {  useDispatch } from "react-redux" 
import {useEffect, useState} from "react"
import { userLogin, userLogout } from "../../services/Redux/slice/userSlices"
import { useNavigate } from "react-router-dom"
import {axiosUserInstance } from "../../utils/axios/axios"



interface Turf{
  _id:string;
  turfName:string,
  address:string,
  city:string,
  aboutvenue:string,
  facilities:string,
  openingTime:string,
  closingTime:string,
  court:string,
  price:number,
  image:string
}


function Homepage() {
  const[turf,setTurf]=useState<Turf[]>([])
    const dispatch=useDispatch()
    const navigate=useNavigate()
  
  
    useEffect(()=>{
        const token=localStorage.getItem('token')
        if(token){
            const userData=JSON.parse(atob(token.split('.')[1]))
            dispatch(userLogin(userData))
        }else{
            navigate('/login')
        }
    },[dispatch,navigate])

    const handleLogout=()=>{
        localStorage.removeItem('token')
        dispatch(userLogout())
        navigate('/login')
    }

    useEffect(()=>{
      const fetchUsers=async()=>{
        try {
            const response=await axiosUserInstance.get('/getturf')
            setTurf(response.data)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
      }
      fetchUsers()
    },[])


 



    return (
      <>
      <nav className="bg-gray-500 p-6 flex justify-between  items-center">
          <a href="/home" className="text-white hover:text-green-400  flex items-center space-x-2">
              <span>Book</span>
          </a>
          <button
              onClick={handleLogout}
              className="text-white hover:text-green-400"
          >
              Logout
          </button>
      </nav>

      <nav className="flex justify-between items-center mt-7 p-10 bg-gray-300">
  <h1 className="font-extrabold text-xl">Book Your Venues</h1>
  <div className="flex items-center">
    <div className="relative mr-4">
      <input
        type="text"
        placeholder="Search"
        className="border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
      />
      <span className="absolute right-3 top-2 text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 3a7 7 0 100 14 7 7 0 000-14zM8.5 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </div>
    <button className="text-gray-600 hover:text-blue-500">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M2.5 5a.5.5 0 01.5-.5h14a.5.5 0 010 1h-14a.5.5 0 01-.5-.5zm0 4a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5zm0 4a.5.5 0 01.5-.5h6a.5.5 0 010 1h-6a.5.5 0 01-.5-.5z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  </div>
</nav>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {turf.map((turf) => (
          <div key={turf._id} className="bg-white shadow-md rounded-md p-4">
            <img src={turf.image} alt={turf.turfName} className="w-full h-40 object-cover mb-4 rounded-md" />
            <h2 className="text-lg font-semibold mb-2">{turf.turfName}</h2>
            <p className="text-sm text-gray-600 mb-2">{turf.address}, {turf.city}</p>
            <p className="text-sm text-gray-600 mb-2">{turf.court}</p>
            <p className="text-sm text-gray-600 mb-2">Price: ${turf.price}</p>
          
          </div>
        ))}
      </div>

      </>
  );
}

export default Homepage
