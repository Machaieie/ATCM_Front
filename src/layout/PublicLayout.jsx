import React from "react";
import driftBg from "../assets/drift.jpg"; // ajusta o caminho
import Login from "../screens/login/Login"

const PublicLayout = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${driftBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* Overlay escuro */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
        }}
      />

      {/* Conteúdo acima do overlay */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <Login />
      </div>
    </div>
  );
};

export default PublicLayout;