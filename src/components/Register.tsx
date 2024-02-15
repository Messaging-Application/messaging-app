import '../index.css'

import { useState } from "react";

const Register: React.FC = () => {
  // const { setUser } = useContext(UserContext);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  // const [errorMessage, setErrorMessage] = useState<string>("");

  const usernameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const passwordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const confirmChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirm(event.target.value);
  };

  const submitHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    // const body = {
    //   username,
    //   password,
    //   confirm,
    // };

    // if (confirm != password) {
    //   setErrorMessage("Passwords don't match!");
    // } else {
    //   setErrorMessage("");
    // }
    // console.log(body);
    // fetch("https://localhost:5000/auth/register", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(body),
    // })
    // .then((response) => {
    //   if (!response.ok) {
    //     throw new Error("Failed to register");
    //   }
    //   // Handle success
    // })
    // .catch((err) => {
    //   console.error(err.message);
    // });
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
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create an account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {/* {errorMessage !== "" && (
              <span id="message" style={{ color: "#AA0000", fontSize: "14px", display: "block", textAlign: "center" }}>
                {errorMessage}
              </span>
            )} */}
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
