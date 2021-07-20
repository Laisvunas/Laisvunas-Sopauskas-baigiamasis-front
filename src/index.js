import React from "react";
import ReactDOM from "react-dom";
import Routes from "./routes/Routes";
import AuthProvider from "./contexts/authContext";

ReactDOM.render(
    <React.StrictMode>

        <Routes />

    </React.StrictMode>,
    document.getElementById("root")
);
