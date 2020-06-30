import React, { Fragment, useState } from "react";
import axios from "axios";
import { message, Form, Button, Input } from "antd";
import { Redirect } from "react-router-dom";
import { endpoint } from "../store/utility";
import Er from "../components/Er";
const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [loading, setloading] = useState(false);

  const handleSubmit = (e) => {
    if (JSON.parse(localStorage.getItem("user"))) return <Redirect to="/" />;
    else {
      const data = {
        email: email,
      };
      setloading(true);
      axios
        .post(`${endpoint}/rest-auth/password/reset/`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setloading(false);
          message.success(res.data.detail);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
      setloading(false);
    }
  };
  let buttonDisabled = true;
  let emailError = null;
  if (
    email.length > 0 &&
    !new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ).test(email)
  )
    emailError = <Er>Enter valid email @address</Er>;
  if (!emailError && email.length > 0) buttonDisabled = false;
  const formItemLayout = {
    labelCol: {
      xs: { span: 12 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  //   if (JSON.parse(localStorage.getItem("user"))) return <Redirect to="/login" />;
  return (
    <Fragment>
      <div
        className="container d-flex justify-content-center"
        style={{
          height: "59vh",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <br />
        <h1>Password Reset</h1>
        <br />
        <Form
          className="form"
          onFinish={handleSubmit}
          layout="vertical"
          {...formItemLayout}
        >
          <Form.Item
            label="Your Email"
            validateStatus={emailError ? "error" : null}
          >
            <Input
              type="email"
              style={{ width: 300 }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
            />
            {emailError ? emailError : null}
          </Form.Item>
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
    </Fragment>
  );
};

export default PasswordReset;
