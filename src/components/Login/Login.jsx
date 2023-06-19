import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Form, Checkbox } from "antd";

import "./Login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const inputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = async e => {
    try {
      const { status, data } = await axios.post(process.env.REACT_APP_URL, {
        email,
        password,
      });

      console.log(status);
      setSuccess(true);

      localStorage.setItem("token", data.token);
      setTimeout(() => {
        navigate("/todo", { replace: true });
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {success ? (
        <h1 className="Success__header">You're logged in!</h1>
      ) : (
        <section className="signInSection">
          <h1 className="section__header">Login</h1>

          <Form
            onFinish={e => handleSubmit(e)}
            onSubmit={e => e.preventDefault()}
            name="basic"
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            autoComplete="on"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please input your email!",
                },
              ]}
            >
              <Input
                className="formInput"
                type="email"
                ref={inputRef}
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
                className="formInput"
                onChange={e => setPassword(e.target.value)}
                value={password}
              />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
              <div className="section__buttonBlock">
                <Button
                  shape="round"
                  type="primary"
                  htmlType="submit"
                  className="section__buttonLogin"
                >
                  Log in
                </Button>
              </div>
              <Link className="section__registrationLink" to="/register">
                Register for an account
              </Link>
            </Form.Item>
          </Form>
        </section>
      )}
    </>
  );
};

export default Login;
