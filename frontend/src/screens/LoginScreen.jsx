import { Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/users/userLogin";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { loading, userInfo, error } = useSelector((state) => state.userLogin);
  console.log(userInfo);
  // const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (userInfo?._id) {
      console.log(userInfo);
      toast.success(`Welcome ${userInfo?.name}`);
      navigate("/");
    }
  }, [navigate, userInfo]);

  return (
    <>
      <FormContainer>
        <h1>Sign In</h1>
        <Form>
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

          <Button
            type="button"
            variant="primary"
            className="my-2"
            onClick={() => dispatch(loginUser({ username: email, password }))}
          >
            Sign In
          </Button>
        </Form>
        Didn`t have any account <Link to="/register">Sign Up</Link>
      </FormContainer>
    </>
  );
}
export default LoginScreen;
