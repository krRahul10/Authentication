import { Header } from "./Components/Header";
import { Login } from "./Components/Login";
import { Route, Routes } from "react-router-dom";
import { Register } from "./Components/Register";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
