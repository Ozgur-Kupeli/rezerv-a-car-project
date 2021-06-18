import React, { Component } from "react";
import "./rezervasyon.scss";
import { withRouter } from "react-router-dom";
import randomstring from "randomstring";
import axios from "axios";
import Navi from "../../parts/navi/Navi";
import Footer from "../../parts/footer/Footer";
import HeroImage from "../../parts/heroImage/HeroImage";
import jwt_decode from "jwt-decode";
import RezervasyonCarAndOfficeInfo from "./RezervasyonCarAndOfficeInfo";
import RezervasyonUserInfo from "./RezervasyonUserInfo";
import { Col, Row } from "reactstrap";
import RezervasyonModal from "./RezervasyonModal";

class Rezervasyon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rezervasyonModal: false,
      arac: {
        id: sessionStorage.arac_id || "",
        name: sessionStorage.arac_name || "",
        daily_price: sessionStorage.arac_daily_price || "",
        image: sessionStorage.arac_image || "",
      },
      rezervasyon: {
        pickup_office: sessionStorage.rpo || "",
        pickup_date_time: sessionStorage.rpdt || "",
        delivery_date_time: sessionStorage.rddt || "",
        delivery_office: sessionStorage.rdo || "",
        kac_gun: sessionStorage.rg || "",
      },
      rezervasyonNo: "",
      rezervasyonOluşturmaTarihi: "",
      rezervasyonOluşturmaSaati: "",
      rezerv_date_time: "",
      pickup_office_id: "",
      delivery_office_id: "",
      musteri_id: localStorage.user_token ? this.userDecodeToken().id : "",
      adSoyad: localStorage.user_token ? this.userDecodeToken().name : "",
      tc: localStorage.user_token ? this.userDecodeToken().tc : "",
      dogumTar: localStorage.user_token
        ? new Date(parseInt(this.userDecodeToken().dogumTar))
            .toISOString()
            .split("T")[0]
        : "",
      ehliyetTar: localStorage.user_token
        ? new Date(parseInt(this.userDecodeToken().ehliyetTar))
            .toISOString()
            .split("T")[0]
        : "",
      cinsiyet: localStorage.user_token ? this.userDecodeToken().cinsiyet : "",
      eposta: localStorage.user_token ? this.userDecodeToken().eposta : "",
      telefon: localStorage.user_token ? this.userDecodeToken().tel : "",
      adres: localStorage.user_token ? this.userDecodeToken().adres : "",
      display: "none",
      displayContainer: false,
      hata: "",
      durum: "AKTİF",
    };
  }
  userDecodeToken = () => {
    const decoded = jwt_decode(localStorage.user_token);
    return decoded.user;
  };

  tcNoFormat = (string) => {
    const regEx = /^[0-9]+$/g;
    if (string.split("").length < 11) {
      return true;
    } else if (!string.match(regEx)) {
      //rakam dışında birşey varsa
      return true;
    } else if (string.split("")[10] % 2 === 1) {
      return true;
    } else {
      return false;
    }
  };
  telNoFormat = (string) => {
    const regEx = /^[0-9]+$/g;
    if (string.split("").length < 10) {
      return true;
    } else if (!string.match(regEx)) {
      //rakam dışında birşey varsa
      return true;
    } else {
      return false;
    }
  };
  emailFormat = (string) => {
    const regEx =
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;
    if (!string.match(regEx)) {
      return true;
    } else {
      return false;
    }
  };
  dogumTarihi = (string) => {
    let x = new Date().toISOString().split("T")[0];
    let once = Date.parse(x) - 599594400000;
    let dogum = Date.parse(string);
    if (dogum > once) {
      return true;
    } else return false;
  };
  ehliyetTarihi = (string1, string2) => {
    let birYilOnce =
      Date.parse(new Date().toISOString().split("T")[0]) - 31557600000;
    let ehliyetAlis = Date.parse(string1);
    let dogumArtiOnsekiz = Date.parse(string2) + 568036800000;

    if (ehliyetAlis > birYilOnce || dogumArtiOnsekiz > ehliyetAlis) {
      return true;
    } else return false;
  };
  isEmty = (string) => {
    //giriş boş mu
    if (string.trim() === "") return true;
    else return false;
  };

  handleInput = async (e) => {
    e.preventDefault();
    if (this.isEmty(this.state.adSoyad)) {
      this.setState({
        hata: "Ad Soyad Alanı Boş Bırakılamaz!",
        display: "block",
      });
    } else if (this.isEmty(this.state.tc)) {
      this.setState({
        hata: "TC Kimlik Numarası Alanı Boş Bırakılamaz!",
        display: "block",
      });
    } else if (this.tcNoFormat(this.state.tc)) {
      this.setState({
        hata: "TC Kimlik Numarası Hatalı!",
        display: "block",
      });
    } else if (this.isEmty(this.state.dogumTar)) {
      this.setState({
        hata: "Doğum Tarihi Boş Bırakılamaz!",
        display: "block",
      });
    } else if (this.dogumTarihi(this.state.dogumTar)) {
      this.setState({
        hata: "Doğum Tarihi Hatalı!",
        display: "block",
      });
    } else if (this.isEmty(this.state.ehliyetTar)) {
      this.setState({
        hata: "Ehliyet Alış Tarihi Boş Bırakılamaz!",
        display: "block",
      });
    } else if (this.ehliyetTarihi(this.state.ehliyetTar, this.state.dogumTar)) {
      this.setState({
        hata: "Ehliyet Alış Tarihi Hatalı!",
        display: "block",
      });
    } else if (
      this.isEmty(this.state.cinsiyet) ||
      this.state.cinsiyet === "..."
    ) {
      this.setState({
        hata: "Cinsiyet Alanı Boş Bırakılamaz!",
        display: "block",
      });
    } else if (this.isEmty(this.state.eposta)) {
      this.setState({
        hata: "Eposta Alanı Boş Bırakılamaz!",
        display: "block",
      });
    } else if (this.emailFormat(this.state.eposta)) {
      this.setState({
        hata: "Eposta Hatalı!",
        display: "block",
      });
    } else if (this.isEmty(this.state.telefon)) {
      this.setState({
        hata: "Telefon Numarası Alanı Boş Bırakılamaz!",
        display: "block",
      });
    } else if (this.telNoFormat(this.state.telefon)) {
      this.setState({
        hata: "Telefon Numarası Hatalı!",
        display: "block",
      });
    } else if (this.isEmty(this.state.adres)) {
      this.setState({
        hata: "Adres Alanı Boş Bırakılamaz!",
        display: "block",
      });
    } else {
      let rezerv_date_time = Date.parse(new Date());
      await this.setState({
        hata: "",
        display: "none",
        rezervasyonNo: randomstring.generate(10),
        rezervasyonOluşturmaTarihi: new Date(
          rezerv_date_time
        ).toLocaleDateString("tr-TR"),
        rezervasyonOluşturmaSaati: new Date(
          rezerv_date_time
        ).toLocaleTimeString("tr-TR"),
        displayContainer: true,
        rezerv_date_time: rezerv_date_time,
      });

      let _data = {
        ad_soyad: this.state.adSoyad,
        tc_no: this.state.tc,
        cinsiyet: this.state.cinsiyet,
        dogum_tarihi: Date.parse(this.state.dogumTar),
        ehliyet_alis_tarihi: Date.parse(this.state.ehliyetTar),
        telefon_no: this.state.telefon,
        eposta: this.state.eposta,
        adres: this.state.adres,
      };
      //müşteriyi kaydet
      await axios
        .post("http://localhost:3001/api/v2/post/customer", _data)
        .catch((err) => console.log(err));
      //müşterinin id sini db den çek ve state musteri_id ye ata

      await axios
        .get(`http://localhost:3001/api/v2/get/customer/${this.state.tc}`)
        .then((json) => {
          this.setState({
            musteri_id: json.data,
          });
        })
        .catch((error) =>
          console.log("db'den müşteri_id çekerken hata : ", error)
        );

      await axios
        .get(
          `http://localhost:3001/offices/get/name/${this.state.rezervasyon.pickup_office}`
        )
        .then((json) => {
          this.setState({
            pickup_office_id: json.data,
          });
        })
        .catch((error) =>
          console.log("db'den müşteri_id çekerken hata : ", error)
        );
      await axios
        .get(
          `http://localhost:3001/offices/get/name/${this.state.rezervasyon.delivery_office}`
        )
        .then((json) => {
          this.setState({
            delivery_office_id: json.data,
          });
        })
        .catch((error) =>
          console.log("db'den müşteri_id çekerken hata : ", error)
        );
      let rezerv_data = {
        car_id: this.state.arac.id,
        pickup_office_id: this.state.pickup_office_id,
        delivery_office_id: this.state.delivery_office_id,
        pickup_date_time: this.state.rezervasyon.pickup_date_time,
        delivery_date_time: this.state.rezervasyon.delivery_date_time,
        total_day: this.state.rezervasyon.kac_gun,
        rezerv_no: this.state.rezervasyonNo,
        rezerv_date_time: this.state.rezerv_date_time,
        customer_id: this.state.musteri_id,
        durum: this.state.durum,
      };
      //müşteriyi kaydet
      await axios
        .post("http://localhost:3001/api/v2/post/rezervasyon", rezerv_data)
        .catch((err) => console.log(err));

      ///burda modal ac
      this.setState({
        rezervasyonModal: true,
      });
    }
  };
  handlePrint = async () => {
    await this.setState({
      rezervasyonModal: false,
    });
    await window.print();
    await sessionStorage.removeItem("arac_id");
    await sessionStorage.removeItem("arac_name");
    await sessionStorage.removeItem("arac_daily_price");
    await sessionStorage.removeItem("arac_image");
    await sessionStorage.removeItem("rpo");
    await sessionStorage.removeItem("rg");
    await sessionStorage.removeItem("rdo");
    await sessionStorage.removeItem("rddt");
    await sessionStorage.removeItem("rpdt");
    this.props.history.push("/");
  };
  handleTamam = async () => {
    await sessionStorage.removeItem("arac_id");
    await sessionStorage.removeItem("arac_name");
    await sessionStorage.removeItem("arac_daily_price");
    await sessionStorage.removeItem("arac_image");
    await sessionStorage.removeItem("rpo");
    await sessionStorage.removeItem("rg");
    await sessionStorage.removeItem("rdo");
    await sessionStorage.removeItem("rddt");
    await sessionStorage.removeItem("rpdt");
    this.setState({
      rezervasyonModal: false,
    });
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="container-flued rezervasyonPage">
        <Navi className="nonPrintible" />
        <HeroImage className="nonPrintible" />
        <div className="container printible">
          <div
            className="printible"
            style={{
              width: "100%",
              margin: "16px auto",
              display: this.state.rezervasyonNo !== "" ? "block" : "none",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div style={{ width: "50%", textAlign: "center" }}>
                <p style={{ fontSize: "14px" }}>
                  Rezervasyon Numarası :{" "}
                  <span style={{ fontSize: "18px" }}>
                    {this.state.rezervasyonNo}
                  </span>
                </p>
              </div>
              <div style={{ width: "50%", textAlign: "center" }}>
                <p style={{ fontSize: "14px" }}>
                  Rezervasyon Tarihi :{" "}
                  <span style={{ fontSize: "18px" }}>
                    {new Date(
                      parseInt(this.state.rezerv_date_time)
                    ).toLocaleString("tr-TR")}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <Row style={{ margin: "0 auto", padding: "0" }}>
            <Col lg={6} style={{ margin: "16px auto", padding: " 0 8px" }}>
              <RezervasyonCarAndOfficeInfo
                image={this.state.arac.image}
                name={this.state.arac.name}
                pickup_office={this.state.rezervasyon.pickup_office}
                pickup_date_time={this.state.rezervasyon.pickup_date_time}
                delivery_office={this.state.rezervasyon.delivery_office}
                delivery_date_time={this.state.rezervasyon.delivery_date_time}
                daily_price={this.state.arac.daily_price}
                kac_gun={this.state.rezervasyon.kac_gun}
              />
            </Col>
            <Col lg={6} style={{ margin: "16px auto", padding: "0 8px" }}>
              <RezervasyonUserInfo
                adSoyad={this.state.adSoyad}
                adSoyadFunc={(event) =>
                  this.setState({
                    adSoyad: event.target.value,
                  })
                }
                tc={this.state.tc}
                tcFunc={(event) =>
                  this.setState({
                    tc: event.target.value,
                  })
                }
                dogumTar={this.state.dogumTar}
                dogumTarFunc={(event) =>
                  this.setState({
                    dogumTar: event.target.value,
                  })
                }
                ehliyetTar={this.state.ehliyetTar}
                ehliyetTarFunc={(event) =>
                  this.setState({
                    ehliyetTar: event.target.value,
                  })
                }
                cinsiyet={this.state.cinsiyet}
                cinsiyetFunc={(event) =>
                  this.setState({
                    cinsiyet: event.target.value,
                  })
                }
                eposta={this.state.eposta}
                epostaFunc={(event) =>
                  this.setState({
                    eposta: event.target.value,
                  })
                }
                telefon={this.state.telefon}
                telefonFunc={(event) =>
                  this.setState({
                    telefon: event.target.value,
                  })
                }
                adres={this.state.adres}
                adresFunc={(event) =>
                  this.setState({
                    adres: event.target.value,
                  })
                }
                hata={this.state.hata}
                display={this.state.display}
                handleInputFunc={(e) => this.handleInput(e)}
                printNone={this.state.rezervasyonNo}
              />
            </Col>
          </Row>
        </div>
        <RezervasyonModal
          className="nonPrintible"
          rezervasyonModalOpen={this.state.rezervasyonModal}
          rezervasyonNo={this.state.rezervasyonNo}
          modalCloseHandle={this.handleTamam}
          modalPrintHandle={this.handlePrint}
        />
        <Footer />
      </div>
    );
  }
}

export default withRouter(Rezervasyon);
