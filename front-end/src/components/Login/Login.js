import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'universal-cookie';
import './Login.css'; // Import your custom CSS styles
const cookies = new Cookies();

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { email, password };
      const response = await axios.post('http://localhost:3001/auth/login', {
        data,
      });
      const { token } = response.data.results;
      cookies.set('TOKEN', token);
      window.location.href = '/';
      setLogin(true);
    } catch (error) {
      console.error('Error:', error);
      alert('Email & Password must be required and valid.If you are not register then Please register First');
    }
  };

  return (
    <Container fluid className="login-container">
      <Row className="justify-content-center align-items-center vh-100" style={{width:"80%"}}>
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card className="login-card">
            <Card.Body>
              <Card.Title className="text-center">Login</Card.Title>
              <Form onSubmit={handleSubmit}>
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
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                </Form.Group>
                <Button variant="primary" type="submit" style={{ borderRadius:"10px",margin:"5px"}} block>
                  Login
                </Button><span><a href='/signup'>Signup</a></span>
                {login ? (
                  <p className="text-success text-center mt-3">
                    You are logged in successfully.
                  </p>
                ) : (
                  <p className="text-danger text-center mt-3">
                    You are not logged in.
                  </p>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
