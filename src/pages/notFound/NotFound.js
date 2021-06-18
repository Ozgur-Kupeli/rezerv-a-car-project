import React, { Component } from "react";
import "./notFound.scss";

export default class NotFound extends Component {
  componentDidMount() {
    window.onbeforeunload = function () {
      window.scrollTo(0, 180);
    };
  }
  render() {
    return (
      <div className="containerr">
        <div className="con">
          <div className="bir">404</div>
          <div className="iki">SAYFA BULUNAMADI!</div>
          <a href="/" className="active alink">
            Ana Sayfa
          </a>
        </div>
      </div>
    );
  }
}
