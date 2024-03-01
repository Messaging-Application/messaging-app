import '../index.css'

import { useState, useContext } from "react";
import React from 'react';
import { UserContext } from "./UserProvider";
import {
  UserContextType,
} from "../types";
import axios from 'axios';

const Login: React.FC = () => {
  const { setUser } = useContext(UserContext) as UserContextType;

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const usernameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const passwordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

const submitHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setErrorMessage("");
    if (username && password) {
      const body = {
        "username": username,
        "password": password,
      };
      axios.defaults.withCredentials = true;
      try {
        await axios.post('http://localhost:8080/auth/login', body, {
          withCredentials: true,
          headers: { crossDomain: true, 'Content-Type': 'application/json', 'Accept': '*/*',
          'credentials': 'include' },
        }).then(response => {
            setUser(response.data);
            localStorage.setItem("user", JSON.stringify(response.data));
            const cookie = getCookieValue('ChatApp');
            if (cookie) {
              localStorage.setItem("jwt", cookie);
            }
            window.location.href = "/chat";
        });
      } catch (error: any) {
        console.error('Error:', error);
        setErrorMessage("Failed to login");
      }
    }
}   
  
  const togglePassword = () => {
    const passwordField = document.getElementById("password") as HTMLInputElement | null;
    const checkBox = document.getElementById("hs-toggle-password-checkbox") as HTMLInputElement | null;
  
    if (passwordField && checkBox) {
      if (checkBox.checked) {
        passwordField.type = "text";
      } else {
        passwordField.type = "password";
      }
    }
  }
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {errorMessage !== "" && (
              <span id="message" style={{ color: "#AA0000", fontSize: "14px", display: "block", textAlign: "center" }}>
                {errorMessage}
              </span>
            )} 
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
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
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
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
                
                <div className="flex mt-4">
                  <input data-hs-toggle-password='{
                      "target": "#password"
                    }' onChange={togglePassword} id="hs-toggle-password-checkbox" type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded"/>
                  <label htmlFor="hs-toggle-password-checkbox" className="text-sm text-gray-500 ms-3 dark:text-gray-400">Show password</label>
                </div>
                
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={submitHandler}
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
  )
}

export default Login;

function getCookieValue(cookieName: string) {
  const cookieString = document.cookie;
  const cookies = cookieString.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === cookieName) {
      return value;
    }
  }
  return null; 
}