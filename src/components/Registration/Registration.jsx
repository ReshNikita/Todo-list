import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Form, Input, InputNumber, Select } from "antd";

import "./Registration.scss";

const { Option } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const Registration = () => {
  const genderOptions = [
    { value: "", text: "--Choose an option--" },
    { value: "female", text: "female" },
    { value: "male", text: "male" },
    { value: "other", text: "other" },
  ];

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState(genderOptions[0].value);
  const [age, setAge] = useState("");
  const [success, setSuccess] = useState(false);

  const inputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = async () => {
    try {
      const { status, data } = await axios.post(
        process.env.REACT_APP_REGISTER,
        { username, password, email, gender, age }
      );
      console.log(status, data);
      setSuccess(true);
      setTimeout(() => {
        navigate("/todo", { replace: true });
      }, 2500);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <>
      {success ? (
        <h1 className="Success__header">Welcome!</h1>
      ) : (
        <>
          <section className="sectionRegistration">
            <h1 className="registratioHeader">Sign in</h1>
            <Form
              {...layout}
              name="nest-messages"
              onFinish={e => handleSubmit(e)}
              onSubmit={e => e.preventDefault()}
              style={{
                maxWidth: 600,
              }}
              autoComplete="on"
              initialValues={{
                password,
                gender,
                user: { username, age, email },
              }}
            >
              <Form.Item
                name={["Username"]}
                label="Usermame"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  ref={inputRef}
                  value={username}
                  onChange={e => setUserName(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="Password"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input.Password
                  onChange={e => setPassword(e.target.value)}
                  value={password}
                />
              </Form.Item>

              <Form.Item
                name={["Email"]}
                label="Email"
                rules={[
                  {
                    type: "email",
                    required: true,
                  },
                ]}
              >
                <Input value={email} onChange={e => setEmail(e.target.value)} />
              </Form.Item>

              <Form.Item
                name={["Age"]}
                label="Age"
                rules={[
                  {
                    type: "number",
                    min: 0,
                    max: 120,
                    required: true,
                  },
                ]}
              >
                <InputNumber value={age} onChange={e => setAge(e)} />
              </Form.Item>

              <Form.Item
                name="Gender"
                label="Gender"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  value={gender}
                  onChange={e => setGender(e)}
                  placeholder="Select an option..."
                  allowClear
                >
                  {genderOptions.map(option => (
                    <Option key={option.value} value={option.value}>
                      {option.text}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <div className="registrationButtonBlock">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="registrationSubmitButton"
                >
                  Submit
                </Button>
              </div>
            </Form>
          </section>
          <div className="blockBackHomeButton">
            <Link className="BackHomeButton" to="/">
              Back Home
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default Registration;
