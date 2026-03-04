import { Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";
import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./screens/dashboard/Dashboard";

import Configuracoes from "./screens/configuracoes/Configuracoes";
import PublicLayout from "./layout/PublicLayout";
import Login from "./screens/login/Login";
import Unauthorized from "./screens/Unauthorized";
import ProtectedRoute from "./routes/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Users from "./screens/usuarios/Users";
import Movimentos from "./screens/moviments/Movimentos";

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* --- Rotas públicas --- */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Login />} />
          </Route>

          {/* --- Página de acesso negado --- */}
          <Route path="unauthorized" element={<Unauthorized />} />

          {/* --- Rotas protegidas --- */}

          <Route element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
           
            <Route path="movimentos" element={<Movimentos />} />

            <Route path="users" element={<Users />} />
            <Route path="configuracoes" element={<Configuracoes />} />
          </Route>

        </Routes>
      </Suspense>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
