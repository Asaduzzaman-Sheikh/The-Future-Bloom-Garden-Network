import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSignupUserMutation } from '../redux/features/auth/authApi';

export const SignUp = () => {
    const [userName, setUserName] = useState('')
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const[signupUser, {isLoading}] = useSignupUserMutation();
    const navigate = useNavigate();

    // Handle signUp....
    const handleSignUp = async (e) => {
        e.preventDefault();
        console.log('Form Data:', { userName, email, password }); 
        const data = {
            username: userName,
            email,
            password,
        };
        // console.log('Login Data:', data); 
        try {
            const response = await signupUser(data).unwrap();
            // console.log('Sign Up successful:', response); // Debugging log
            alert('Sign up successful!');
            navigate('/login'); // Navigate after handling the response
        } catch (error) {
            console.error('Sign Up error:', error); // Log the error for debugging
            setMessage(error?.data?.message || 'Sign up failed!');
        }
        
        
    };

    return (
        <section className="h-screen flex items-center justify-center">
            <div className="max-w-sm border shadow-md bg-white mx-auto p-8 rounded-md ">
                <h2 className="text-2xl font-semibold pt-5">Sign Up Here</h2>
                <form onSubmit={handleSignUp} className="space-y-5 mx-w-sm mx-auto pt-8">
                <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Provide User Name"
                        required
                        className="w-full bg-gray-100 focus:outline-none px-5 py-3 rounded-md"
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="email@gmail.com"
                        required
                        className="w-full bg-gray-100 focus:outline-none px-5 py-3 rounded-md"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="password"
                        required
                        className="w-full bg-gray-100 focus:outline-none px-5 py-3 rounded-md"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {message && <p className="text-red-500">{message}</p>}
                    <button
                        type="submit"
                        className="w-full mt-5 bg-primary text-white hover:bg-indigo-500 font-medium py-3 rounded-md"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="my-5 italic text-sm text-center">
                    Already Have an Account?{' '}
                    <Link to="/login">
                        <span className="hover:text-blue-500">Login </span> Here
                    </Link>
                </p>
            </div>
        </section>
    );
};
