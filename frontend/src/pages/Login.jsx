import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegister, setIsRegister] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const endpoint = isRegister ? '/auth/register' : '/auth/login';
            const { data } = await API.post(endpoint, { email, password });
            
            // Token save karein aur Dashboard par bhej dein
            localStorage.setItem('token', data.token);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    {isRegister ? 'Create Account' : 'Login'}
                </h2>
                {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        required
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={email} onChange={(e) => setEmail(e.target.value)} 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        required
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={password} onChange={(e) => setPassword(e.target.value)} 
                    />
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                        {isRegister ? 'Register' : 'Login'}
                    </button>
                </form>
                
                <p className="mt-4 text-center text-sm text-gray-600">
                    {isRegister ? 'Already have an account? ' : 'Need an account? '}
                    <span 
                        className="text-blue-600 cursor-pointer font-semibold"
                        onClick={() => setIsRegister(!isRegister)}
                    >
                        {isRegister ? 'Login here' : 'Register here'}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;