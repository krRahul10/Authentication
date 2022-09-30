import { Header } from "./Components/Header";
import { Login } from "./Components/Login";
import { Route, Routes } from "react-router-dom";
import { Register } from "./Components/Register";
import { Dashboard } from "./Components/Dashboard";
import { Error } from "./Components/Error";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
