import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./Navi.scss";
import jwt_decode from "jwt-decode";
import UserInfo from "../../components/naviUserInfo/UserInfoComponent";
import navigation from "../../services/static/navigation.json";
import adminLoggedIn from "../../services/static/adminLoggedIn.json";
import userLoggedIn from "../../services/static/userLoggedIn.json";
import socialMediaIcons from "../../services/static/socialMediaIcons.json";
import UserExitModal from "../../components/naviUserExitModal/UserExitModal";
import HamburgerMenuButton from "../../components/naviHamburgerMenu/HamburgerMenuButton";
import SideBarNavigation from "../../components/naviSideBar/SideBarNavigation";
import SocialMediaIconsBar from "../../components/naviSocialMedia/SocialMediaIconsBar";

class Navi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrolled: false,
      isToggled: false,
      userVerifyed: localStorage.user_token
        ? this.userNameDecodeToken().user_status === "user"
          ? this.userVerify()
          : false
        : false,
      userName: localStorage.user_token
        ? this.userNameDecodeToken().user_status === "user"
          ? this.userNameDecodeToken().name
          : ""
        : "",
      modalOpen: false,
      navBars: localStorage.user_token
        ? this.userNameDecodeToken().user_status === "admin"
          ? adminLoggedIn
          : this.userVerify()
          ? userLoggedIn
          : navigation
        : navigation,

      socialMediaIcons,
    };
  }
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  //user kısmı
  userNameDecodeToken = () => {
    const decoded = jwt_decode(localStorage.user_token);
    return { name: decoded.user.name, user_status: decoded.user.user_status };
  };
  userVerify = async () => {
    try {
      const res = await fetch("http://localhost:3001/user/auth/user/verify", {
        method: "POST",
        headers: { token: localStorage.user_token },
      });
      const parseRes = await res.json();
      if (parseRes === true) {
        return true;
      } else {
        localStorage.removeItem("user_token");
        this.setState({
          userVerifyed: false,
          navBars: navigation,
        });

        return false;
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  cikisHandler = () => {
    this.setState({
      modalOpen: true,
    });
  };
  cikisYap = async () => {
    await localStorage.removeItem("user_token");
    await localStorage.removeItem("userName");

    window.location.reload(true);
  };
  cikisIptal = () => {
    this.setState({
      modalOpen: false,
    });
  };
  //User bilgi container bitiş
  handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 5) {
      this.setState({ scrolled: true });
    } else {
      this.setState({ scrolled: false });
    }
  };
  /* hamburger tıklama sidebar açma kapama için state */
  toggle = () => {
    this.setState({ isToggled: !this.state.isToggled });
  };

  render() {
    let navbarClasses = ["navBar"];
    let navbarYazi = ["a"];
    if (this.state.scrolled) {
      navbarClasses.push("scrolled");
      navbarYazi.push("yazi");
    }
    return (
      <div id="nonePrint">
        <UserInfo
          userVerifyed={this.state.userVerifyed}
          name={this.state.userName}
          quit={this.cikisHandler}
        />
        <nav className={navbarClasses.join(" ")}>
          {/* navigation */}
          <ul>
            {this.state.navBars.map((n) => {
              return (
                <li key={n.id}>
                  <NavLink to={n.to} className={`a ${navbarYazi.join(" ")}`}>
                    {n.nav}
                  </NavLink>
                </li>
              );
            })}
          </ul>
          {/* logo */}
          <div id="logo">
            <NavLink exact to="/">
              <img src={"/navImage/logo.png"} alt="logo" />
            </NavLink>
          </div>

          {/* sosyal media ikonları */}
          <div id="socialMediaBar">
            <SocialMediaIconsBar
              socialMediaIcons={this.state.socialMediaIcons}
            />
          </div>

          {/* HamburgerMenuButton */}
          <div id="HamburgerMenuButton">
            <HamburgerMenuButton
              openCloseFunc={this.toggle}
              isToggled={this.state.isToggled}
            />
          </div>
        </nav>

        {/* sidebar navigation  */}
        <div id="SideBarNavigation">
          <SideBarNavigation
            isToggled={this.state.isToggled}
            userVerifyed={this.state.userVerifyed}
            scrolled={this.state.scrolled}
            navBars={this.state.navBars}
            socialMediaIcons={this.state.socialMediaIcons}
          />
        </div>

        {/* UserExitModal */}
        <UserExitModal
          isOpen={this.state.modalOpen}
          exitFunc={this.cikisYap}
          cancelFunc={this.cikisIptal}
        />
      </div>
    );
  }
}
export default Navi;
