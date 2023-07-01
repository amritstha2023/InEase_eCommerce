import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        { email, password }
      );
      if (res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));

        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong..");
    }
    // console.log(name, email, password, phone, address);
    toast.success("Login Successfully");
  };

  return (
    <Layout title={"InEase-Login"}>
      <div className="form-container">
        <h1>Login Page</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3"></div>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputname"
              placeholder="Enter Your Email."
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password."
              required
            />
          </div>
          <div className="mb-3">
            <p
              className="text-muted text-end"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot Password
            </p>
          </div>

          <button type="submit" className="btn btn-outline-primary w-100">
            LOGIN
          </button>
          <div className="mt-3">
            <hr />
            <p className="text-muted text-center">Don't have account yet? <Link to="/register">Create One</Link></p>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
