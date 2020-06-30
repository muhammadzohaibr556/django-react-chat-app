import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { authSignup } from "../store/actions/auth";
import Er from "../components/Er";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";

const RegistrationForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [userError, setUserError] = useState(null);
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const loading = useSelector((state) => state.auth.loading);

  const handleSubmit = (e) => {
    dispatch(authSignup(username, email, password1, password2));
  };

  if (JSON.parse(localStorage.getItem("user"))) {
    return <Redirect to="/" />;
  }
  let usernameError = null;
  let emailError = null;
  let passwordError = null;
  let confirmError = null;
  let buttonDisabled = true;
  if (username !== "" && username.match(/^[a-z]/) === null)
    usernameError = <Er>Username must starts from alphabet</Er>;
  if (username.match(/[A-Za-z]/gi) && username.match(/[A-Za-z]/gi).length < 3)
    usernameError = <Er>Entered username is too small!</Er>;
  if (
    email.length > 0 &&
    !new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ).test(email)
  )
    emailError = <Er>Enter valid email @address</Er>;
  if (password1 !== "") {
    if (!password1.match(/^(?=.*[a-z]).+$/))
      passwordError = <Er>At least one LOWERCASE character</Er>;
    if (!password1.match(/^(?=.*[A-Z]).+$/))
      passwordError = <Er>At least one UPPERCASE character</Er>;
    if (!password1.match(/^(?=.*[\d]).+$/))
      passwordError = <Er>At least one NUMBER</Er>;
    if (!password1.match(/([-+=_!@#$%^&*.,;:'"<>/?`~[\](){}\\|\s])/))
      passwordError = <Er>At least one SPECIAL character</Er>;
    if (!password1.match(/^.{8,}/))
      passwordError = <Er>At least 8 characters in the screen</Er>;
  }
  if (password1 !== password2) confirmError = <Er>Password doesn't match</Er>;
  if (
    username.length > 3 &&
    email !== "" &&
    password1 !== "" &&
    password2 !== "" &&
    !userError &&
    !usernameError &&
    !emailError &&
    !passwordError &&
    !confirmError
  )
    buttonDisabled = false;
  return (
    <div className="login-signup-wrapper">
      <div className="login-signup-form">
        <div className="login-signup-input-fields">
          <h1 style={{ textAlign: "center", color: "#39b7dd" }}>
            Signup to new account
          </h1>
          <Form onFinish={handleSubmit} form={form}>
            <Form.Item
              validateStatus={userError || usernameError ? "error" : null}
            >
              <Input
                prefix={<UserOutlined />}
                onBlur={() => setUserError(null)}
                placeholder="Username"
                onKeyPress={() => {
                  if (
                    !(
                      (window.event.keyCode >= 97 &&
                        window.event.keyCode <= 122) ||
                      (window.event.keyCode >= 48 && window.event.keyCode <= 57)
                    )
                  ) {
                    setUserError(<Er>Entered Key is not allowed</Er>);
                    window.event.returnValue = false;
                  } else setUserError(null);
                }}
                onChange={(e) => setUsername(e.target.value)}
              />
              {userError ? userError : usernameError ? usernameError : null}
            </Form.Item>
            <Form.Item validateStatus={emailError ? "error" : null}>
              <Input
                prefix={<MailOutlined />}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError ? emailError : null}
            </Form.Item>
            <Form.Item
              validateStatus={passwordError ? "error" : null}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                onChange={(e) => setPassword1(e.target.value)}
              />
              {passwordError ? passwordError : null}
            </Form.Item>
            <Form.Item
              validateStatus={confirmError ? "error" : null}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Confirm Password"
                onChange={(e) => setPassword2(e.target.value)}
              />
              {confirmError ? confirmError : null}
            </Form.Item>
            <Button
              className="login-signup-btn btn-block"
              type="primary"
              style={{ backgroundColor: "#39b7dd" }}
              htmlType="submit"
              disabled={buttonDisabled || loading}
            >
              Signup
            </Button>
          </Form>
          <p
            style={{
              color: "whitesmoke",
              marginTop: "10px",
              textAlign: "center",
            }}
          >
            Have an Account?{" "}
            <NavLink
              to="/login"
              style={{ color: "#39b7dd", textDecoration: "none" }}
            >
              Log in
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
