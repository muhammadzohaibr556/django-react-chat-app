import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { authLogin } from "../store/actions/auth";
import Er from "../components/Er";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
const LoginForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loading = useSelector((state) => state.auth.loading);

  const handleSubmit = (e) => {
    dispatch(authLogin(email, password));
  };

  if (JSON.parse(localStorage.getItem("user"))) {
    return <Redirect to="/" />;
  }
  let emailError = null;
  let passwordError = null;
  let buttonDisabled = true;
  if (
    email.length > 0 &&
    !new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ).test(email)
  )
    emailError = <Er>Enter valid email @address</Er>;
  if (email !== "" && password !== "" && !emailError && !passwordError)
    buttonDisabled = false;
  return (
    <div className="login-signup-wrapper">
      <div className="login-signup-form">
        <div className="login-signup-input-fields">
          <h1 style={{ textAlign: "center", color: "#39b7dd" }}>
            Login to your account
          </h1>
          <Form form={form} onFinish={handleSubmit} className="login-form">
            <Form.Item validateStatus={emailError ? "error" : null}>
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError ? emailError : null}
            </Form.Item>
            <Form.Item validateStatus={passwordError ? "error" : null}>
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError ? passwordError : null}
            </Form.Item>
            <Button
              className="login-signup-btn btn-block"
              type="primary"
              style={{ backgroundColor: "#39b7dd" }}
              htmlType="submit"
              disabled={buttonDisabled || loading}
            >
              Login
            </Button>
          </Form>
          <div
            style={{
              display: "flex",
              marginTop: "10px",
            }}
          >
            <NavLink style={{ color: "#39b7dd" }} to="/password-reset">
              Forgot password
            </NavLink>
          </div>
          <p
            style={{
              color: "whitesmoke",
              marginTop: "10px",
              textAlign: "center",
            }}
          >
            Have an Account?{" "}
            <NavLink
              to="/signup"
              style={{ color: "#39b7dd", textDecoration: "none" }}
            >
              Sign up
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
