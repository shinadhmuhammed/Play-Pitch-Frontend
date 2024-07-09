import { ChangeEvent, FormEvent, useState } from "react";
import Profiles from "./Profiles";
import UserNav from "./UserNav";
import { axiosUserInstance } from "../../utils/axios/axios";
import React from "react";

function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'password') {
            setPassword(value);
        } else if (name === 'confirmPassword') {
            setConfirmPassword(value);
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validatePassword(password)) {
            setErrorMessage("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
            return;
        }
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }
        try {
            const response = await axiosUserInstance.post('/reset-password', { password });
            console.log(response.data);
            setErrorMessage('')
            setSuccessMessage("Password reset successful");
        } catch (error) {
           console.log(error)
        }
    };

    const validatePassword = (password: string): boolean => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
        return passwordRegex.test(password);
    };

    return (
        <div className='flex flex-col space-y-6'>
            <UserNav />
            <div className='flex space-x-6'>
                <Profiles />
                <form onSubmit={handleSubmit} className='flex flex-col space-y-6 justify-center px-72'>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        placeholder="New Password"
                        className='px-32 py-3 border border-gray-300 rounded'
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm Password"
                        className='px-32 py-3 border border-gray-300 rounded'
                    />
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                    {successMessage && <p className="text-green-500">{successMessage}</p>}
                    <button type="submit" className='px-4 py-2 bg-blue-600 text-white rounded'>
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;
