import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoginUserMutation } from '../redux/features/auth/authApi';
import { setUser } from '../redux/features/auth/authSlice';
import { use } from 'react';

export const LogIn = () => {
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation();
    
    const navigate = useNavigate();
    //console.log('loginUser:', loginUser);
    // Handle login....
    const handleLogIn = async (e) => {
        e.preventDefault();
        const data = {
            email,
            password,
        };
        // console.log('Login Data:', data); 
        try {
            const response = await loginUser(data).unwrap();
            // Handle successful login, e.g., dispatch an action or redirect
            // console.log('Login successful:', response);
            console.log(response);
            const {token, user} = response;
            dispatch(setUser({user}));
            alert('Login successful!');
            navigate("/");
        } catch (error) {
            setMessage(error.data?.message || 'Login failed. Please try again.');
        }
        
    };

    return (
        <section className="h-screen flex items-center justify-center">
            <div className="max-w-sm border shadow-md bg-white mx-auto p-8 rounded-md ">
                <h2 className="text-2xl font-semibold pt-5">Login Here</h2>
                <form onSubmit={handleLogIn} className="space-y-5 mx-w-sm mx-auto pt-8">
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
                        Login
                    </button>
                </form>
                <p className="my-5 italic text-sm text-center">
                    Don't Have an Account?{' '}
                    <Link to="/signup">
                        <span className="hover:text-blue-500">Sign Up</span> Here
                    </Link>
                </p>
            </div>
        </section>
    );
};
