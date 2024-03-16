import { useDispatch } from "react-redux"
import { ownerLogin, ownerLogout } from "../../services/Redux/slice/ownerSlices"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"




function Ownerhome() {
    const dispatch=useDispatch()
    const navigate=useNavigate()

useEffect(()=>{
    const token=localStorage.getItem('token')
    if(token){
        const ownerData=JSON.parse(atob(token.split('.')[1]))
        dispatch(ownerLogin(ownerData))
    }else{
        navigate('/ownerlogin')
    }
},[dispatch,navigate])

const handleLogout=()=>{
    localStorage.removeItem('token')
    dispatch(ownerLogout())
    navigate('/ownerlogin')
}


  return (
    <div>
    <div className="flex justify-end p-5 py-8 border">
      <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Logout
      </button>

    </div>
    
  <div className="bg-green-500 p-4 mt-20 rounded-lg">
  <p className="text-center text-gray-900 mb-12 font-bold">Please add your venue to get partner with us</p>
    <a href="/addvenue" className=" w-full bg-black hover:bg-green-400 text-white font-bold py-2 px-4 rounded flex justify-center">Add your venue</a>
</div>
  </div>
  
  )
}

export default Ownerhome
