import React, { Component } from "react";
import "./cars.scss";
import { withRouter } from "react-router-dom";
import * as displayAction from "../../redux/actions/displayAction";
import * as carAction from "../../redux/actions/carAction";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import AracGelmedi from "./AracGelmedi";

import CarInfo from "./CarInfo";
import CarPriceInfo from "./CarPriceInfo";
import { Helmet } from "react-helmet";

class Cars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: [],
    };
  }
  componentDidMount() {
    this.props.actions.getCars(); //araçlar redux tan geliyor çünkü rezerv.js girilen tarihlere göre uygun olanları getiriyor(değiştiriyor diziyi)
    this.props.actions.falseDisplay();
    //giriş yapmış kullanıcı için; rezervasyon bilgilerini session"a atıp ordan alanları otomatik doldurduğumuz için
    //eski bilgileri varsa siliyoruz başlangıçta
    sessionStorage.removeItem("arac_id");
    sessionStorage.removeItem("arac_name");
    sessionStorage.removeItem("arac_daily_price");
    sessionStorage.removeItem("arac_image");
    sessionStorage.removeItem("rpo"); //rezervasyon pickup office
    sessionStorage.removeItem("rg"); //rezervasyon gün sayısı
    sessionStorage.removeItem("rdo"); //rezervasyon delivery office
    sessionStorage.removeItem("rddt"); //rezervasyon delivery date time
    sessionStorage.removeItem("rpdt"); //rezervasyon pickup date time
  }

  carSelectHandle = async (id) => {
    // seçili aracı sessionStorage at
    await fetch(`http://localhost:3001/cars/get/id/${id}`)
      .then((response) => response.json())
      .then((json) => {
        sessionStorage.setItem("arac_id", json.id);
        sessionStorage.setItem("arac_name", json.name);
        sessionStorage.setItem("arac_daily_price", json.daily_price);
        sessionStorage.setItem("arac_image", json.image);
      })
      .catch((error) => console.log("db'den aracı çekerken hata : ", error));
    setTimeout(() => {
      this.props.history.push("/rezervasyon");
    }, 500);
  };

  render() {
    if (this.props.cars.length <= 0) return <AracGelmedi />;
    return (
      <div className="container-flued">
        <div className="container">
          <div className="row">
            {this.props.cars.map((car) => (
              <div
                className="col-12 col-sm-12 col-md-9 col-lg-6 col-xl-4"
                key={car.id}
              >
                <div className="cardContainer">
                  <Helmet>
                    <meta name="description" content={car.name} />
                    <meta
                      name="keywords"
                      content={(car.image, car.gear, car.fuel, car.daily_price)}
                    />
                  </Helmet>
                  <CarInfo
                    name={car.name}
                    image={car.image}
                    number_of_people={car.number_of_people}
                    number_of_suitcase={car.number_of_suitcase}
                    gear={car.gear}
                    fuel={car.fuel}
                  />
                  <CarPriceInfo
                    age_limit={car.age_limit}
                    license_age={car.license_age}
                    daily_price={car.daily_price}
                    id={car.id}
                    dissplay={this.props.dissplay}
                    carSelectHandle={this.carSelectHandle}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cars: state.carListReducer,
    dissplay: state.displayReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getCars: bindActionCreators(carAction.getCars, dispatch),
      falseDisplay: bindActionCreators(displayAction.falseDisplay, dispatch),
    },
  };
}
export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Cars);
