import React, { useState } from "react";
import { Link } from "react-router-dom";
import ErrorBox from "../components/ErrorBox";
import LoadingBox from "../components/LoadingBox";
import SuccessBox from "../components/SuccessBox";
import { signup } from "../helper/authCalls";
import moment from "moment";

function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
    loading: false,
  });

  const { name, email, password, error, success, loading } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signup({
      name,
      email,
      password,
      image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`,
    })
      .then((data) => {
        console.log(data);

        if (data.error) {
          setValues({
            ...values,
            error: data.error,
            success: false,
            loading: false,
          });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
            loading: false,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="app">
      <form onSubmit={handleSubmit} className="signup-form">
        <h1>Sign up</h1>
        <span>
          Trust us with your information. We don't share it and it's encrypted.
        </span>
        {loading ? <LoadingBox /> : <></>}
        {success ? (
          <SuccessBox>
            New Account Created. Please <Link to="/login">Login</Link>
          </SuccessBox>
        ) : (
          <></>
        )}
        {error ? <ErrorBox err={error} /> : <></>}
        <label>Name</label>
        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={handleChange("name")}
        />
        <label>Email</label>
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={handleChange("email")}
        />
        <label>Password</label>
        <input
          value={password}
          type="password"
          placeholder="Password"
          onChange={handleChange("password")}
        />
        <div style={{ textAlign: "center" }}>
          <h3>
            Have an account?{" "}
            <Link to="/login" style={{ textDecoration: "none" }}>
              Login
            </Link>
          </h3>
        </div>
        <button>SIGNUP</button>
      </form>
    </div>
  );
}

export default Signup;
