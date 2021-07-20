import React, { useState, createContext, useEffect } from "react";
const { backendUrlBase } = require('../config');


export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [username, setUsername] = useState("");
  
    useEffect(() => {
        const url = `${backendUrlBase}/auth/status`;
        const token = localStorage.getItem("token");
        if (token) {
            fetch(url, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  authorization: `Bearer ${token}`,
                },
            })
            .then((res) => res.json())
            .then((data) => {
              setUsername(data.username);
            });
        }
        
    });
  
    return (
      <AuthContext.Provider value={{ username }}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;

