import React, { useState, useEffect } from "react";
import { Container, Input, Button, Notification, A } from "../../components";

const { backendUrlBase, siteName } = require('../../config');
const { successMsg, errorMsg } = require('../../utils/showMsg');

const Register = () => {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    
    useEffect(() => {
        document.title = `Login | ${siteName}`
    }, []);
    
    const createUser = (username, email, password) => {
  
      const url = `${backendUrlBase}/auth/register`;
      
      try {
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            email: email,
            password: password,
          }),
        }).then((res) => res.json())
        .then((data) => {
          if (typeof data.msg !== 'undefined') {
            const inputs = document.querySelectorAll('#register_form input');
            for (let i = 0; i < inputs.length; i += 1) {
              inputs[i].value = '';
            }
            successMsg(data.msg);
          } else if (typeof data.error !== 'undefined') {
            errorMsg('Some error happened. Try again later.');
          }
        });
      }
      catch (e) {
        errorMsg('Some error happened. Try again later.');
      }
      
    };
  
    return (
      <Container variant="container-medium">
          <h1 className="title is-1">{siteName}</h1>
          <h2 className="title is-2">Register</h2>
          <div className="block">
            <p>Already a member? <A href="/login">Login</A></p>
          </div>
          <Notification variant='is-success is-hidden' />
          <Notification variant='is-danger is-hidden' />
          <form
            id="register_form"
            onSubmit={async (e) => {
              e.preventDefault();
              createUser(username, email, password);
            }}
          >
            <Input type="text" label="Name" placeholder="Name" minLength="2" required="required" onChange={(e) => setUsername(e.target.value)} />
            <Input type="email" label="Email" placeholder="name@gmail.com" required="required" onChange={(e) => setEmail(e.target.value)} />
            <Input type="password" label="Password" placeholder="Password" required="required" onChange={(e) => setPassword(e.target.value)} />
            <Button variant='is-primary' type='submit'>Submit</Button>
          </form>
      </Container>
    );
  };

export default Register;