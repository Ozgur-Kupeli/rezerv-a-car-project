import React from "react";
import PropTypes from "prop-types";
import "./hamburgerMenuButton.scss";

function HamburgerMenuButton({ openCloseFunc, isToggled }) {
  return (
    <>
      {/* hamburger menu buton ac */}
      <div
        className="hamburgerAc"
        onClick={() => openCloseFunc()}
        style={isToggled ? { display: "none" } : { display: "block" }}
      >
        <img
          className="open"
          src={"/navImage/menuOpen300x300.png"}
          alt="menuOpen"
        />
        <img
          className="openHover"
          src={"/navImage/menuCloseHover300x300.png"}
          alt="openHover"
        />
      </div>

      {/* hamburger menu buton kapa */}
      <div
        className="hamburgerKapa"
        onClick={() => openCloseFunc()}
        style={isToggled ? { display: "block" } : { display: "none" }}
      >
        <img
          className="closee"
          src={"/navImage/menuClose300x300.png"}
          alt="menuClose"
        />
        <img
          className="closeHover"
          src={"/navImage/menuOpenHover300x300.png"}
          alt="closeHover"
        />
      </div>
    </>
  );
}
HamburgerMenuButton.propTypes = {
  isToggled: PropTypes.bool.isRequired,
  openCloseFunc: PropTypes.func.isRequired,
};
HamburgerMenuButton.defaultProps = {
  isToggled: false,
  openCloseFunc: () => {},
};

export default HamburgerMenuButton;
