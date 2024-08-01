import React, { useEffect, useState } from 'react';
import { axiosAdminInstance } from '../../utils/axios/axios';
import NavAdmin from './NavAdmin';

interface WalletStatement {
    _id: string;
    date: string;
    walletType: string;
    amount: number;
    turfName: string;
    transactionType: 'debit' | 'credit';
}

interface AdminResponse {
    _id: string;
    email: string;
    password: string;
    wallet: number;
    walletStatements: WalletStatement[];
    isAdmin: boolean;
}

const AdminWallet: React.FC = () => {
    const [walletStatements, setWalletStatements] = useState<WalletStatement[]>([]);
    const [totalBalance, setTotalBalance] = useState<number>(0);

    useEffect(() => {
        const fetchWallet = async () => {
            try {
                const response = await axiosAdminInstance.get<AdminResponse>('/admin/wallet');
                if (response.data) {
                    setWalletStatements(response.data[0].walletStatements);
                    setTotalBalance(response.data[0].wallet);
                } else {
                    console.error('walletStatements is undefined');
                }
            } catch (error) {
                console.error('Error fetching wallet statements:', error);
            }
        };
        fetchWallet();
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen">
            <NavAdmin />
            <div className="max-w-4xl mx-auto p-8">
                <h1 className="text-4xl font-bold text-center text-indigo-900 mb-8">Admin Wallet</h1>
                
                <div className="bg-indigo-600 text-white rounded-lg shadow-lg p-6 mb-8">
                    <h2 className="text-xl mb-2">Total Balance</h2>
                    <p className="text-4xl font-bold">${totalBalance.toFixed(2)}</p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-semibold text-indigo-900 mb-4">Transaction History</h2>
                    {walletStatements.length > 0 ? (
                        <ul>
                            {walletStatements.map((statement) => (
                                <li 
                                    key={statement._id}
                                    className={`flex justify-between items-center p-4 border-b last:border-b-0 ${
                                        statement.transactionType === 'credit' 
                                            ? 'bg-green-50' 
                                            : 'bg-red-50'
                                    }`}
                                >
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            {new Date(statement.date).toLocaleDateString()}
                                        </p>
                                        <p className="font-semibold text-gray-800">{statement.turfName}</p>
                                    </div>
                                    <span className={`font-bold ${
                                        statement.transactionType === 'credit'
                                            ? 'text-green-600'
                                            : 'text-red-600'
                                    }`}>
                                        {statement.transactionType === 'credit' ? '+' : '-'}
                                        ${Math.abs(statement.amount).toFixed(2)}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center text-gray-500">No wallet statements found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminWallet;