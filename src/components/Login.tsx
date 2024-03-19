import '../index.css';
import { useState, useContext } from 'react';
import React from 'react';
import { UserContext } from './UserProvider';
import { UserContextType } from '../types';
import { getCookie, togglePassword } from '../utils';
import axios, { AxiosResponse } from 'axios';

const Login: React.FC = () => {
  // Context to access user data and set user
  const { setUser } = useContext(UserContext) as UserContextType;

  // State variables for form inputs and error message
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Event handler for username input change
  const usernameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  // Event handler for password input change
  const passwordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  // Event handler for form submission
  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');

    // Check if username and password are provided
    if (username && password) {
      const body = {
        username: username,
        password: password,
      };
      axios.defaults.withCredentials = true;
      // Make POST request to login endpoint
      try {
        const response: AxiosResponse = await axios.post(
          'http://localhost:8080/auth/login',
          body,
          {
            withCredentials: true,
            headers: {
              crossDomain: true,
              'Content-Type': 'application/json',
              Accept: '*/*',
              credentials: 'include',
            },
          }
        );
        // Save user data and JWT token to local storage
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
        const cookie = getCookie('ChatApp');
        if (cookie) {
          localStorage.setItem('jwt', cookie);
        }
        // Redirect to chat page
        window.location.href = '/chat';
      } catch (error: any) {
        console.error('Error:', error);
        setErrorMessage('Failed to login');
      }
    }
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="../../public/logo.png"
            alt="ChatApp"
            style={{ height: "100px", width: "auto" }}
          />
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {/* Show error message if it exists */}
          {errorMessage !== '' && (
            <span
              id="message"
              style={{ color: '#AA0000', fontSize: '14px', display: 'block', textAlign: 'center' }}
              aria-live="assertive"
              role="alert"
            >
              {errorMessage}
            </span>
          )}

          <form className="space-y-6" onSubmit={submitHandler}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  aria-label="Username"
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={usernameChangeHandler}
                  autoComplete="username"
                  required
                  placeholder="Enter username"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input
                  aria-label="Password"
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={passwordChangeHandler}
                  autoComplete="current-password"
                  required
                  placeholder="Enter password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* if checked, show/hide password */}
            <div className="flex items-center">
              <input
                data-hs-toggle-password='{"target": "#password"}'
                onChange={togglePassword}
                id="hs-toggle-password-checkbox"
                type="checkbox"
                className="mt-0.5 border-gray-200 rounded"
              />
              <label htmlFor="hs-toggle-password-checkbox" className="text-sm text-gray-500 ms-3 dark:text-gray-400">
                Show password
              </label>
            </div>

            {/* if pressed, submit form */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <a href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Create an account
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
