import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "react-bootstrap/Spinner";

function Login() {
  const styles = {
    div: {
      padding: "50px",
      fontFamily: "Helvetica",
      justifyContent: "center",
      display: "grid",
      fontFamily: "Helvetica",
      alignItems: "center",
    },
    input: {
      width: "50vw",
      marginTop: "10px",
      marginBottom: "10px",
      color: "black",
      border: "1px solid black",
    },
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div style={styles.div}>
      <section className="Heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login and start setting goals!</p>
      </section>
      <section className="form">
        <Form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              style={styles.input}
              type="text"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email address"
              onChange={onChange}
            />{" "}
          </div>
          <div className="form-group">
            <input
              type="text"
              style={styles.input}
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={onChange}
            />{" "}
          </div>
          <br />
          <div className="form-group">
            <Button
              type="button"
              variant="outline-primary"
              onClick={onSubmit}
              style={{ width: "25%" }}
            >
              {" "}
              Submit{" "}
            </Button>
          </div>
        </Form>
      </section>
      <br />
      <br />
      <div>
        <h3>Test Acct:</h3>
        <p>Email: test12@pass.com</p>
        <p>Password: test12</p>
      </div>
    </div>
  );
}

export default Login;
