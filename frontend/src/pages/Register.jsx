import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

function Register() {
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
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>
      <section className="form">
        <Form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              placeholder="Enter your name"
              onChange={onChange}
            />{" "}
          </div>
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
            <input
              type="text"
              className="form-control"
              id="password2"
              value={password2}
              placeholder="Confirm your Password"
              onChange={onChange}
            />{" "}
          </div>
          <div className="form-group">
            <Button variant="outline-primary" type="submit">
              {" "}
              Submit{" "}
            </Button>
          </div>
        </Form>
      </section>
    </>
  );
}

export default Register;
