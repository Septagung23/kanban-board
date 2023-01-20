import { useState, useEffect } from "react";
import "./App.css";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Project from "./pages/Project";
import Client from "./pages/Client";
import Register from "./pages/Register";
import CreateTask from "./pages/CreateTask";
import UpdateTask from "./pages/UpdateTask";
import CreateClient from "./pages/CreateClient";
import UpdateClient from "./pages/UpdateClient";
import CreateProject from "./pages/CreateProject";
import UpdateProject from "./pages/UpdateProject";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./routes/PrivateRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import { AuthProvider } from "./contexts/AuthContext";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<PublicRoutes />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Project />} />
            <Route path="/client" element={<Client />} />
            <Route path="/board" element={<Main />} />
            <Route path="/create-task" element={<CreateTask />} />
            <Route path="/edit-task/:id" element={<UpdateTask />} />
            <Route path="/create-project" element={<CreateProject />} />
            <Route path="/edit-project/:id" element={<UpdateProject />} />
            <Route path="/create-client" element={<CreateClient />} />
            <Route path="/client/:id" element={<UpdateClient />} />
          </Route>
          <Route path="*" element={<Login />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
