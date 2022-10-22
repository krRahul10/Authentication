import React from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./mix.css";

export const Register = () => {
  const history = useNavigate();
  const [passShow, setPassShow] = useState(false);
  const [cpassShow, setCPassShow] = useState(false);
  const [inpval, setInpval] = useState({
    fname: "",
    email: "",
    password: "",
    cpassword: "",
  });
  // console.log(inpval)

  const setVal = (e) => {
    const { name, value } = e.target;
    setInpval(() => {
      return {
        ...inpval,
        [name]: value,
      };
    });
  };

  const addUserData = async (e) => {
    e.preventDefault();
    const { fname, email, password, cpassword } = inpval;

    if (fname === "") {
      alert("please enter your name");
    } else if (email === "") {
      alert("please enter your email");
    } else if (!email.includes("@")) {
      alert("please enter valid email");
    } else if (password === "") {
      alert("please enter your password");
    } else if (password.length < 4) {
      alert("password must be 4 char");
    } else if (cpassword === "") {
      alert("confirm your password");
    } else if (cpassword.length < 4) {
      alert("confirm password must be 4 char");
    } else {
      const res = await fetch("https://authentication432.herokuapp.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fname,
          email,
          password,
          cpassword,
        }),
      });

      const data = await res.json();
      // console.log("data", data)
      if (data.status === 201) {
        alert("user registration successfully");
        history("/");
        setInpval({
          ...inpval,
          fname: "",
          email: "",
          password: "",
          cpassword: "",
        });
      }
      // alert("user registration successfully");
    }
  };

  return (
    <div>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Sign Up</h1>
            <p style={{ textAlign: "center" }}>
              We are glad that you will be using Project Cloud to manage your
              tasks!We hope that you will get like it.
            </p>
          </div>

          <form onSubmit={addUserData}>
            <div className="form_input">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="fname"
                id="fname"
                value={inpval.fname}
                onChange={setVal}
                placeholder="Enter Your Name"
              />
            </div>
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
            <div className="form_input">
              <label htmlFor="password">Confirm Password</label>
              <div className="two">
                <input
                  type={!cpassShow ? "password" : "text"}
                  name="cpassword"
                  id="cpassword"
                  value={inpval.cpassword}
                  onChange={setVal}
                  placeholder="Enter Your Password"
                />
                <div
                  className="showpass"
                  onClick={() => setCPassShow(!cpassShow)}
                >
                  {!cpassShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>
            <button className="btn" onClick={() => addUserData}>
              Sign UP
            </button>
            <p>
              Already have an account? <NavLink to="/">Log in</NavLink>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
};
