import { Header } from "./Components/Header";
import { Login } from "./Components/Login";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Register } from "./Components/Register";
import { Dashboard } from "./Components/Dashboard";
import { Error } from "./Components/Error";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "./ContextProvider/Context";
import { PasswordReset } from "./Components/PasswordReset";
import { ForgotPassword } from "./Components/ForgotPassword";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [data, setData] = useState(false);
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
      console.log("user not valid");
      // history("*");
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
    <>
      {data ? (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/password-reset" element={<PasswordReset />} />
            <Route path="/forgotpassword/:id/:token" element={<ForgotPassword />} />
            <Route path="/*" element={<Error />} />
          </Routes>
        </>
      ) : (
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
      )}
    </>
  );
}

export default App;
