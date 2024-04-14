import { useEffect, useState } from "react";
import Profiles from "./Profiles";
import UserNav from "./UserNav";
import { axiosUserInstance } from "../../utils/axios/axios";
import { useNavigate } from "react-router-dom";
import UserFooter from "./UserFooter";

interface Booking {
  _id: string;
  date: string;
  selectedSlot: string;
  bookingStatus: string;
  totalPrice: number;
  paymentMethod: string;
}

function UserBooking() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axiosUserInstance.get("/getbooking");
        setBookings(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBooking();
  }, []);

  useEffect(() => {
    if (statusFilter === null) {
      setFilteredBookings(bookings);
    } else {
      const filtered = bookings.filter(
        (booking) => booking.bookingStatus === statusFilter
      );
      setFilteredBookings(filtered);
    }
  }, [statusFilter, bookings]);

  const handleFilter = (status: string) => {
    setStatusFilter(status);
  };


  const handleCancelBooking=async(id:string)=>{
    console.log(id)
    console.log('hello')
    try {
      const response=await axiosUserInstance.post('/cancelbooking',{
        id
      })
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <>
      <div
        className="relative"
        style={{
          backgroundImage: `url('/images/bg3.jpeg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <UserNav />
  
        <div className="flex">
          <Profiles />
  
          <div className="mr-96 p-20 ">
            <h1 className="text-green-950 font-bold">All Bookings</h1>
            <div className="flex justify-center mb-4 ">
              <button
                className={`mr-4 text-sm text-green-600 ${
                  statusFilter === "confirmed" ? "underline" : ""
                } hover:text-green-700 hover:underline focus:outline-none focus:text-green-700 focus:underline`}
                onClick={() => handleFilter("confirmed")}
              >
                Confirmed
              </button>
            </div>
  
            <div className="grid gap-4 w-full ">
              {filteredBookings.map((booking) => (
                <div key={booking._id} className="border rounded-lg p-4 ">
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(booking.date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Selected Slot:</strong> {booking.selectedSlot}
                  </p>
                  <p>
                    <strong>Booking Status:</strong> {booking.bookingStatus}
                  </p>
                  <p>
                    <strong>Total Price:</strong> {booking.totalPrice}
                  </p>
                  <p>
                    <strong>Payment Method:</strong> {booking.paymentMethod}
                  </p>
                  <div className="flex justify-between">
                    <button
                      className="text-blue-600 hover:text-blue-700 focus:outline-none focus:text-blue-700 "
                      onClick={() =>
                        navigate(`/booking/${booking._id}`, {
                          state: { booking },
                        })
                      }
                    >
                      View Details
                    </button>

                    {booking.bookingStatus !== "cancelled" && (
                      <button
                        className="text-red-600 hover:text-red-700 focus:outline-none focus:text-red-700 "
                        onClick={() => handleCancelBooking(booking._id)}
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>


                </div>
              ))}
            </div>
          </div>
        </div>
        <UserFooter />
      </div>
    </>
  );
}  
export default UserBooking;
