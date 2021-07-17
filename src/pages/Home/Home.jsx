  
import React, { useContext } from "react";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
//import { AuthContext } from "../../contexts/authContext";

const Home = () => {
    return <h1>Home</h1>;
    //   const authStatus = useContext(AuthContext);

//   if (authStatus.username) {
//     return <Redirect to="/dashboard" />;
//   }
//   else {
//     return <Redirect to="/login" />
//   }
};

export default Home;