import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosUserInstance } from "../../utils/axios/axios";
import UserNav from "./UserNav";
import UserFooter from "./UserFooter";
import ImageCarousel from "./ImageCarousel";
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faRupeeSign,
  faFutbol,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

interface TurfDetail {
  courtType: string[];
  _id: string;
  turfName: string;
  address: string;
  city: string;
  aboutVenue: string;
  openingTime: string;
  closingTime: string;
  price: { [key: string]: string };
  facilities: string;
  images: string[];
  latitude: number;
  longitude: number;
}

interface Coordinates {
  latitude: number;
  longitude: number;
}

function TurfDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [turfDetail, setTurfDetail] = useState<TurfDetail | null>(null);
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [directions, setDirections] = useState<any>(null);

  useEffect(() => {
    const fetchTurfDetail = async () => {
      try {
        const response = await axiosUserInstance.get(`/getTurf/${id}`);
        setTurfDetail(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTurfDetail();

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error getting user's location:", error);
      }
    );
  }, [id]);

  useEffect(() => {
    if (userLocation && turfDetail) {
      const distanceInKm = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        turfDetail.latitude,
        turfDetail.longitude
      );
      setDistance(distanceInKm);
    }
  }, [userLocation, turfDetail]);

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
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
  };

  const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180);
  };

  const handleBookingFront = async () => {
    if (!turfDetail) {
      console.log("Turf details are not available.");
      return;
    }

    navigate("/checkout", { state: { turfDetail } });
  };

  const directionsCallback = (response: any) => {
    if (response !== null && response.status === "OK") {
      setDirections(response);
    } else {
      console.error("Directions request failed");
    }
  };

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
      ></div>
      <div>
        <UserNav />

        {turfDetail && (
          <div className="mx-8">
            <h1 className="font-medium text-4xl md:text-5xl lg:text-4xl mt-8 font-sans b ml-8">
              {turfDetail.turfName}
            </h1>

            <div className="flex">
              <div className="w-1/2 h-10 px-10">
                <ImageCarousel turfDetail={turfDetail} />

                <div className="border border-gray-200 rounded-lg p-4 mt-6">
                  <h2 className="text-xl font-semibold mb-2">About Venue</h2>
                  <p className="text-gray-700">{turfDetail.aboutVenue}</p>
                </div>

                <div className="mt-6 border border-gray-200 rounded-lg p-4">
                  <h2 className="text-xl font-semibold mb-2">Facilities</h2>
                  <ul className="list-disc list-inside">
                    {turfDetail.facilities.split(",").map((facility, index) => (
                      <li key={index} className="text-gray-700">
                        {facility.trim()}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="w-1/2 ml-10 mt-2">
                <div className="flex items-center mb-4">
                  <div style={{ height: "350px", width: "100%" }}>
                    <LoadScript googleMapsApiKey="AIzaSyCPqPnBZ33jk1vGyNiCHToX9W9edkqlmls">
                      <GoogleMap
                        mapContainerStyle={{ height: "350px", width: "100%" }}
                        center={{
                          lat: turfDetail.latitude,
                          lng: turfDetail.longitude,
                        }}
                        zoom={15}
                      >
                        <Marker
                          position={{
                            lat: turfDetail.latitude,
                            lng: turfDetail.longitude,
                          }}
                        />
                        {userLocation && (
                          <DirectionsService
                            options={{
                              destination: {
                                lat: turfDetail.latitude,
                                lng: turfDetail.longitude,
                              },
                              origin: {
                                lat: userLocation.latitude,
                                lng: userLocation.longitude,
                              },
                              travelMode: "DRIVING",
                            }}
                            callback={directionsCallback}
                          />
                        )}
                        {directions && (
                          <DirectionsRenderer directions={directions} />
                        )}
                      </GoogleMap>
                    </LoadScript>
                    <p className="mt-4 text-center">
                      {distance &&
                        `Distance from your location: ${distance.toFixed(
                          2
                        )} km`}
                    </p>
                  </div>
                </div>

                <div className="border border-gray-300 mt-14 rounded-md p-6 flex justify-between">
                  <div>
                    <h1 className="font-bold mb-2">
                      <FontAwesomeIcon icon={faLocationDot} /> Place
                    </h1>
                    <h2 className="font-semibold">
                      {turfDetail.address}, {turfDetail.city}
                    </h2>
                    <h1 className="font-bold mt-4 ">
                      <FontAwesomeIcon icon={faClock} /> Timing
                      
                    </h1>

                    <h2 className="font-semibold">
                      {turfDetail.openingTime} - {turfDetail.closingTime}
                    </h2>
                    <h1 className="font-bold mt-4">
                      <FontAwesomeIcon icon={faFutbol} /> Court Type
                    </h1>
                    <h2 className="font-semibold">{turfDetail.courtType}</h2>
                    <h1 className="font-bold mt-4">
                      <FontAwesomeIcon icon={faRupeeSign} /> Price
                    </h1>
                    {Object.keys(turfDetail.price).map((type, index) => (
                      <h2 key={index} className="font-semibold">
                        {type}: {turfDetail.price[type]}
                      </h2>
                    ))}
                  </div>
                  <div className="flex flex-col justify-center">
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white font-semibold w-96 h-10 rounded-md shadow-md mt-72 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 "
                      onClick={handleBookingFront}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <UserFooter />
      </div>
    </>
  );
}

export default TurfDetailPage;
