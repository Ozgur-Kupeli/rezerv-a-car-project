import React from "react";
import "./userInfo.scss";
import PropTypes from "prop-types";

function UserInfoComponent({ userVerifyed, name, quit }) {
  return (
    <div
      className="userVerifyed"
      style={{ display: userVerifyed ? "block" : "none" }}
    >
      <div>
        <div data-testid="name">{name}</div>
        <img
          src="/navImage/cikis512x512.png"
          alt="Çıkış Yap"
          onClick={() => quit()}
        ></img>
      </div>
    </div>
  );
}

UserInfoComponent.propTypes = {
  userVerifyed: PropTypes.oneOfType([
    PropTypes.bool.isRequired,
    PropTypes.object.isRequired,
  ]),
  name: PropTypes.string.isRequired,
  quit: PropTypes.func.isRequired,
};
UserInfoComponent.defaultProps = {
  userVerifyed: {},
  name: "...",
  quit: () => {},
};

export default UserInfoComponent;
