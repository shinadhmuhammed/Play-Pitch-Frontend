import React, { useEffect, useState } from "react";
import { axiosOwnerInstance } from "../../utils/axios/axios";

interface WalletStatement {
  amount: number;
  date: string;
  transactionType: string;
  turfName: string;
}

export default function OwnerWallet() {
  const [walletStatements, setWalletStatements] = useState<WalletStatement[]>([]);
  const [walletBalance, setWalletBalance] = useState<number | null>(null);

  useEffect(() => {
    const fetchOwnerDetails = async () => {
      try {
        const response = await axiosOwnerInstance.get("/owner/ownerdetails");
        setWalletBalance(response.data.wallet);
        setWalletStatements(response.data.walletStatements);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOwnerDetails();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-xl">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Wallet Statements</h1>
      <div className="bg-blue-100 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-blue-800">
          Balance: {walletBalance !== null ? `₹${walletBalance.toFixed(2)}` : "Loading..."}
        </h2>
      </div>
      <ul className="space-y-4">
        {walletStatements.map((statement, index) => (
          <li key={index} className="bg-gray-50 rounded-lg p-4 shadow transition duration-300 ease-in-out hover:shadow-md">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <span className="font-semibold text-gray-600">Amount:</span>
                <p className="text-lg font-bold text-gray-800">₹{statement.amount.toFixed(2)}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-600">Date:</span>
                <p className="text-gray-800">{new Date(statement.date).toLocaleDateString()}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-600">Type:</span>
                <p className={`font-medium ${
                  statement.transactionType === 'credit' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {statement.transactionType.charAt(0).toUpperCase() + statement.transactionType.slice(1)}
                </p>
              </div>
              <div>
                <span className="font-semibold text-gray-600">Turf Name:</span>
                <p className="text-gray-800">{statement.turfName}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
