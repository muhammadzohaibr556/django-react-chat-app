import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/actions/auth";
import { CaretDownOutlined, UserOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Avatar } from "antd";
import LoginForm from "../accounts/Login";
import RegistrationForm from "../accounts/Signup";
import Modal from "antd/lib/modal/Modal";

const Header = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const [loginVisible, setLoginVisible] = useState(false);
  const [signupVisible, setSignupVisible] = useState(false);
  const auth = useSelector((state) => state.auth);
  const isAuth = auth.token !== null;
  let userData = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (isAuth) {
      setUser(userData.username);
    }
  }, [isAuth, userData]);
  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Link to="/profile">My Profile</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/password/change">Change Password</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">
        <Link to="/" data-toggle="modal" data-target="#myModal">
          Logout
        </Link>
      </Menu.Item>
    </Menu>
  );
  return (
    <Fragment>
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Demo
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#collapsibleNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
            </ul>
            {isAuth ? (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Dropdown className="nav-link" overlay={menu}>
                    <Link
                      to="/"
                      className="ant-dropdown-link text-light"
                      onClick={(e) => e.preventDefault()}
                    >
                      Welcome {user + " "}
                      {!auth.profile || auth.profile === "" ? (
                        <Avatar icon={<UserOutlined />} />
                      ) : (
                        <img
                          src={auth.profile}
                          style={{ borderRadius: "50%", width: "50px" }}
                          alt="User Profile"
                        />
                      )}
                      <CaretDownOutlined />
                    </Link>
                  </Dropdown>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup" className="nav-link">
                    Signup
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
      <Modal title="Login" visible={loginVisible}>
        <LoginForm />
      </Modal>
      <Modal title="Signup" visible={signupVisible}>
        <RegistrationForm />
      </Modal>
      <div className="modal" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Logout</h4>
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            <div className="modal-body">Are you sure to logout ?</div>

            <div className="modal-footer">
              <Link
                to="/"
                onClick={() => {
                  dispatch(logout());
                }}
                type="button"
                className="btn btn-danger ml-3"
                data-dismiss="modal"
              >
                Yes
              </Link>
              <Link
                to="/"
                type="button"
                className="btn btn-info"
                data-dismiss="modal"
              >
                No
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Header;
