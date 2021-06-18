import React, { Component } from "react";
import "./registerPage.scss";
import Navi from "../../parts/navi/Navi";
import Register from "../../components/register/UserRegister";
import Footer from "../../parts/footer/Footer";
import HeroImage from "../../parts/heroImage/HeroImage";

export default class RegisterPage extends Component {
  render() {
    return (
      <div className="container-flued">
        <Navi />
        <HeroImage />
        <div className="registerPageContainer container">
          <Register />
        </div>
        <Footer />;
      </div>
    );
  }
}
