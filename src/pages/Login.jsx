import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import googleLogo from '../assets/google-logo.svg';
import fbLogo from '../assets/facebook-log.svg';

export default function Login() {
    const [role, setRole] = useState('user');
    const [errorMessage, setErrorMessage] = useState('');
    const { signUpWithGmail, login, user } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    const handleRegister = () => {
        signUpWithGmail()
            .then(() => {
                navigate(from, { replace: true });
            })
            .catch((error) => console.log(error));
    };

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        login(email, password)
            .then(() => {
                if (role === 'admin') {
                    navigate('/admin/dashboard', { replace: true });
                } else {
                    navigate(from, { replace: true });
                }
            })
            .catch((error) => {
                setErrorMessage(error.message);
            });
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <div>
                            <h1 className="text-3xl font-semibold">Please Login</h1>
                        </div>
                        <div className="divide-y divide-gray-200">
                            <select
                                className="mb-4 p-2 border border-gray-300 rounded"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                            <form onSubmit={handleLogin} className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <div className="relative">
                                    <input id="email" name="email" type="text" className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600" placeholder="Email address" required />
                                </div>
                                <div className="relative">
                                    <input id="password" name="password" type="password" className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600" placeholder="Password" required />
                                </div>
                                {errorMessage && (
                                    <p className="text-red-500 text-sm">Email or Password is not valid!</p>
                                )}
                                {role === 'user' && (
                                    <p className="text-base mt-1">If you don't have an account, please create one here <Link to="/create-user" className="underline text-blue-600">Sign Up</Link></p>
                                )}
                                <div className="relative">
                                    <button type='submit' className="bg-blue-500 text-white rounded px-6 py-1">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {role === 'user' && (
                        <div>
                            <hr />
                            <div className="flex w-full items-center flex-col mt-5 gap-3">
                                <button onClick={handleRegister} className='block'>
                                    <img src={googleLogo} alt="Google Logo" className='w-12 h-12 inline-block' />
                                    Log in with Google
                                </button>
                                <button>
                                    <img src={fbLogo} alt="Facebook Logo" className='w-10 h-10 inline-block mr-1' />
                                    Log in with Facebook
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
