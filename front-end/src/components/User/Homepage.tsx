import {  useDispatch } from "react-redux" 
import {useEffect} from "react"
import { userLogin, userLogout } from "../../services/Redux/slice/userSlices"
import { useNavigate } from "react-router-dom"




function Homepage() {

    // interface RootState{
    //     user:{
    //         isLoggedIn:boolean
    //     }
    // }

    const dispatch=useDispatch()
    const navigate=useNavigate()
    // const isLoggedIn=useSelector((state:RootState) => state.user.isLoggedIn)

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


 

  return (
    <div>
      <button onClick={handleLogout} >Logout</button>
    </div>
  )
}

export default Homepage
