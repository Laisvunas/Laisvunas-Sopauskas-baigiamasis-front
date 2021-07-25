import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import Container from '../components/Container/Container';
import ProgressBar from '../components/ProgressBar/ProgressBar';

const { backendUrlBase } = require('../config');

export const PrivateRoute = (props) => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authData, setAuthData] = useState({username: "", author_id: "", isAuthenticated: false, isEditor: "n"});

    const { component: Component, ...rest } = props;

    const asyncCall =  async () => {
        const url = `${backendUrlBase}/auth/status`;
        const token = localStorage.getItem("token");
        let res = {};
        if (token) {
            try {
                 await fetch(url, {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                      authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => res.json())
                .then((data) => {
                    res = {username: data.username, author_id: data.id, isAuthenticated: true, isEditor: data.isEditor};
                })
            } catch(e) {
                res = {username: "", author_id: "", isAuthenticated: false, isEditor: "n"};
            };
        }
        else {
            res = {username: "", author_id: "", isAuthenticated: false, isEditor: "n"};
        }
        return res;
    };

    useEffect(() => {
        const fetchData = () => {
            const result = asyncCall();
            result.then((result)=>{
                setAuthData(result);
                setIsAuthenticated(result.isAuthenticated);
                setLoading(false);
            });
        };
        fetchData();
    }, []);

    return (
        <Route
            {...rest}
            render={() =>
                isAuthenticated ? (
                    <Component {...props} auth={authData} />
                ) : loading ? (
                    <Container>
                        <h1 className="title is-3">Loading...</h1>
                        <ProgressBar size="is-small" variant='is-primary'></ProgressBar>
                    </Container>
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    );
};
