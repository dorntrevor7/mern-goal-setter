import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import { FaUser } from "react-icons/fa";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";

function Register() {
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

  const { name, email, password, password2 } = formData;

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

    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div style={styles.div}>
      <section className="Heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>
      <section className="form">
        <Form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              style={styles.input}
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              placeholder="Enter your name"
              onChange={onChange}
            />{" "}
          </div>
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
              style={styles.input}
              type="text"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={onChange}
            />{" "}
          </div>
          <div className="form-group">
            <input
              style={styles.input}
              type="text"
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              placeholder="Confirm your Password"
              onChange={onChange}
            />{" "}
          </div>
          <br />
          <div className="form-group">
            <Button
              variant="outline-primary"
              type="submit"
              style={{ width: "25%" }}
            >
              {" "}
              Submit{" "}
            </Button>
          </div>
        </Form>
      </section>
    </div>
  );
}

export default Register;
