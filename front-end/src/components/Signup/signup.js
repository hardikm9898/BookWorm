import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function Signup() {
  // initial state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [phone, setphone] = useState('');
  const [Signup, setSignup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { email, password,userName,phone };
      // No need for JSON.stringify

       await axios.post('http://localhost:3001/auth/register', {
        data,
      });
      window.location.href = '/';
      setSignup(true);
    } catch (error) {
      console.error('Error:', error);
      alert('password lenght min 6 and aplpha only and valid and Fill All deatails and if you register already then click on Login Please try again later.');
    }
  };

  return (
    <>
      <h2>Signup</h2>
      <Form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <Form.Group controlId="formBasicUserName">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            name="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter User Name"
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="tel"
            name="phone"
            value={phone}
            onChange={(e) => setphone(e.target.value)}
            placeholder="Phone Number"
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Signup
        </Button> <span><a href='/'>Login</a></span>
        {Signup ? (
          <p className="text-success">You Are Registed in Successfully</p>
        ) : (
          <p className="text-danger">You Are Not Register</p>
        )}
      </Form>
    </>
  );
}
