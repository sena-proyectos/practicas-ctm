import { Routes, Route } from "react-router-dom";

import { Form } from "../components/Login";

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/login" element={<Form />} />
    </Routes>
  );
};
