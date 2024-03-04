import React, { useState } from 'react';
import { toast } from 'react-toastify';
import API from '../utils/API';

const LoginModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({name: "", password: ""});
  const [token, setToken] = useState({name: "", password: ""});

    const handleClose = () => {
        onClose();
    };

    const handleInput = ({ name, value }) => {
        setFormData((data) => ({ ...data, [name]: value }));
    }

    const submitForm = async() => {
        try {
            // validation
            if(formData.name === "" || formData.password === ""){
                toast.error("Please fill in all fields");
            } else {
                // console.log("Submitted");
                // submit form
                const response = await API.post('/tenant/login', formData);
                if(response.status === 200){
                    localStorage.setItem('token', response.data.token)
                    localStorage.setItem('tenant-slug', response.data.tenant.slug)
                } else {
                    toast.error("Could not log you in.");
                }
                handleClose();
            }
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    }

    return (
        <>
        {isOpen && (
            <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
            <div className="relative bg-gray-900 rounded-lg w-150 p-6">
                <button
                className="absolute top-2 right-2 text-gray-400 hover:text-white focus:outline-none"
                onClick={handleClose}
                >
                <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
                </button>
                <div className="flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-md w-full space-y-8">
                        <div>
                        <h2 className="text-center text-3xl font-extrabold text-white">Sign in to your account</h2>
                        </div>
                        <form className="mt-8 space-y-6">
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div className='mb-3'>
                                    <label htmlFor="tenant-name" className="sr-only">Tenant Name</label>
                                    <input
                                        id="tenant-name"
                                        name="name"
                                        type="name"
                                        value={formData.name}
                                        onChange={ e => handleInput({ name: "name", value: e.target.value })}
                                        autoComplete="name"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-500 placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                        placeholder="Name"
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="password" className="sr-only">Password</label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={ e => handleInput({ name: "password", value: e.target.value })}
                                        autoComplete="password"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-500 placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                        placeholder="Password"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="button"
                                    onClick={submitForm}
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >Sign in</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            </div>
        )}
        </>
    );
};

export default LoginModal;
