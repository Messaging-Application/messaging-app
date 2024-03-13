import '../index.css'
import { useState, useContext } from "react";
import React from 'react';
import { UserContext } from "./UserProvider";
import { UserContextType, ProfileProps, UserData } from "../types";
import { 
  validateEmail, 
  validatePassword,  
  passwordsMatch,
  validateName,  
  togglePasswordConfirm
} from "../utils";

const Profile: React.FC<ProfileProps> = ({ showUser }) => {
  // Context to access user data and set user
  const { setUser } = useContext(UserContext) as UserContextType;

  // Retrieve user data from localStorage
  const userString = localStorage.getItem("user");
  let user: UserData | null = userString ? JSON.parse(userString) : null;
  const currentUser = user;
  // If showUser is provided, override the user data. A different user should be displayed.
  if (showUser && typeof showUser === 'object') {
    user = showUser as UserData;
  }

  // State variables for form inputs and error message
  const [username] = useState<string>(user?.username || '');
  const [firstname, setFirstname] = useState<string>(user?.firstName || '');
  const [lastname, setLastname] = useState<string>(user?.lastName || '');
  const [email, setEmail] = useState<string>(user?.email || '');
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  // Event handlers for input changes
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

  // Event handler for deleting account
  const deleteAccount = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      // Send DELETE request to delete user account
      const response = await fetch("http://localhost:8081/user/delete/" + user?.id, {
        method: 'DELETE',
        credentials: "include", 
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("jwt"),
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        // Account deleted successfully
        // If it's not admin deleting someone else
        // Remove user and jwt from local storage
        if (!(currentUser?.roles.includes("ROLE_ADMIN") && showUser && typeof showUser === 'object')) {
          localStorage.removeItem('user');
          localStorage.removeItem('jwt');
          setUser(null);
        }
        window.location.reload();
      } else {
        // Handle error response
        setSuccessMessage("");
        setErrorMessage('Failed to delete account');
        console.error('Failed to delete account');
      }
    } catch (error) {
      // Handle network errors
      setSuccessMessage("");
      setErrorMessage('Failed to delete account');
      console.error('Network error:', error);
    }
  }
  // Event handler for submitting profile updates
  const submitHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // Validate form inputs
      validateName(firstname);
      validateName(lastname);
      validateEmail(email);
      validatePassword(password); 
      passwordsMatch(password, confirm);

      // if no errors, update user profile
      const body = {
        "password": password,
        "email": email,
        "firstName": firstname,
        "lastName": lastname
      };
      fetch("http://localhost:8081/user/edit/" + user?.id, {
        method: "PATCH",
        credentials: "include", 
        headers: { 
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + localStorage.getItem("jwt"), 
        },
        body: JSON.stringify(body),
      })
      .then((response) => {
        console.log('Response status code:', response.status); 
        if (!response.ok) {
          // Handle error response
          response.json().then(data => {
            setSuccessMessage("");
            setErrorMessage(data.message);
          })
          throw new Error("Failed to update profile");
        }
        // If it's not admin editing someone else
        if (!(currentUser?.roles.includes("ROLE_ADMIN") && showUser && typeof showUser === 'object')) {
          // Update localStorage and user context with updated user data
          if (userString) {
            const userJson = JSON.parse(userString);
            userJson.firstName = body.firstName;
            userJson.lastName = body.lastName;
            userJson.email = body.email;
            localStorage.removeItem('user');
            localStorage.setItem("user", JSON.stringify(userJson));
            setUser(null);
            setUser(userJson);
          }    
        }   
        setErrorMessage("");
        setSuccessMessage("Data updated successfully!");
      })
      .catch((err) => {
        console.error(err.message);
      });

    } catch (error: any) {
      // Handle the error
      console.error('An error occurred:', error.message);
      setSuccessMessage("");
      setErrorMessage(error.message);
    }

  };

  return (
    <>
    <div className="profileWrapper">
      <div className="justify-center px-6 py-12 lg:px-8">
        
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {/* Show error message if it exists */}
            {errorMessage !== "" && (
              <span id="message" style={{ color: "#AA0000", fontSize: "14px", display: "block", textAlign: "center" }} aria-live="assertive">
                {errorMessage}
              </span>
            )} 
            {/* Show updated*/}
            {successMessage !== "" && (
              <span id="message" style={{ color: "green", fontSize: "14px", display: "block", textAlign: "center" }} aria-live="assertive">
                {successMessage}
              </span>
            )} 
          <form className="space-y-6" action="#" method="POST">
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
                  autoComplete="username"
                  readOnly
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
                    aria-label="Firstname"
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
                    aria-label="Lastname"
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
                  aria-label="Email"
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
                  aria-label="Password"
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
                <label htmlFor="confirm" className="block text-sm font-medium leading-6 text-gray-900" >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  aria-label="Confirm Password"
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
                {/* if checked, show/hide password */}
                <div className="flex mt-4">
                  <input data-hs-toggle-password='{
                      "target": "#password, #confirm"
                    }' onChange={togglePasswordConfirm} id="hs-toggle-password-checkbox" type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded"/>
                  <label htmlFor="hs-toggle-password-checkbox" className="text-sm text-gray-500 ms-3 dark:text-gray-400" aria-label="Show Password">Show password</label>
                </div>
                
              </div>
            </div>

            {/* if pressed, submit form */}
            <div>
              <button
                type="submit"
                onClick={submitHandler}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Update
              </button>
            </div>

            {/* if pressed, delete account */}
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
      </div>
    </>
  )
}

export default Profile;
