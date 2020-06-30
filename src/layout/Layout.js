import React from "react";
import Header from "./Header";

const CustomLayout = (props) => {
  return (
    <div>
      <Header />
      {props.children}
    </div>
  );
};

export default CustomLayout;
