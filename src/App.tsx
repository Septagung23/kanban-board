import Main from "./pages/Main";
import User from "./pages/User";
import Login from "./pages/Login";
import Client from "./pages/Client";
import Project from "./pages/Project";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import CreateClient from "./pages/CreateClient";
import UpdateClient from "./pages/UpdateClient";
import CreateProject from "./pages/CreateProject";
import UpdateProject from "./pages/UpdateProject";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PersistLogin from "./components/PersistenLogin";
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
          <Route element={<PersistLogin />}>
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<Project />} />
              <Route path="/client" element={<Client />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/user" element={<User />} />
              <Route path="/board/:id" element={<Main />} />
              <Route path="/create-project" element={<CreateProject />} />
              <Route path="/project/:id" element={<UpdateProject />} />
              <Route path="/create-client" element={<CreateClient />} />
              <Route path="/client/:id" element={<UpdateClient />} />
            </Route>
          </Route>
          <Route path="*" element={<Login />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
