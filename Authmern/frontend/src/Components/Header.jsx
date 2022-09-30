import React, { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import "./header.css";
import { LoginContext } from "../ContextProvider/Context";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export const Header = () => {
  const { logindata, setLoginData } = useContext(LoginContext);
  // console.log(logindata.validUserOne.fname);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <header>
        <nav>
          <h1>RK Cloud</h1>
          <div className="avtar">
            {logindata.validUserOne ? (
              <Avatar style={{ backgroundColor: "teal" }} onClick={handleClick}>
                {logindata.validUserOne.fname[0].toUpperCase()}
              </Avatar>
            ) : (
              <Avatar style={{ backgroundColor: "green" }} onClick={handleClick} />
            )}
            {/* <Avatar style={{ backgroundColor: "green" }}>R</Avatar> */}
          </div>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </nav>
      </header>
    </>
  );
};
