import { Routes, Route } from "react-router-dom";

import { Login } from "../components/Login";
import { Register } from "../components/register";

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};
