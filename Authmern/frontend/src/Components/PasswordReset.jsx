import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';

export const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(false);

  const setVal = (e) => {
    setEmail(e.target.value);
  };

  const senLink = async (e) => {
    e.preventDefault();
    const res = await fetch("https://authentication432.herokuapp.com/sendpasswordlink", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });
    const data = await res.json()
    if(data.status===201){
      setEmail("")
      setMessage(true)
    }else{
      Toast.error("Invalid User")
    }
  };

  return (
    <div>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Enter Your Email</h1>
          </div>
          {message ? (
            <p style={{ color: "green", fontWeight: "bold" }}>
              password reset link send Successfully on your Email
            </p>
          ) : (
            ""
          )}

          <form>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                value={email}
                onChange={setVal}
                placeholder="Enter Your Email Address"
              />
            </div>

            <button className="btn" onClick={senLink}>
              SEND
            </button>
          </form>
          <ToastContainer/>
        </div>
      </section>
    </div>
  );
};
