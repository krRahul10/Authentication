import React, { useEffect } from "react";

export const Dashboard = () => {

  const DashBoardValid = async () => {

    const token = JSON.parse(localStorage.getItem("usersdatatoken"));
    // console.log("tokenJSON",token)

    const res = await fetch("http://localhost:8080/validuser", {
      method: "GET",
      headers: {
        "authorization": token,
        'Content-Type': 'application/json'
      }
    });

    const data = await res.json();
    console.log("data", data);
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
        <h1>User Email:Rahul@gmail.com</h1>
      </div>
    </div>
  );
};
