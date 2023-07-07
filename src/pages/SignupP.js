import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "react-daisyui";

function SignupP() {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({});
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleOnChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/signup`, inputs)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSignupSubmit(event);
    }
  };

  return (
    <div>
      <div className="flex flex-row items-center h-screen w-70 bg-[#22A699]">
        <div className="justify-start max-h-screen ">
          <img
            className="h-screen shadow"
            src="https://res.cloudinary.com/dcslof4ax/image/upload/v1686861743/user-folder/qd7q49wamrdh7ng3uaaq.jpg"
            alt="Burger"
          />
        </div>
        <form
          className="p-16 ml-96 SignupPage"
          onSubmit={handleSignupSubmit}
          open="visible"
        >
          <div className="flex flex-row text-6xl text-white">
            Sign up now<p className="mx-4 rotate-45 mt-[4px]">!</p>
          </div>

          <div className="flex flex-col text-left">
            <label className="text-white">Email:</label>
            <Input
              borderOffset="true"
              type="email"
              name="email"
              value={inputs.email || ""}
              onChange={handleOnChange}
              required={true}
              onKeyDown={handleKeyDown}
            />

            <label className="text-white">Password:</label>
            <Input
              borderOffset="true"
              type="password"
              name="password"
              value={inputs.password || ""}
              onChange={handleOnChange}
              required={true}
              onKeyDown={handleKeyDown}
            />

            <label className="text-white">userName:</label>
            <Input
              type="text"
              borderOffset="true"
              name="username"
              value={inputs.username || ""}
              onChange={handleOnChange}
              required={true}
              onKeyDown={handleKeyDown}
            />

            <label className="text-white">first name:</label>
            <Input
              type="text"
              name="firstName"
              borderOffset="true"
              value={inputs.firstName || ""}
              onChange={handleOnChange}
              required={true}
              onKeyDown={handleKeyDown}
            />

            <label className="text-white">last name:</label>
            <Input
              type="text"
              name="lastName"
              value={inputs.lastName || ""}
              borderOffset="true"
              onChange={handleOnChange}
              required={true}
              onKeyDown={handleKeyDown}
            />

            <Button color="primary" className="mt-3" type="submit">
              Sign Up
            </Button>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="flex flex-row justify-between">
              <p>Already have an account?</p>
              <Link className="text-5xl" to="/login">
                {" "}
                Login
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupP;
