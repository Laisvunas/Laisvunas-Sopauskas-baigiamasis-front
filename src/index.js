import React from "react";
import ReactDOM from "react-dom";
import FontStyles from "./fonts/fontStyles";
import Routes from "./routes/Routes";
import AuthProvider from "./contexts/authContext";
import './index.css';

ReactDOM.render(
    <React.StrictMode>
        <FontStyles />
        <Routes />

    </React.StrictMode>,
    document.getElementById("root")
);
