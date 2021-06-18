import React, { Component } from "react";
import "./heroImage.scss";

export default class HeroImage extends Component {
  render() {
    return (
      <div className="heroImageContainer">
        <div style={{ backgroundImage: `url("/navImage/carHeroImage.jpg")` }}>
          <div></div>
        </div>
      </div>
    );
  }
}
