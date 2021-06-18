import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import SocialMediaIconsBar from "../naviSocialMedia/SocialMediaIconsBar";
import "./sideBarNavigation.scss";

function SideBarNavigation({
  isToggled,
  userVerifyed,
  scrolled,
  navBars,
  socialMediaIcons,
}) {
  return (
    <>
      <div
        id="sideBar"
        style={{
          width: isToggled ? "320px" : "45px",
          marginTop: userVerifyed ? (scrolled ? "0px" : "50px") : "0px",
        }}
      >
        <ul
          style={
            isToggled
              ? { background: "rgba(246,247,249,0.9)" }
              : { background: "transparent" }
          }
        >
          {navBars.map((s) => {
            return (
              <li key={s.id}>
                <NavLink to={s.to}>
                  <img src={s.icon} alt={s.nav} />
                  {s.nav}
                </NavLink>
              </li>
            );
          })}
        </ul>

        {/* sidebar içindeki sosyal media iconları */}
        <div
          style={{
            position: "absolute",
            bottom: "125px",
            background: "transparent",
            width: "100%",
            height: "auto",
            textAlign: "center",
            marginBottom: userVerifyed ? (scrolled ? "0px" : "50px") : "0px",
          }}
        >
          <SocialMediaIconsBar socialMediaIcons={socialMediaIcons} />
        </div>
      </div>
    </>
  );
}
SideBarNavigation.propTypes = {
  isToggled: PropTypes.bool.isRequired,
  userVerifyed: PropTypes.oneOfType([
    PropTypes.bool.isRequired,
    PropTypes.object.isRequired,
  ]),
  scrolled: PropTypes.bool.isRequired,
  navBars: PropTypes.array.isRequired,
  socialMediaIcons: PropTypes.array.isRequired,
};
SideBarNavigation.defaultProps = {
  isToggled: false,
  userVerifyed: {},
  scrolled: false,
  navBars: [],
  socialMediaIcons: [],
};
export default SideBarNavigation;
