import React, { useState } from 'react';
import { 
  validateEmail, 
  validatePassword,  
  validateUsername,  
  passwordsMatch,
  validateName,  
  togglePasswordConfirm
} from "../utils";
import '../index.css';

const Register: React.FC = () => {

  // State variables for form inputs and error message
  const [username, setUsername] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Event handlers for input changes
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

  // Event handler for form submission
  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // Validate form inputs
      setErrorMessage("");
      validateUsername(username);
      validateName(firstname);
      validateName(lastname);
      validateEmail(email);
      validatePassword(password); 
      passwordsMatch(password, confirm);

      // if no errors, submit the form
      const body = {
        "username": username,
        "password": password,
        "email": email,
        "firstName": firstname,
        "lastName": lastname
      };
      fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      .then((response) => {
        console.log('Response status code:', response.status); 
        if (!response.ok) {
          // If there's an error, set the error message
          response.json().then(data => {
            setErrorMessage(data.message);
          }).catch((err) => {
            console.error("Error parsing JSON response:", err);
            setErrorMessage("Failed to register.");
          });
          throw new Error("Failed to register");
        }
        // Redirect user to login page after successful registration
        window.location.href = "/";
      })
      .catch((err) => {
        console.error(err.message);
        setErrorMessage("Failed to register.");
      });
    } catch (error: any) {
      // Handle the error
      console.error('An error occurred:', error.message);
      setErrorMessage(error.message);
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
          {/* <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create an account
          </h2> */}
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {/* Show error message if it exists */}
            {errorMessage !== "" && (
              <span id="message" style={{ color: "#AA0000", fontSize: "14px", display: "block", textAlign: "center" }} aria-live="assertive">
                {errorMessage}
              </span>
            )} 
          <form className="space-y-6" action="#" method="POST" onSubmit={submitHandler}>
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
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="confirm" className="block text-sm font-medium leading-6 text-gray-900">
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <a href="/" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  )
}

export default Register;
