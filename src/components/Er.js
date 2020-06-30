import React from "react";
const Er = (props) => {
  return (
    <div style={styles.errorTextContainer}>
      <p style={{ ...styles.errorText, ...props.style }}>{props.children}</p>
    </div>
  );
};

export default Er;

const styles = {
  errorTextContainer: {
    position: "relative",
  },
  errorText: {
    position: "absolute",
    bottom: -37,
    width: 250,
    color: "red",
  },
};
