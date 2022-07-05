import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { useAuth } from "../../hooks/useAuth";
import { Form, Button, Card, Container } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import logo from "../../assets/logo.png";
import { Eye } from "react-bootstrap-icons";

const Login = () => {
  const [username, setUsername] = useState("candidate.54");
  const [password, setPassword] = useState("Password@54");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  console.log("Login", auth);

  useEffect(() => {
    setErrorMessage("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/login", {
        username,
        password,
      });
      setAuth((prev) => {
        return {
          ...prev,
          username,
          token: response.data.token,
        };
      });
      localStorage.setItem(
        "userInfo",
        JSON.stringify({ username, token: response.data.token })
      );

      setErrorMessage("");
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
      setErrorMessage("Username or Password is wrong!");
    }
  };
  return (
    <Container className="login-container">
      <Image src={logo} alt="logo" className="mb-4" />
      <Card className="login  ">
        <h1 className="text-center">Sign In</h1>
        <p className="text-center text-danger fw-bolder">{errorMessage}</p>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3 px-5">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </Form.Group>
          {/* mb-3 px-4 */}
          <Form.Group className="mb-3 px-5">
            <Form.Label className="d-block">Password</Form.Label>
            <Form.Control
              className="pwd"
              type={passwordShown ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button
              type="button"
              className="d-inline pwd-btn border-0 bg-transparent"
              onClick={() => setPasswordShown((prev) => !prev)}
            >
              <Eye />
            </button>
          </Form.Group>
          <Button
            className="d-block w-75  m-auto "
            variant="primary"
            type="submit"
          >
            Login
          </Button>
        </Form>
        <div className="d-flex flex-column align-items-center">
          <a className="my-2" href="/passwordreset">
            Forgot password?
          </a>
          <p>
            Don`t have an account?{" "}
            <a style={{ pointerEvents: "none" }} href="/signup">
              Sign up
            </a>
          </p>
        </div>
      </Card>
    </Container>
  );
};

export default Login;

// <form onSubmit={handleSubmit}>
//         <label htmlFor="username">
//           <input
//             type="type"
//             required
//             value={username}
//             autoComplete="off"
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </label>
//         <label htmlFor="password">
//           <input
//             type="password"
//             value={password}
//             required
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </label>
//         <button>Login</button>
//       </form>
