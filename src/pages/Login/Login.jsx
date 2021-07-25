  
import React, { useState, useEffect } from "react";
import { Container, Input, Button, Notification, A } from "../../components";

const { backendUrlBase, siteName } = require('../../config');
const { errorMsg } = require('../../utils/showMsg');

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  
  useEffect(() => {
    document.title = `Login | ${siteName}`
 }, []);
  
  const loginUser = async (email, password) => {

    const url = `${backendUrlBase}/auth/login`;

    try {
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }).then((res) => res.json())
        .then((data) => {
          // console.log(data);
          if (data.token) {
            localStorage.setItem('token', data.token);
          }
          if (typeof data.msg !== 'undefined') {
            const inputs = document.querySelectorAll('#login_form input');
            for (let i = 0; i < inputs.length; i += 1) {
              inputs[i].value = '';
            }
            window.location.href = "/diagrams";
          } else if (typeof data.error !== 'undefined') {
            errorMsg(data.error);
          }
        });
    } catch (e) {
      errorMsg('Some error happened. Try again later.');
    }
    

  };

  return (
      <Container variant="container-medium">
          <h1 className="title is-1">{siteName}</h1>
          <h2 className="title is-2">Login</h2>
          <div className="block">
            <p>Not a member? <A href="/register">Register</A></p>
          </div>
          <Notification variant='is-success is-hidden' />
          <Notification variant='is-danger is-hidden' />
          <form
            id="login_form"
            onSubmit={async (e) => {
              e.preventDefault();
              loginUser(email, password);
            }}
          >
            <Input type="email" label="Email" placeholder="name@gmail.com" required="required" onChange={(e) => setEmail(e.target.value)} />
            <Input type="password" label="Password" placeholder="Password" required="required" onChange={(e) => setPassword(e.target.value)} />
            <Button variant='is-primary' type='submit'>Submit</Button>
          </form>
      </Container>
  );
     
};

export default Login;