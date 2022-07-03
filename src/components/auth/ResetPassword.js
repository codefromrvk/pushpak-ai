import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, Form } from "react-bootstrap";
const ResetPassword = () => {
  const navigate = useNavigate();
  return (
    <Container className="login-container">
      <Form>
        <Form.Group className="mb-3 px-5">
          <Form.Label>
            {" "}
            Enter your email address associated with the password
          </Form.Label>
          <Form.Control type="text" placeholder="Enter email" />
        </Form.Group>
        <Button className="d-block m-auto mb-3" variant="info">
          Submit
        </Button>
      </Form>

      <Button
        variant="info d-block px-4"
        onClick={() => {
          navigate("/", { replace: true });
        }}
      >
        Back
      </Button>
    </Container>
  );
};

export default ResetPassword;
