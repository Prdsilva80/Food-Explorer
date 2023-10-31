import React, { useState, useEffect, createContext, useContext } from "react";
import { api } from "../services/api";

const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [data, setData] = useState({});
    const [meals, setMeals] = useState([]);

    const setTokenHeader = (token) => {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    };

    const signIn = async ({ email, password }) => {
        try {
            const response = await api.post("/sessions", { email, password });
            const { user, token } = response.data;

            localStorage.setItem("@foodexplorer:user", JSON.stringify(user));
            localStorage.setItem("@foodexplorer:token", token);

            setTokenHeader(token);
            setData({ user, token });

        } catch (error) {
            console.error(error);
        }
    }

    const signOut = () => {
        localStorage.removeItem("@foodexplorer:token");
        localStorage.removeItem("@foodexplorer:user");
        setTokenHeader(null);

        setData({});
    }

    const searchForMeal = async (search) => {
        const response = await api.get(`/meals?name=${search}`);
        setMeals(response.data);
    }

    useEffect(() => {
        const token = localStorage.getItem("@foodexplorer:token");
        const user = localStorage.getItem("@foodexplorer:user");

        if (token && user) {
            setTokenHeader(token);
            setData({
                token,
                user: JSON.parse(user),
            });
        }
    }, []);

    return (
        <AuthContext.Provider value={{
            signIn,
            signOut,
            user: data.user,
            meals,
            searchForMeal,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);
    return context;
}

export { AuthProvider, useAuth };
