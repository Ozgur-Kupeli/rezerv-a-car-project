import React, { Component } from "react";
import "./footer.scss";

export default class Footer extends Component {
  render() {
    return (
      <div className="footerContainer">
        <div className="footer">
          <p>Created By Özgür Küpeli.</p>
          <p>@2021</p>
          <p>Tüm Hakları Saklıdır.</p>
        </div>
      </div>
    );
  }
}
