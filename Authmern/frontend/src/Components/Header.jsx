import React from "react";
import Avatar from "@mui/material/Avatar";
import  './header.css'

export const Header = () => {
  return (
    <>
      <header>
        <nav>
          <h1>RK Cloud</h1>
          <div className="avtar">
            <Avatar style={{backgroundColor:"green"}}>R</Avatar>
          </div>
        </nav>
      </header>
    </>
  );
};
