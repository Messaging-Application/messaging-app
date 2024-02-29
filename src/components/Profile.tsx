import '../index.css'
import { useState } from "react";
import React from 'react';
import { 
  validateEmail, 
  validatePassword,  
  validateUsername,  
  passwordsMatch,
  validateName,  
} from "../utils";

const Profile: React.FC = () => {

  const [username, setUsername] = useState<string>("session");
  const [firstname, setFirstname] = useState<string>("session");
  const [lastname, setLastname] = useState<string>("session");
  const [email, setEmail] = useState<string>("session");
  const [password, setPassword] = useState<string>("session");
  const [confirm, setConfirm] = useState<string>("session");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const usernameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };
  const firstnameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstname(event.target.value);
  };
  const lastnameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastname(event.target.value);
  };
  const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const passwordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const confirmChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirm(event.target.value);
  };

  const deleteAccount = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/auth/profile', {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer <your_access_token>',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          // Additional data if needed
        })
      });
  
      if (response.ok) {
        // Account deletion successful
        console.log('Account deleted successfully');
      } else {
        // Handle error response
        setErrorMessage('Failed to delete account');
        console.error('Failed to delete account');
      }
    } catch (error) {
      // Handle network errors
      setErrorMessage('Failed to delete account');
      console.error('Network error:', error);
    }
  }
  const submitHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setErrorMessage("");

    try {
      validateUsername(username);
      validateName(firstname);
      validateName(lastname);
      validateEmail(email);
      validatePassword(password); 
      passwordsMatch(password, confirm);
      // if no errors
      const body = {
        username,
        password,
        email,
        firstname,
        lastname
      };
      console.log(body);
      fetch("http://localhost:8080/auth/profile", {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          'Authorization': 'Bearer <your_access_token>', 
        },
        body: JSON.stringify(body),
      })
      .then((response) => {
        console.log('Response status code:', response.status); 
        if (!response.ok) {
          setErrorMessage("Username already exists");
          throw new Error("Failed to update profile");
        }
        // Handle success
        // setUser(body);
        // Redirect user to profile page
        window.location.href = "/profile";
      })
      .catch((err) => {
        console.error(err.message);
      });

    } catch (error: any) {
      // Handle the error
      console.error('An error occurred:', error.message);
      setErrorMessage(error.message);
    }

  };

  function togglePassword() {
    const passwordField = document.getElementById("password") as HTMLInputElement | null;
    const confirmField = document.getElementById("confirm") as HTMLInputElement | null;
    const checkBox = document.getElementById("hs-toggle-password-checkbox") as HTMLInputElement | null;
  
    if (passwordField && checkBox) {
      if (checkBox.checked) {
        passwordField.type = "text";
      } else {
        passwordField.type = "password";
      }
    }
    if (confirmField && checkBox) {
      if (checkBox.checked) {
        confirmField.type = "text";
      } else {
        confirmField.type = "password";
      }
    }
  }
  return (
    <>
      <div className="justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Edit your account
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
                  className="fade-in block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div style={{ display: 'flex' }}>

            <div style={{ width: '50%' }}>

                <label htmlFor="firstname" className="block text-sm font-medium leading-6 text-gray-900">
                  Firstname
                </label>
                <div className="mt-2">
                  <input
                    id="firstname"
                    name="firstname"
                    type="text"
                    value={firstname}
                    onChange={firstnameChangeHandler}
                    autoComplete="firstname"
                    required
                    placeholder="Enter firstname"
                    className="fade-in block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                </div>
            <div style={{ width: '50%'}}>


                <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-gray-900">
                  Lastname
                </label>
                <div className="mt-2">
                  <input
                    id="lastname"
                    name="lastname"
                    type="text"
                    value={lastname}
                    onChange={lastnameChangeHandler}
                    autoComplete="lastname"
                    required
                    placeholder="Enter lastname"
                    className="fade-in block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                </div>

            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={emailChangeHandler}
                  autoComplete="email"
                  required
                  placeholder="Enter email"
                  className="fade-in block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  className="fade-in block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="confirm" className="block text-sm font-medium leading-6 text-gray-900">
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirm"
                  name="password"
                  type="password"
                  value={confirm}
                  onChange={confirmChangeHandler}
                  autoComplete="current-password"
                  required
                  placeholder="Confirm password"
                  className="fade-in block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                
                <div className="flex mt-4">
                  <input data-hs-toggle-password='{
                      "target": "#password, #confirm"
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
                Update
              </button>
             
            </div>
            <button
                style={{ color: "#4F46E5", background: "white", borderColor: "#4F46E5" }}                
                type="submit"
                onClick={deleteAccount}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Delete account
              </button>
          </form>
          
        </div>
      </div>
    </>
  )
}

export default Profile;