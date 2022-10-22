import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../ContextProvider/Context";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export const Dashboard = () => {
  const { logindata, setLoginData } = useContext(LoginContext);
  const [data, setData] = useState(false);
  const history = useNavigate();

  const DashBoardValid = async () => {
    const token = JSON.parse(localStorage.getItem("usersdatatoken"));

    const res = await fetch("https://authentication432.herokuapp.com/validuser", {
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
    setTimeout(() => {
      DashBoardValid();
      setData(true);
    }, 3000);
  }, []);
  return (
    <div>
      {data ? (
        <>
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
        </>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            Loading.... &nbsp;
            <CircularProgress />
          </Box>
        </>
      )}
    </div>
  );
};
