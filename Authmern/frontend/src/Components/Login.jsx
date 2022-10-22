import React from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./mix.css";

export const Login = () => {
  const history = useNavigate()
  const [passShow, setPassShow] = useState(false);
  const [inpval, setInpval] = useState({
    email: "",
    password: "",
  });
  // console.log(inpval);

  const setVal = (e) => {
    const { name, value } = e.target;
    setInpval(() => {
      return {
        ...inpval,
        [name]: value,
      };
    });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = inpval;

    if (email === "") {
      alert("please enter your email");
    } else if (!email.includes("@")) {
      alert("please enter valid email");
    } else if (password === "") {
      alert("please enter your password");
    } else if (password.length < 4) {
      alert("password must be 4 char");
    } else {
      // alert("User Login Successfully Done");
      const res = await fetch("https://authentication432.herokuapp.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();
      console.log("data", data);

      if (data.status === 201) {
        // console.log("token",data.result.token)
        localStorage.setItem("usersdatatoken", JSON.stringify(data.result.token));
        history("/dashboard")
        setInpval({ ...inpval, email: "", password: "" });
      }
    }
  };

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Welcome Back, Log In</h1>
            <p>Hi, we are you glad you are back. please login</p>
          </div>

          <form>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                value={inpval.email}
                onChange={setVal}
                placeholder="Enter Your Email Address"
              />
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  type={!passShow ? "password" : "text"}
                  name="password"
                  id="password"
                  value={inpval.password}
                  onChange={setVal}
                  placeholder="Enter Your Password"
                />
                <div
                  className="showpass"
                  onClick={() => setPassShow(!passShow)}
                >
                  {!passShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>
            <button className="btn" onClick={loginUser}>
              Login
            </button>
            <p>
              Don't have an Account? <NavLink to="/register">Sign Up</NavLink>
            </p>
            <p style={{color:"black", fontWeight:"bold"}}>
              Forgot Password <NavLink to="/password-reset">Click Here</NavLink>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};
