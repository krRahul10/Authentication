import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../ContextProvider/Context";

export const Dashboard = () => {
  const { logindata, setLoginData } = useContext(LoginContext);
  const history = useNavigate();

  const DashBoardValid = async () => {
    const token = JSON.parse(localStorage.getItem("usersdatatoken"));

    const res = await fetch("http://localhost:8080/validuser", {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!data || data.status === 401) {
      console.log("error page redirect");
      history("*");
    } else {
      //   console.log("user verify");
      setLoginData(data);
      history("/dashboard");
    }
  };

  useEffect(() => {
    DashBoardValid();
  }, []);
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItem: "center",
          margin: "30px 0px 0px 35%",
        }}
      >
        <img
          src="./man.png"
          alt=""
          style={{ width: "300px", height: 200, marginTop: "20px" }}
        />
        <h1>User Email: {logindata ? logindata.validUserOne.email : ""}</h1>
      </div>
    </div>
  );
};
