import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { axiosUserInstance } from "../../utils/axios/axios";
import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";

type Coordinates = {
  latitude: number;
  longitude: number;
};

interface Booking {
  Time: string | number | Date;
  _id: string;
  userId: string;
  turfId: string;
  date: string;
  selectedSlot: string;
  totalPrice: number;
  paymentMethod: string;
  bookingStatus: string;
  __v: number;
}

interface Turf {
  longitude: number;
  latitude: number;
  _id: string;
  turfName: string;
  aboutVenue: string;
  address: string;
  city: string;
  openingTime: string;
  closingTime: string;
  price: number;
  facilities: string;
  images: string[];
  isActive: boolean;
  isDeclined: boolean;
  turfOwner: string;
  __v: number;
}

function BookingDetails() {
  const location = useLocation();
  const [bookingDetails, setBookingDetails] = useState<Booking | null>(null);
  const [turfDetails, setTurfDetails] = useState<Turf | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [distance, setDistance] = useState<number | null>(null); 
  const [directions, setDirections] = useState<any>(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await axiosUserInstance.get(
          `/getbooking/${location.state.booking._id}`
        );
        setBookingDetails(response.data.booking);
        setTurfDetails(response.data.turfDetails);
      } catch (error) {
        console.error("Error fetching booking details:", error);
      }
    };

    if (location.state && location.state.booking) {
      fetchBookingDetails();
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (error) => {
        console.error("Error getting user's location:", error);
      }
    );
  }, [location]);

  useEffect(() => {
    if (userLocation && turfDetails) {
      const distanceInKm = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        turfDetails.latitude,
        turfDetails.longitude
      );
      setDistance(distanceInKm);
    }
  }, [userLocation, turfDetails]);

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; 
    return d;
  };

  const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180);
  };

  const handleShowMap = () => {
    setShowMap(true);
  };

  const directionsCallback = (response: any) => {
    if (response !== null && response.status === 'OK') {
      setDirections(response);
    } else {
      console.error('Directions request failed');
    }
  };

  if (!bookingDetails || !turfDetails) {
    return <div>Loading...</div>;
  }

  const mapOptions = {
    zoom: 15, // Adjusted zoom level
    center: { lat: turfDetails.latitude, lng: turfDetails.longitude }
  };

  return (
    <div>
      <a
        href="/booking"
        className="inline-block px-2 py-2 mt-3 bg-blue-800 hover:bg-blue-600 text-white font-semibold border border-blue-500 rounded-lg shadow-md transition duration-300 ease-in-out items-center"
      >
        &larr; 
        <span className="ml-2">Back To Bookings</span>
      </a>
  
      <h1 className="flex justify-center font-bold mt-10">Booking Details</h1>

      <p className="flex justify-center font-semibold mt-3">{turfDetails.turfName}</p>
      <div className="flex flex-wrap justify-center mt-6">
        {turfDetails.images.map((imageUrl, index) => (
          <div key={index} className="max-w-xs mx-4 my-2">
            <img src={imageUrl} alt={`Turf Image ${index + 1}`} className="w-full h-auto rounded-lg shadow-md" />
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6">
      
      <div className="max-w-xs p-4 bg-gray-100 rounded-lg ">
        <p>Total Price: {bookingDetails.totalPrice}</p>
        <p>Booking Status: <span className="text-green-500">{bookingDetails.bookingStatus}</span></p>
        <p>Booked On: {new Date(bookingDetails.Time).toLocaleString()}</p>
        <p>Slot Booked Date: {new Date(bookingDetails.date).toISOString().slice(0, 10)}</p>
        <p>Selected Slot: {bookingDetails.selectedSlot}</p>
      </div>

      <div className="flex flex-col ml-6">
    <button onClick={handleShowMap} className="inline-block px-2 py-2 mt-3 bg-blue-800 hover:bg-blue-600 text-white font-semibold border border-blue-500 rounded-lg shadow-md transition duration-300 ease-in-out items-center">
      show directions
    </button>
        {showMap && (
          <>
            <p>Distance to Turf: {distance ? `${distance.toFixed(2)} km` : "Calculating..."}</p>
            <LoadScript
              googleMapsApiKey="AIzaSyCPqPnBZ33jk1vGyNiCHToX9W9edkqlmls"
            >
              <GoogleMap
                mapContainerStyle={{ width: '200%', height: '300px' }}
                zoom={mapOptions.zoom}
                center={mapOptions.center}
              >
                <>
                  <Marker position={{ lat: turfDetails.latitude, lng: turfDetails.longitude }} />
                  {userLocation && (
                    <DirectionsService
                      options={{
                        destination: { lat: turfDetails.latitude, lng: turfDetails.longitude },
                        origin: { lat: userLocation.latitude, lng: userLocation.longitude },
                        travelMode: 'DRIVING'
                      }}
                      callback={directionsCallback}
                    />
                  )}
                  {directions && <DirectionsRenderer directions={directions} />}
                  {distance && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: '#fff',
                        padding: '5px',
                        borderRadius: '5px',
                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      Distance to Turf: {distance.toFixed(2)} km
                    </div>
                  )}
                </>
              </GoogleMap>
            </LoadScript>
          </>
        )}
      </div>
    </div>
    </div>
  );
}

export default BookingDetails;
