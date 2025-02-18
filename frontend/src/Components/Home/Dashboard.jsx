import { Typography, Row, Col, Button } from "antd";
import React from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import authService from "../Authentication/authService";
const UserDashboard = () => {
  const navigate = useNavigate();
  const user = jwtDecode(authService.getCurrentUser());
  const getLogout = () => {
    navigate("/Login");
    localStorage.removeItem("user");
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
            flexDirection: "column",
          }}
        >
          <Typography style={{ fontSize: "14px", fontWeight: "bold" }}>
            Welcome, {user.Email}
          </Typography>
          <Button
            onClick={getLogout}
            style={{ background: "#1677ff", color: "white" }}
          >
            Logout
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default UserDashboard;
