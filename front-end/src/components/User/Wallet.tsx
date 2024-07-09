import { useEffect, useState } from "react";
import Profiles from "./Profiles";
import UserNav from "./UserNav";
import { axiosUserInstance } from "../../utils/axios/axios";
import UserFooter from "./UserFooter";
import React from "react";

interface WalletDetails {
  wallet: number;
  walletStatements: {
    turfName: string;
    _id: string;
    amount: number;
    date: string;
    transactionType: string;
    walletType: string;
  }[];
}

function Wallet() {
  const [walletDetails, setWalletDetails] = useState<WalletDetails | null>(null);





  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axiosUserInstance.get<WalletDetails>("/userdetails");
        setWalletDetails(response.data);
        console.log(response.data)
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserDetails();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatDate = (dateString:any) => {
    return dateString.split("T")[0];
  };


  return (
    <div className="flex flex-col space-y-6">
      <UserNav />
      <div className="flex space-x-6">
        <Profiles />
        <div className="flex flex-col p-10 border border-gray-300 rounded-lg w-full">
          <h1 className="text-2xl font-bold mb-4">Wallet</h1>
          <h2 className="text-lg font-semibold mb-2">
                  Balance:{" "}
                  {walletDetails &&<span className="text-yellow-600">{walletDetails.wallet}</span>}
                </h2>
          {walletDetails && (
            <div className="space-y-4">
              <div className="text-grey-100 opacity-75 rounded-lg p-4 ml-4">
                
                <h2 className="text-lg font-semibold mb-2 ">Statements:</h2>
                {walletDetails.walletStatements.map((statement) => (
                  <div
                    key={statement._id}
                    className="flex justify-between border-b border-gray-300 py-2"
                  >
                    <div className="flex flex-col">
                      <p className="text-gray-600">
                        Date: {formatDate(statement.date)}
                      </p>
                      <p className="text-gray-600">
                        Type: {statement.walletType}
                      </p>
                      <p className="text-gray-600">
                        Turf Name: {statement.turfName}
                      </p>
                    </div>
                    <div className="">
                      <p className="text-gray-600">
                        Transaction: {statement.transactionType}
                      </p>
                      <p className="text-gray-600">
                        Amount: {statement.amount}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <UserFooter/>
    </div>
  );
  
}  
export default Wallet;
