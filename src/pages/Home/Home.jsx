  
import React from "react";
import { Redirect } from "react-router-dom";

const Home = (props) => {
    
    return (
        <Redirect
            to={{
                pathname: "/login",
                state: { from: props.location },
            }}
        />
    );
};

export default Home;