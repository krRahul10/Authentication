import React, { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import "./header.css";
import { LoginContext } from "../ContextProvider/Context";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { NavLink, useNavigate } from "react-router-dom";

export const Header = () => {
  const { logindata, setLoginData } = useContext(LoginContext);
  const history = useNavigate();
  // console.log(logindata.validUserOne.fname);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const goError = () => {
    history("*");
  };

  const goDash = () => {
    history("/dashboard");
  };

  const logoutUser = async () => {
    let token = JSON.parse(localStorage.getItem("usersdatatoken"));

    const res = await fetch("https://authentication432.herokuapp.com/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        Accept: "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();

    console.log("dataLogout",data)
    
    if (data.status === 201) {
      console.log("user logout");
      localStorage.removeItem("usersdatatoken");
      setLoginData(false);
      history("/");
    } else {
      console.log("error");
    }
  };
  return (
    <>
      <header>
        <nav>
          <h1>Rahul's AUTHENTICATION</h1>
          <NavLink to="/">Loging Page</NavLink>
          <div className="avtar">
            {logindata.validUserOne ? (
              <Avatar style={{ backgroundColor: "teal" }} onClick={handleClick}>
                {logindata.validUserOne.fname[0].toUpperCase()}
              </Avatar>
            ) : (
              <Avatar
                style={{ backgroundColor: "green" }}
                onClick={handleClick}
              />
            )}
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
            {logindata.validUserOne ? (
              <>
                <MenuItem
                  onClick={() => {
                    goDash();
                    handleClose();
                  }}
                >
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    logoutUser();
                    handleClose();
                  }}
                >
                  Logout
                </MenuItem>
              </>
            ) : (
              <MenuItem
                onClick={() => {
                  goError();
                  handleClose();
                }}
              >
                Profile
              </MenuItem>
            )}
          </Menu>
        </nav>
      </header>
    </>
  );
};
