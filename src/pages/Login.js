import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ErrorBox from "../components/ErrorBox";
import LoadingBox from "../components/LoadingBox";
import { signin, authenticate, isAuthenticated } from "../helper/authCalls";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    didRedirect: false,
    loading: false,
  });

  const { email, password, error, didRedirect, loading } = values;

  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({
            ...values,
            error: data.error,
            email: "",
            password: "",
            loading: false,
          });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user) {
        return window.location.reload(true);
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  return (
    <div className="app">
      <form onSubmit={handleSubmit} className="signup-form">
        <h1>Log in</h1>
        {loading ? <LoadingBox /> : <></>}
        {error ? <ErrorBox err={error} /> : <></>}
        {performRedirect()}
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
            New to this site?{" "}
            <Link to="/signup" style={{ textDecoration: "none" }}>
              Signup
            </Link>
          </h3>
        </div>
        <button>LOGIN</button>
      </form>
    </div>
  );
}

export default Login;
