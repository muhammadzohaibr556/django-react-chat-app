import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { message, Form, Button, Input } from "antd";
import { logout } from "../store/actions/auth";
import { endpoint } from "../store/utility";
import Er from "../components/Er";
const PasswordChange = () => {
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPasswordError, setOldPasswordError] = useState(null);
  const [loading, setloading] = useState(false);
  const handleSubmit = (e) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      message.info("You have been logout");
    } else {
      const data = {
        old_password: oldPassword,
        new_password1: newPassword,
        new_password2: confirmPassword,
      };
      setloading(true);
      axios
        .post(`${endpoint}/rest-auth/password/change/`, data, {
          headers: {
            Authorization: `JWT ${user.token}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          dispatch(logout());
          message.success(res.data.detail + " and you have been logout");
          return <Redirect to="/login" />;
        })
        .catch((err) => {
          if (err.response.data.old_password[0]) {
            setOldPasswordError(<Er>{err.response.data.old_password[0]}</Er>);
            message.error(err.response.data.old_password);
          } else if (err.response.data.new_password1)
            message.error(err.response.data.new_password1);
          else if (err.response.data.detail)
            message.error(err.response.data.detail);
        });
      setloading(false);
    }
  };
  const formItemLayout = {
    labelCol: {
      xs: { span: 12 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 10 },
    },
  };
  let buttonDisabled = true;
  let newPasswordError = null;
  let confirmError = null;
  if (newPassword !== "" && newPassword.length < 8)
    newPasswordError = <Er>Password length must be 8 or above</Er>;
  if (confirmPassword !== "" && confirmPassword !== newPassword)
    confirmError = <Er>Password doesnot matched</Er>;
  if (
    oldPassword !== "" &&
    newPassword !== "" &&
    confirmPassword !== "" &&
    !oldPasswordError &&
    !newPasswordError &&
    !confirmError
  )
    buttonDisabled = false;
  if (!JSON.parse(localStorage.getItem("user")))
    return <Redirect to="/login" />;
  return (
    <Fragment>
      <div
        className="container d-flex justify-content-center"
        style={{
          height: "74vh",
          flexDirection: "column",
        }}
      >
        <h1>Password Change</h1>
        <br />
        <div width="500px">
          <Form {...formItemLayout} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              label="Old Password"
              validateStatus={oldPasswordError ? "error" : null}
            >
              <Input.Password
                type="password"
                value={oldPassword}
                onKeyUp={() => setOldPasswordError(null)}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Old Password"
              />
              {oldPasswordError ? oldPasswordError : null}
            </Form.Item>
            <br />
            <Form.Item
              label="New Password"
              validateStatus={newPasswordError ? "error" : null}
            >
              <Input.Password
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
              />
              {newPasswordError ? newPasswordError : null}
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              validateStatus={confirmError ? "error" : null}
            >
              <Input.Password
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
              />
              {confirmError ? confirmError : null}
            </Form.Item>
            <br />
            <Button
              className=""
              type="primary"
              htmlType="submit"
              disabled={loading || buttonDisabled}
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </Fragment>
  );
};

export default PasswordChange;
