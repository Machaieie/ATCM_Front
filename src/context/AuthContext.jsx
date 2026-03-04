import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import http from "../httpCommom";
import SideRoute from "../routes/Routes";
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const login = async (username, password) => {
        try {
            const response = await http.post("auth/login", {
                username,
                password
            });

            if (response.status === 200) {
                const token = response.data.accessToken;
                
                const decodedUser = jwtDecode(token);
                console.log("",response)
                const user = decodedUser;
                
                const principal = {
                   token,
                   user

                };
                console.log("Decoded User:", decodedUser.sub);
                toast.success("Seja bem vindo "+user.sub+"!");
                localStorage.setItem("principal", JSON.stringify(principal));
                setUser(principal);
                setIsAuthenticated(true);

                const allowedRoutes = SideRoute(user.role);

                if (allowedRoutes.length > 0) {
                    navigate(allowedRoutes[0].link);
                } else {
                    navigate("/login");
                }
            }
        } catch (error) {
            toast.error("Utilizador ou senha inválidos");
        }
    };

    useEffect(() => {
        const loggedUser = localStorage.getItem("principal");
        if (loggedUser) {
            const parsed = JSON.parse(loggedUser);
            setUser(parsed);
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    const logout = async () => {
        await http.post("auth/logout", {}, { withCredentials: true });
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("principal");
        navigate("/login");
    };

    return (
        <>
            <AuthContext.Provider
                value={{
                    isAuthenticated,
                    user,
                    login,
                    logout,
                    loading
                }}
            >
                {children}
            </AuthContext.Provider>
            <ToastContainer />
        </>
    );
};