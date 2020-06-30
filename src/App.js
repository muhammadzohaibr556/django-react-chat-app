import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch } from "react-redux";
import BaseRouter from "./routes";
import * as actions from "./store/actions/auth";
import CustomLayout from "./layout/Layout";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "./css/style.css";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.authCheckState());
  });

  return (
    <Router>
      <CustomLayout>
        <BaseRouter />
      </CustomLayout>
    </Router>
  );
};

export default App;
