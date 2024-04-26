import { Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/users/userRegister";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";

function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { loading, userInfo, error } = useSelector(
    (state) => state.userRegister
  );

  console.log(userInfo);

  useEffect(() => {
    if (userInfo._id) {
      toast.success(`User ${userInfo.name} is registered successfully`);
      navigate("/login");
    }
  }, [navigate, userInfo]);

  const registerHandler = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      toast.error("both passwords doesn't match");
    } else {
      console.log("ghus gaya");
      dispatch(registerUser({ name, email, password }));
    }
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      <Form onSubmit={registerHandler}>
        <Form.Group className="my-4" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-4" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-4" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="enter pass"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-4" controlId="passwordConfirm">
          <Form.Label>Password Confirm</Form.Label>
          <Form.Control
            type="password"
            placeholder="enter pass again"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="my-2">
          Sign Up
        </Button>
      </Form>
      Already registred <Link to="/login">Sign In</Link>
    </FormContainer>
  );
}
export default RegisterScreen;
