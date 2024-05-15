import { useEffect, useState } from "react"
import { axiosAdminInstance } from "../../utils/axios/axios"
import NavAdmin from "./NavAdmin";
import Swal from 'sweetalert2';



interface User {
    _id: string;
    username: string;
    email: string;
    phone: string;
    isBlocked: boolean;
  }


function Getusers() {
    const[users,setUsers]=useState<User[]>([])
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);



    useEffect(()=>{
        const fetchUsers=async()=>{
            try {
                const response=await axiosAdminInstance.get('/admin/getusers')
                setUsers(response.data);
  
            } catch (error) {
                console.log(error)
            }
        }
        fetchUsers()
    },[])


    const blockandunblock = async (email: string, isBlocked: boolean) => {
      const confirmationResult = await Swal.fire({
        title: `Are you sure you want to ${isBlocked ? 'unblock' : 'block'} this user?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      });
 
      if (confirmationResult.isConfirmed) {
        try {
          const response = await axiosAdminInstance.post('/admin/blockandunblock', { email, isBlocked });
          setUsers(prevUsers => prevUsers.map(user => {
            if (user.email === email) {
              if (!isBlocked) {
                localStorage.removeItem('userToken');
              }
              return { ...user, isBlocked: !isBlocked };
            }
            return user;
          }));
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      }
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  
   
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <NavAdmin/>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <table className="min-w-full bg-white overflow-hidden shadow rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Block/Unblock
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentUsers.map((user) => (
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button onClick={()=>blockandunblock(user.email,user.isBlocked)} className="text-white bg-red-500 hover:bg-red-700 px-3 py-1 rounded-md">
                    {user.isBlocked ? "Unblock" : "Block"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
      <ul className="flex justify-center my-4">
        {Array.from({ length: Math.ceil(users.length / usersPerPage) }).map((_, index) => (
          <li key={index}>
            <button
              onClick={() => paginate(index + 1)}
              className={`mx-1 px-3 py-1 rounded-md ${
                currentPage === index + 1 ? "bg-black text-white" : "bg-gray-300 text-gray-700"
              }`}
            >
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Getusers
