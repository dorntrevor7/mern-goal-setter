import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

function Login() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section className="Heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login and start setting goals!</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="email"
              value={email}
              placeholder="Enter your email address"
              onChange={onChange}
            />{" "}
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="password"
              value={password}
              placeholder="Enter your password"
              onChange={onChange}
            />{" "}
          </div>
          <div className="form-group">
            <Button variant="outline-primary" onSubmit={onSubmit}>
              {" "}
              Submit{" "}
            </Button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
