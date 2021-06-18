import React from "react";
import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";
import "./rtgAnimation.css";

function RTGAnimation({ rtgOpen, rtgMessage }) {
  return (
    <CSSTransition
      in={rtgOpen}
      timeout={200} //içeriğin geç gelmesi için
      classNames="rtg-transition"
      unmountOnExit
      appear
    >
      <p className="rtgBody">{rtgMessage}</p>
    </CSSTransition>
  );
}
RTGAnimation.propTypes = {
  rtgOpen: PropTypes.bool.isRequired,
  rtgMessage: PropTypes.string.isRequired,
};
RTGAnimation.defaultProps = {
  rtgOpen: false,
  rtgMessage: "",
};
export default RTGAnimation;
