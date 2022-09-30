import { Header } from "./Components/Header";
import { Login } from "./Components/Login";
import { Route, Routes } from "react-router-dom";
import { Register } from "./Components/Register";
import { Dashboard } from "./Components/Dashboard";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
