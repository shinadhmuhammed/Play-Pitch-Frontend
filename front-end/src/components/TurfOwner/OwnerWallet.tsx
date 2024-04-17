import { useEffect, useState } from "react";
import { axiosOwnerInstance } from "../../utils/axios/axios";

interface WalletStatement {
  amount: number;
  date: string; 
  transactionType: string;
  turfName: string;
}

function OwnerWallet() {
  const [walletStatements, setWalletStatements] = useState<WalletStatement[]>([]);
  const [walletBalance, setWalletBalance] = useState<number | null>(null); 

  useEffect(() => {
    const fetchOwnerDetails = async () => {
      try {
        const response = await axiosOwnerInstance.get("/owner/ownerdetails");
        console.log(response.data);

      
        setWalletBalance(response.data.wallet);

        setWalletStatements(response.data.walletStatements);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOwnerDetails();
  }, []);

  return (
    <div className="mt-8 p-6 bg-white shadow-md rounded-lg">
      <h1 className="font-bold text-2xl mb-6">Wallet Statements</h1>
      <div className="flex justify-between mb-4">
        <h2 className="font-semibold ">Balance: {walletBalance !== null ? ` ₹${walletBalance.toFixed(2)}` : "Loading..."}</h2>
      </div>
      <ul className="space-y-4">
        {walletStatements.map((statement, index) => (
          <li key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between">
              <div>
                <span className="font-bold text-gray-700">Amount:</span> {statement.amount}
              </div>
              <div>
                <span className="font-bold text-gray-700">Date:</span> {statement.date}
              </div>
              <div>
                <span className="font-bold text-gray-700">Type:</span> {statement.transactionType}
              </div>
              <div>
                <span className="font-bold text-gray-700">Turf Name:</span> {statement.turfName}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OwnerWallet;
