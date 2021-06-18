import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as displayAction from "../../redux/actions/displayAction";
import * as carAction from "../../redux/actions/carAction";
import * as rezervasyonAction from "../../redux/actions/rezervasyonAction";
import { Col, Form, Row, Button, FormText } from "reactstrap";
import RezervInputs from "./RezervInputs";
import {
  isTheCarAvailable,
  gunHesapla,
  timeRange,
} from "../../utils/RezervJsUtils";
import { Helmet } from "react-helmet";

class Reserv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickup_date_time: "",
      delivery_date_time: "",
      pickup_office: "",
      pickup_date: "",
      pickup_time: "",
      delivery_office: "",
      delivery_date: "",
      delivery_time: "",
      kac_gun: 0,
      offices: [],
      hata: "",
      dissplay: "none",
      yokDisplay: false,
    };
  }
  componentDidMount() {
    this.fetchData();
    this.isTheRezervAvailable();

    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
  }

  fetchData() {
    //ofisleri çek ki select box'ta görünsün
    fetch("http://localhost:3001/offices/get")
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          offices: json, //.offices ile offices nesnesinin içeriğini al diyoruz çünü api bize içeriği değil offices nesnesini döndürüyor
        });
      })
      .catch((error) => console.log("db'den ofisleri çekerken hata : ", error));
  }

  isEmty = (string) => {
    //giriş boş mu
    if (string.trim() === "") return true;
    else return false;
  };
  dayRange = (x, y) => {
    //giriş tarih kontrolü
    let delivery_days = Math.floor(Date.parse(x) / (1000 * 60 * 60 * 24));
    let pickup_days = Math.floor(Date.parse(y) / (1000 * 60 * 60 * 24));
    if (delivery_days - pickup_days < 0) return true;
    else return false;
  };

  isClickForTrueDisplay = () => {
    this.props.action.trueDisplay();
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.kac_gun !== this.state.kac_gun) {
      return true;
    }
  }

  isTheRezervAvailable() {
    //sadece aktif rezervasyonları db den çekerek initialState'in şişmesine engel ol
    //günü geçen zerervasyonlar değil sadece aktif rezervasyonlar state'e gönderilir.
    //bu işlem ile şuan'dan önce teslim tarihi olan rezervasyonları eleyip,
    //güncel rezervasyonları getirecektir. aşağıda delivery-hour +12 ile 12 saat önce biten rezervasyonları
    //eski rezervasyon olarak kabul etmiş oluyoruz.
    let rezervasyon = [];
    fetch("http://localhost:3001/api/v2/reservation/aktif")
      .then((response) => response.json())
      .then((arr) =>
        arr.filter(function (value, index, array) {
          let new_date_time = Date.parse(new Date());
          let delivery_date_time = parseInt(value.delivery_date_time);
          return delivery_date_time + 12 * 60 * 60 * 1000 > new_date_time; //iade saatinden 12 saat geçmiş olan rezervasyonlardan geçmişte kalmayanları getir
        })
      )
      .then((json) => {
        rezervasyon.push(json);
      })
      .catch((error) =>
        console.log("db'den rezervasyonları çekerken hata : ", error)
      );
    this.props.action.getRezerv(rezervasyon);
  }

  pickupDateTime = (date, time) => {
    let x = Date.parse(`${date}T${time}`);
    this.setState({
      pickup_date_time: x,
    });
  };
  deliveryDateTime = (date, time) => {
    let x = Date.parse(`${date}T${time}`);
    this.setState({
      delivery_date_time: x,
    });
  };
  async handleInput() {
    //hata mesajları ve fonksiyon çalıştırma
    if (this.isEmty(this.state.pickup_office)) {
      this.setState({ dissplay: "block" });
      this.setState({ hata: "Alış ofisi boş bırakılamaz!" });
    } else if (this.isEmty(this.state.pickup_date)) {
      this.setState({ dissplay: "block" });
      this.setState({ hata: "Alış tarihi boş bırakılamaz!" });
    } else if (this.isEmty(this.state.pickup_time)) {
      this.setState({ dissplay: "block" });
      this.setState({ hata: "Alış saati boş bırakılamaz!" });
    } else if (this.isEmty(this.state.delivery_office)) {
      this.setState({ dissplay: "block" });
      this.setState({ hata: "İade ofisi boş bırakılamaz!" });
    } else if (this.isEmty(this.state.delivery_date)) {
      this.setState({ dissplay: "block" });
      this.setState({ hata: "İade tarihi boş bırakılamaz!" });
    } else if (this.isEmty(this.state.delivery_time)) {
      this.setState({ dissplay: "block" });
      this.setState({ hata: "İade saati boş bırakılamaz!" });
    } else if (
      timeRange(
        this.state.pickup_time,
        this.state.delivery_time,
        this.state.pickup_date,
        this.state.delivery_date
      )
    ) {
      this.setState({ dissplay: "block" });
      this.setState({ hata: "En az 1 saatlik araç kiralayabilirsiniz!" });
    } else if (
      this.dayRange(this.state.delivery_date, this.state.pickup_date)
    ) {
      this.setState({ dissplay: "block" });
      this.setState({ hata: "İade tarihi alış tarihinden önce olamaz!" });
    } else {
      this.setState({ dissplay: "none" });
      await this.pickupDateTime(this.state.pickup_date, this.state.pickup_time);
      await this.deliveryDateTime(
        this.state.delivery_date,
        this.state.delivery_time
      );
      let gun = await gunHesapla(
        this.state.pickup_date,
        this.state.delivery_date,
        this.state.pickup_time,
        this.state.delivery_time
      );
      await this.setState({ kac_gun: gun });
      await this.isClickForTrueDisplay();
      //ekranı aşağı kaydırmak için önce en üste alıyoruz
      //sonra tarayıcı yüksekliği-80 px aşağı kaydırıyoruz
      await window.scrollTo(0, 0);
      await window.scrollTo(0, 780);

      await this.sessionStorageAddRezervInfo();

      /**aracın rezerv olmayanları getir */

      await isTheCarAvailable(
        this.state.pickup_date_time,
        this.state.delivery_date_time,
        this.props.getRezervedCars
      ).then((object) =>
        object.length > 0
          ? (this.props.action.getCarSuccess(object),
            this.setState({ yokDisplay: false }))
          : (this.props.action.getCarSuccess(object),
            this.setState({ yokDisplay: true }))
      );
    }
  }
  sessionStorageAddRezervInfo = () => {
    sessionStorage.setItem("rpo", this.state.pickup_office);
    sessionStorage.setItem("rpdt", this.state.pickup_date_time);
    sessionStorage.setItem("rdo", this.state.delivery_office);
    sessionStorage.setItem("rddt", this.state.delivery_date_time);
    sessionStorage.setItem("rg", this.state.kac_gun);
  };
  render() {
    return (
      <div
        className="container-flued"
        style={{ borderBottom: "1px solid #292b2c" }}
      >
        <Helmet>
          <meta name="description" content="Rezervasyon tarihi seç" />
          <meta
            name="keywords"
            content="Rezervasyon tarihi seç, rezervasyon, tarih, tarhi, rezervasyon tarihi, alış tarihi, alış, alış saati, iade, iade tarihi, iade saati"
          />
        </Helmet>
        <Col
          xs={10}
          sm={9}
          className="container"
          style={{
            //width: "80%",
            margin: "0 auto",
            background: "transparent",
          }}
        >
          <Form
            style={{
              border: "1px solid #d3d3d3",
              padding: "1em 0",
              borderRadius: "0",
              margin: "1em auto",
              background: "#642978",
            }}
          >
            <Row
              style={{
                background: "transparent",
                margin: "0 auto",
                padding: "0",
              }}
            >
              <Col
                lg={6}
                style={{ background: "#642978", margin: ".25em auto" }}
              >
                <RezervInputs
                  officeLabel="Alış Ofisi"
                  officeValue={this.state.pickup_office}
                  officeOnChange={(event) =>
                    this.setState({
                      pickup_office: event.target.value,
                      delivery_office: event.target.value,
                    })
                  }
                  officeList={this.state.offices}
                  dateLabel="Alış Tarihi"
                  dateValue={this.state.pickup_date}
                  dateOnChange={(event) =>
                    this.setState({
                      pickup_date: event.target.value,
                    })
                  }
                  timeLabel="Alış Saati"
                  timeValue={this.state.pickup_time}
                  timeOnChange={(event) =>
                    this.setState({
                      pickup_time: event.target.value,
                      delivery_time: event.target.value,
                    })
                  }
                />
              </Col>
              <Col
                lg={6}
                style={{ background: "#642978", margin: ".25em auto" }}
              >
                <RezervInputs
                  officeLabel="İade Ofisi"
                  officeValue={this.state.delivery_office}
                  officeOnChange={(event) =>
                    this.setState({
                      delivery_office: event.target.value,
                    })
                  }
                  officeList={this.state.offices}
                  dateLabel="İade Tarihi"
                  dateValuePickup={this.state.pickup_date}
                  dateValue={this.state.delivery_date}
                  dateOnChange={(event) =>
                    this.setState({
                      delivery_date: event.target.value,
                    })
                  }
                  timeLabel="İade Saati"
                  timeValue={this.state.delivery_time}
                  timeOnChange={(event) =>
                    this.setState({ delivery_time: event.target.value })
                  }
                />
              </Col>
            </Row>

            <FormText
              color="text-light"
              style={{
                textAlign: "center",
                display: this.state.dissplay,
                fontSize: "16px",
                margin: "1em 0 0 0",
                color: "#f7f7f7",
                background: "transparent",
              }}
            >
              {this.state.hata}
            </FormText>
            <Button
              onClick={(e) => this.handleInput()}
              ref={this.element}
              style={{
                width: "50%",
                margin: "1em 25%",
                background: "#23022e",
                border: "1px solid #f7f7f7",
                color: "#f7f7f7",
                borderRadius: "0",
              }}
            >
              ARA
            </Button>
          </Form>
        </Col>
        <h5
          style={{
            textAlign: "center",
            marginBottom: "1em",
            color: "#23022e",
            display: this.state.yokDisplay ? "block" : "none",
          }}
        >
          SEÇİLEN TARİHLERDE UYGUN ARAÇ BULUNAMADI!
        </h5>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    dissplay: state.displayReducer,
    getRezervedCars: state.rezervasyonReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    action: {
      trueDisplay: bindActionCreators(displayAction.trueDisplay, dispatch),
      falseDisplay: bindActionCreators(displayAction.falseDisplay, dispatch),
      getRezerv: bindActionCreators(rezervasyonAction.getRezerv, dispatch),
      getCarSuccess: bindActionCreators(carAction.getCarSuccess, dispatch),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Reserv);
