import React, { Component } from "react";
import "./loginPage.scss";
import Login from "../../components/login/Login";
import Navi from "../../parts/navi/Navi";
import Footer from "../../parts/footer/Footer";
import HeroImage from "../../parts/heroImage/HeroImage";

export default class LoginPage extends Component {
  render() {
    return (
      <div className="container-flued" style={{ position: "relative" }}>
        <Navi />
        <HeroImage />
        <div className="container loginPageContainer">
          <div className="loginSide">
            <Login />
          </div>
        </div>
        <Footer />;
      </div>
    );
  }
}
