import React from "react";
import { Route } from "react-router-dom";
import Hoc from "./hoc/hoc";

import Login from "./accounts/Login";
import Signup from "./accounts/Signup";
import HomepageLayout from "./containers/Home";
import PasswordChange from "./accounts/PasswordChange";
import PasswordReset from "./accounts/PasswordReset";
import MyProfile from "./accounts/MyProfile";
const BaseRouter = () => (
  <Hoc>
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route exact path="/" component={HomepageLayout} />
    <Route exact path="/password/change" component={PasswordChange} />
    <Route exact path="/profile" component={MyProfile} />
    <Route exact path="/password-reset" component={PasswordReset} />
  </Hoc>
);

export default BaseRouter;
