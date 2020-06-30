import React, { Fragment, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { profileUpdate } from "../store/actions/auth";
import { message, Spin, Form, Input, Button } from "antd";
import Image from "../components/image";
import { DataURLtoFile } from "../store/utility";
import Er from "../components/Er";
const MyProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const [firstname, setFirstname] = useState(!user ? "" : user.firstname);
  const [lastname, setLastname] = useState(!user ? "" : user.lastname);
  const [firstError, setFirstError] = useState(null);
  const [lastError, setLastError] = useState(null);
  const [username] = useState(!user ? "" : user.username);
  const [email] = useState(!user ? "" : user.email);
  const [image, setImage] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [selectImageUrl, setSelectImageUrl] = useState("");
  const [filename, setFilename] = useState("");
  const [buttonHide, setButtonHide] = useState(true);
  const loading = useSelector((state) => state.auth.loading);
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) setImage(user.profile);
  }, [loading]);
  if (!user) return <Redirect to="/login" />;
  const handleSubmit = (e) => {
    if (!JSON.parse(localStorage.getItem("user")))
      message.info("You must login first");
    else {
      dispatch(
        profileUpdate(
          firstname,
          lastname,
          username,
          email,
          selectImageUrl ? DataURLtoFile(selectImageUrl, filename) : ""
        )
      );
      setSelectedImage("");
      setSelectImageUrl("");
      setButtonHide(true);
    }
  };
  const imageChange = (file) => {
    const { type } = file;
    if (type.endsWith("jpeg") || type.endsWith("png") || type.endsWith("jpg"))
      setSelectedImage(file);
    setFilename(file.name);
  };
  const onClose = () => {
    setSelectImageUrl("");
    setSelectedImage("");
    setFilename("");
    setButtonHide(true);
  };
  let firstnameError = null;
  let lastnameError = null;
  let buttonDisabled = true;
  if (firstname !== "" && firstname.match(/^[A-Z]/) === null)
    firstnameError = <Er>Firstname must starts from capital</Er>;
  if (firstname.match(/[A-Za-z]/gi) && firstname.match(/[A-Za-z]/gi).length < 3)
    firstnameError = <Er>Entered firstname is too small!</Er>;
  if (lastname !== "" && lastname.match(/^[A-Z]/) === null)
    lastnameError = <Er>lastname must starts from capital</Er>;
  if (lastname.match(/[A-Za-z]/gi) && lastname.match(/[A-Za-z]/gi).length < 3)
    lastnameError = <Er>Entered lastname is too small!</Er>;
  if (!firstError && !firstnameError && !lastError && !lastnameError)
    buttonDisabled = false;
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
  return (
    <Fragment>
      <div className="container my-3">
        <h1>My Profile</h1>
        <div className="d-flex justify-content-center flex-wrap my-3">
          {buttonHide ? (
            <img
              src={!image ? "" : image}
              width="250"
              alt={!image ? "" : username}
            />
          ) : null}
          <div className="align-self-center m-1">
            <div
              className="image-box d-flex bg-light flex-wrap justify-content-center align-item-center mb-3"
              style={{ minWidth: "200px" }}
            >
              {buttonHide ? (
                <label className="custom-file-upload align-self-center">
                  <input
                    type="file"
                    className="form-control-file"
                    accept="image/png, image/jpeg"
                    value=""
                    onChange={(e) => {
                      imageChange(e.target.files[0]);
                      setButtonHide(false);
                    }}
                  />
                  {image ? <span>Change </span> : <span>Select </span>}Profile
                  Image
                </label>
              ) : null}
              <div className="col-lg-7">
                <Image
                  image={selectedImage}
                  width={250}
                  height={250}
                  onImageUrl={(url) => setSelectImageUrl(url)}
                  onCloseImage={onClose}
                  closeButtonHide={buttonHide}
                />
              </div>
              <div className="col-lg-5 py-5 px-2 align-self-center text-center">
                <img src={selectImageUrl} width="250" alt="" />
                {selectImageUrl ? <p>Preview</p> : null}
              </div>
              <br clear="all" />
            </div>
          </div>
        </div>
        <Form layout="vertical" {...formItemLayout} onFinish={handleSubmit}>
          <Form.Item
            label="First Name"
            validateStatus={firstError || firstnameError ? "error" : null}
          >
            <Input
              placeholder="Firstname"
              onBlur={() => setFirstError(null)}
              defaultValue={firstname}
              onKeyPress={() => {
                if (
                  !(
                    (window.event.keyCode >= 97 &&
                      window.event.keyCode <= 122) ||
                    (window.event.keyCode >= 65 &&
                      window.event.keyCode <= 91) ||
                    window.event.keyCode === 32
                  )
                ) {
                  setFirstError(<Er>Entered Key is not allowed</Er>);
                  window.event.returnValue = false;
                } else setFirstError(null);
              }}
              onChange={(e) => setFirstname(e.target.value)}
            />
            {firstError ? firstError : firstnameError ? firstnameError : null}
          </Form.Item>
          <Form.Item
            label="Last Name"
            validateStatus={firstError || firstnameError ? "error" : null}
          >
            <Input
              placeholder="Lastname"
              onBlur={() => setLastError(null)}
              defaultValue={lastname}
              onKeyPress={() => {
                if (
                  !(
                    (window.event.keyCode >= 97 &&
                      window.event.keyCode <= 122) ||
                    (window.event.keyCode >= 65 &&
                      window.event.keyCode <= 91) ||
                    window.event.keyCode === 32
                  )
                ) {
                  setLastError(<Er>Entered Key is not allowed</Er>);
                  window.event.returnValue = false;
                } else setLastError(null);
              }}
              onChange={(e) => setLastname(e.target.value)}
            />
            {lastError ? lastError : lastnameError ? lastnameError : null}
          </Form.Item>
          <Form.Item label="Username">
            <Input disabled={true} placeholder={username} />
          </Form.Item>
          <Form.Item label="Email">
            <Input disabled={true} placeholder={email} />
          </Form.Item>
          <div>
            <Spin spinning={loading} delay={500}>
              <Button
                type="primary"
                htmlType="submit"
                disabled={loading || buttonDisabled}
              >
                Submit
              </Button>
            </Spin>
          </div>
        </Form>
      </div>
    </Fragment>
  );
};

export default MyProfile;
