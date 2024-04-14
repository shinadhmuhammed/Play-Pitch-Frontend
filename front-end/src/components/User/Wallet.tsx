import { useEffect, useState } from "react";
import Profiles from "./Profiles";
import UserNav from "./UserNav";
import { axiosUserInstance } from "../../utils/axios/axios";

interface WalletDetails {
  wallet: number;
  walletStatements: {
    _id: string;
    amount: number;
    date: string;
    transaction: string;
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
          <h1 className="text-xl font-bold">Wallet</h1>
          {walletDetails && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Balance: <span className="text-yellow-600">{walletDetails.wallet}</span></h2>
              <h2 className="text-lg font-semibold">Statements:</h2>

              <div className="space-y-2">
                {walletDetails.walletStatements.map((statement) => (
                  <div
                    key={statement._id}
                    className="border border-gray-300 rounded-lg p-4 flex justify-between"
                  >
                    <div>
                      <p className="text-gray-600">Date: {formatDate(statement.date)}</p>
                      <p className="text-gray-600">Type: {statement.walletType}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Transaction: {statement.transaction}</p>
                      <p className="text-gray-600">Amount: {statement.amount}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Wallet;
