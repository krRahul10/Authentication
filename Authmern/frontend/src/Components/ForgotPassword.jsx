import React from "react";
import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

export const ForgotPassword = () => {
  const { id, token } = useParams();
  const history = useNavigate();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(false);

  const userValid = async () => {
    const res = await fetch(
      `http://localhost:8080/forgotpassword/${id}/${token}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();

    if (data.status === 201) {
      console.log("user valid");
    } else {
      console.log("User Not verified");
      history("*");
    }
  };

  const setVal = (e) => {
    setPassword(e.target.value);
  };

  const sendPassword = async (e) => {
    e.preventDefault();
    const res = await fetch(`https://authentication432.herokuapp.com/${id}/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();

    if (data.status === 201) {
      // console.log("user valid");
      setPassword("")
      setMessage(true)
      
    } else {
      // console.log("User Not verified");
      alert("Token Expired generate new Link")
    }
  };
  useEffect(() => {
    userValid();
  }, []);
  return (
    <div>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Enter Your New pass word</h1>
          </div>

          <form>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={setVal}
                placeholder="Enter Your password"
              />
            </div>

            <button className="btn" onClick={sendPassword}>
              Done
            </button>
          </form>
          <ToastContainer />
        </div>
      </section>
    </div>
  );
};
