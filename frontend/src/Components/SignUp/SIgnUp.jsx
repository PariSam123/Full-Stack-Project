import React from "react";
import { Col, Form, Row, Input, message, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import authService from "../Authentication/authService";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const onFinish = (event) => {
    authService
      .signUp(event.name, event.email, event.password, event.number)
      .then((response) => {
        if (response.status === 200) {
          message.success("User registration successfully!");
          return navigate("/Login");
        } else {
          if (response.status === 0) {
            alert("Could not connect with server. Try after sometime");
            message.warning(
              "Could not connect with server. Try after sometime"
            );
          } else {
            message.error(response.data);
          }
        }
      })
      .catch((err) => {
        // message.warning(err);
        if (err.status === 0) {
          message.error("Server error");
        } else {
          message.error(err.msg);
        }
      });
  };
  return (
    <div style={{ height: "100vh" }}>
      <Row style={{ height: "100%" }}>
        <Col
          span={24}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Form
            name="signup"
            initialValues={{
              remember: true,
            }}
            style={{
              width: "30%",
            }}
            onFinish={onFinish}
            autoComplete="off"
            validateTrigger={["onBlur"]}
          >
            {/* User Name */}
            <Form.Item
              name="name"
              rules={[
                { required: true, message: "Please Enter your Name!" },
                {
                  type: "string",
                  min: 6,
                  message: "Name must be at least 6 characters long!",
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="User Name" />
            </Form.Item>
            <Form.Item
              name="number"
              rules={[
                { required: true, message: "Please Enter your Phone Number!" },
                {
                  pattern: /^[0-9]*$/,
                  message: "Please enter a valid phone number!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Phone Number"
                maxLength={10}
              />
            </Form.Item>
            {/* Email */}
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please Enter your Email!" },
                { type: "email", warningOnly: true },
                { type: "string", min: 6 },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>
            {/* Password */}
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please Enter your password!",
                },
                { type: "password", warningOnly: true },
                { type: "string", min: 8 },
              ]}
            >
              <Input.Password
                type="password"
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            </Form.Item>
            {/* Confirm password */}
            {/* <Form.Item
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                { type: "confirmPassword", warningOnly: true },
                { type: "string", min: 8 },
              ]}
            >
              <Input.Password
                type="confirmPassword"
                prefix={<LockOutlined />}
                placeholder="Confirm Password"
              />
            </Form.Item> */}
            {/* Confirm password */}
            <Form.Item
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
            >
              <Input.Password
                type="password"
                prefix={<LockOutlined />}
                placeholder="Confirm Password"
              />
            </Form.Item>
            <Form.Item>
              <Button block type="primary" htmlType="submit">
                Register now
              </Button>
              or{" "}
              <Link to={"/Login"} href="">
                Log In
              </Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default SignUp;
