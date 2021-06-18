import React from "react";
import ReactLoading from "react-loading";
import PropTypes from "prop-types";

function LoadingAnimation({ animationKey }) {
  return (
    <div
      style={{
        background: "transparent",
        width: "100%",
        height: "auto",
        textAlign: "center",
        display: animationKey ? "block" : "none",
        marginTop: "64px",
      }}
    >
      <ReactLoading
        type="spinningBubbles"
        color="#d9534f"
        height="64px"
        width="64px"
      />
    </div>
  );
}
LoadingAnimation.propTypes = {
  animationKey: PropTypes.bool.isRequired,
};
LoadingAnimation.defaultProps = {
  animationKey: false,
};
export default LoadingAnimation;
