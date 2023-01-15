import { useState, useEffect } from "react";
import "./App.css";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Project from "./pages/Project";
import Register from "./pages/Register";
import CreateTask from "./pages/CreateTask";
import CreateClient from "./pages/CreateClient";
import CreateProject from "./pages/CreateProject";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./routes/PrivateRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import { CurrentUserProvider } from "./contexts/CurrentUserContext";

function App() {
  return (
    <BrowserRouter>
      <CurrentUserProvider>
        <Routes>
          <Route element={<PublicRoutes />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Project />} />
            <Route path="/board" element={<Main />} />
            <Route path="/create-task" element={<CreateTask />} />
            <Route path="/create-project" element={<CreateProject />} />
            <Route path="/create-client" element={<CreateClient />} />
          </Route>
          <Route path="*" element={<Login />} />
        </Routes>
      </CurrentUserProvider>
    </BrowserRouter>
  );
}

export default App;
