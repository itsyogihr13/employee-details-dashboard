import React from "react";
import { Routes, Route } from "react-router-dom";
import { Registration } from "./Components/Registration";
export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Registration />} />
    </Routes>
  );
};
