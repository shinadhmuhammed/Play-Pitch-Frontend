import { useEffect, useState } from "react"
import { axiosInstance } from "../../utils/axios/axios"



interface User {
    _id: string;
    username: string;
    email: string;
    phone: string;
    isBlocked: boolean;
  }


function Getusers() {
    const[users,setUsers]=useState<User[]>([])



    useEffect(()=>{
        const fetchUsers=async()=>{
            try {
                const response=await axiosInstance.get('/admin/getusers')
                setUsers(response.data);
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        }
        fetchUsers()
    },[])


    const blockandunblock=async(email:string,isBlocked:boolean)=>{
      try {
          const response=await axiosInstance.post('/admin/blockandunblock',{email,isBlocked})
          setUsers(prevUsers => prevUsers.map(user => {
            if (user.email === email) {
              return { ...user, isBlocked: !isBlocked };
            }
            return user;
          }));
          console.log(response)
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <div>
      <nav className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-white text-lg font-semibold">
                  Users
                </span>
              </div>
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                <a
                    href="/dashboard"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Dashboard
                  </a>
                  <a
                    href="/users"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Users
                  </a>
                  <a
                    href="/users"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Venue Requests
                  </a>
                  <a
                    href="#"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Venue
                  </a>
                </div>
              </div>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <button className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

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
            {users.map((user) => (
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
    </div>
  )
}

export default Getusers