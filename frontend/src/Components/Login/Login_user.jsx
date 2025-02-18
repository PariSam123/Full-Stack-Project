import React from "react";
import { Input, Form, Button, Row,Checkbox, Col, message, Typography } from "antd";
import { BrowserRouter as Router, Link } from "react-router-dom";
import authService from "../Authentication/authService";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import '../../App.css';

function Login_user() {
  document.title = "Login";
  const navigate = useNavigate();
  const onFinish = (event) => {
    authService
      .login(event.email, event.password, event.remember)
      .then((response) => {
        if (response.status === 200) {
            return navigate("/User");
        } else {
          if (response.status !== 200) {
            message.error(response.data.msg);
          }
        }
      })
      .catch((err) => {
        message.error("Server error");
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
            name="signin"
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
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your registered email!",
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
            </Form.Item>
            <Form.Item>
              <Button block type="primary" htmlType="submit">
                Log in
              </Button>
              or  <Link to={"/signup"} href="" >Register now!</Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Login_user;
