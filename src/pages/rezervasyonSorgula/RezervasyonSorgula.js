import React, { Component } from "react";
import "./rezervasyonSorgula.scss";
import axios from "axios";
import { Button, Modal, ModalFooter, Col, Row } from "reactstrap";
import { NavLink } from "react-router-dom";
import Navigation from "../../parts/navi/Navi";
import Footer from "../../parts/footer/Footer";
import HeroImage from "../../parts/heroImage/HeroImage";
import jwt_decode from "jwt-decode";
import RezervasyonCarAndOfficeInfo from "../../components/rezervasyon/RezervasyonCarAndOfficeInfo";
import RezervasyonUserInfo from "../../components/rezervasyon/RezervasyonUserInfo";
import CarListhCameWithTC from "./CarListhCameWithTC";
import LoadingAnimation from "../../components/LoadingAnimation";
import RezervasyonSorguPaneli from "./RezervasyonSorguPaneli";
import { Helmet } from "react-helmet";

class RezervasyonSorgula extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      selected: true,
      bilgiDisplay: false,
      tc: "",
      rezervNo: "",
      musteri: {
        id: "",
        ad_soyad: "",
        tc_no: "",
        cinsiyet: "",
        dogum_tarihi: "",
        ehliyet_alis_tarihi: "",
        telefon_no: "",
        eposta: "",
        adres: "",
      },
      rezervasyon: {
        car_id: "",
        pickup_office_id: "",
        delivery_office_id: "",
        pickup_date_time: "",
        delivery_date_time: "",
        rezerv_date_time: "",
        total_day: "",
        durum: "",
        customer_id: "",
      },
      arac: {
        name: "",
        image: "",
        daily_price: "",
      },
      tcHata: "",
      rezervNoHata: "",
      pickup_office: "",
      delivery_office: "",
      sorgulananRezervasyonlar: [],
      tcCarDisplay: false,
      loadAnimation: false,
    };
  }
  componentDidMount() {
    this.userVerify();
  }
  userVerify = async () => {
    try {
      const res = await fetch("http://localhost:3001/user/auth/user/verify", {
        method: "POST",
        headers: { token: localStorage.user_token },
      });

      const parseRes = await res.json();
      if (parseRes === true) {
        const decoded = jwt_decode(localStorage.user_token);
        this.setState({
          tc: decoded.user.tc,
        });
      } else {
        this.setState({
          tc: "",
        });
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  onClickSelectedHandle = (e) => {
    e.preventDefault();

    this.setState({ selected: !this.state.selected });
  };
  onClickTCHandle = async (e) => {
    e.preventDefault();

    await axios
      .get(`http://localhost:3001/api/v2/get/rezervasyon/tc/${this.state.tc}`)
      .then((json) => {
        if (json.data === "") {
          this.setState({
            tcHata: "Rezervasyon Bulunamadı! Hatalı TC No!",
          });
        } else {
          this.setState({
            tcHata: "",
            loadAnimation: true,
            musteri: {
              id: json.data.id,
              ad_soyad: json.data.ad_soyad,
              tc_no: json.data.tc_no,
              cinsiyet: json.data.cinsiyet,
              dogum_tarihi: json.data.dogum_tarihi,
              ehliyet_alis_tarihi: json.data.ehliyet_alis_tarihi,
              telefon_no: json.data.telefon_no,
              eposta: json.data.eposta,
              adres: json.data.adres,
            },
          });
        }
      })
      .catch((error) =>
        console.log("db'den müşteriyi çekerken hata : ", error)
      );
    await axios
      .get(
        `http://localhost:3001/api/v2/get/rezervasyon/customer/id/${this.state.musteri.id}`
      )
      .then((json) => {
        //
        let x = [];

        json.data.forEach((elem) => {
          let y = {
            id: "",
            car_id: "",
            image: "",
            name: "",
            durum: "",
            delivery: "",
            pickup: "",
          };
          y.id = elem.rezerv_id;
          y.car_id = elem.car_id;
          y.durum = elem.durum;
          y.delivery = elem.delivery_date_time;
          y.pickup = elem.pickup_date_time;
          x.push(y);
        });
        x.forEach((elem) => {
          axios
            .get(`http://localhost:3001/cars/get/id/${elem.car_id}`)
            .then((res) => {
              elem.image = res.data.image;
              elem.name = res.data.name;
            })
            .catch((error) =>
              console.log("db'den arac adı ve resmini çekerken hata : ", error)
            );
        });
        this.setState({ sorgulananRezervasyonlar: x });
        setTimeout(() => {
          this.setState({ tcCarDisplay: true, loadAnimation: false });
        }, 1000);
      })
      .catch((error) =>
        console.log("db'den rezervasyonu çekerken hata : ", error)
      );
  };
  tcSelectedRezerv = async (rezerv_id) => {
    await axios
      .get(`http://localhost:3001/api/v2/reservation/id/${rezerv_id}`)
      .then((json) => {
        this.setState({
          rezervasyon: {
            car_id: json.data.car_id,
            pickup_office_id: json.data.pickup_office_id,
            delivery_office_id: json.data.delivery_office_id,
            pickup_date_time: json.data.pickup_date_time,
            delivery_date_time: json.data.delivery_date_time,
            total_day: json.data.total_day,
            rezerv_date_time: json.data.rezerv_date_time,
            durum: json.data.durum,
          },
          rezervNo: json.data.rezerv_no,
        });
      })
      .catch((error) =>
        console.log("db'den rezervasyonu çekerken hata : ", error)
      );
    await axios
      .get(
        `http://localhost:3001/offices/get/id/${this.state.rezervasyon.pickup_office_id}`
      )
      .then((json) => {
        this.setState({
          pickup_office: json.data,
        });
      })
      .catch((error) =>
        console.log("db'den alış ofisini çekerken hata : ", error)
      );
    await axios
      .get(
        `http://localhost:3001/offices/get/id/${this.state.rezervasyon.delivery_office_id}`
      )
      .then((json) => {
        this.setState({
          delivery_office: json.data,
        });
      })
      .catch((error) =>
        console.log("db'den iade ofisini çekerken hata : ", error)
      );
    await axios
      .get(`http://localhost:3001/cars/get/id/${this.state.rezervasyon.car_id}`)
      .then((json) => {
        this.setState({
          arac: {
            name: json.data.name,
            image: json.data.image,
            daily_price: json.data.daily_price,
          },
        });
      })
      .catch((error) =>
        console.log("db'den aracı ofisini çekerken hata : ", error)
      );
    await this.setState({ bilgiDisplay: true, tcCarDisplay: false });
    await window.scrollTo(0, 0);
    await window.scrollBy(0, 620);
  };
  onClickRezervNoHandle = async (e) => {
    e.preventDefault();
    await axios
      .get(
        `http://localhost:3001/api/v2/get/rezervasyon/no/${this.state.rezervNo}`
      )
      .then((json) => {
        if (json.data === "") {
          this.setState({
            rezervNoHata: "Rezervasyon Bulunamadı! Hatalı Rezervasyon No!",
          });
        } else {
          this.setState({
            rezervNoHata: "",
            rezervasyon: {
              car_id: json.data.car_id,
              pickup_office_id: json.data.pickup_office_id,
              delivery_office_id: json.data.delivery_office_id,
              pickup_date_time: json.data.pickup_date_time,
              delivery_date_time: json.data.delivery_date_time,
              total_day: json.data.total_day,
              rezerv_date_time: json.data.rezerv_date_time,
              durum: json.data.durum,
              customer_id: json.data.customer_id,
            },
            rezervNo: json.data.rezerv_no,
          });
        }
      })
      .catch((error) =>
        console.log("db'den rezervasyonu çekerken hata : ", error)
      );
    await axios //get delivery office
      .get(
        `http://localhost:3001/offices/get/id/${this.state.rezervasyon.delivery_office_id}`
      )
      .then((json) => {
        this.setState({
          delivery_office: json.data,
        });
      })
      .catch((error) =>
        console.log("db'den iade ofisini çekerken hata : ", error)
      );
    await axios
      .get(`http://localhost:3001/cars/get/id/${this.state.rezervasyon.car_id}`)
      .then((json) => {
        this.setState({
          arac: {
            name: json.data.name,
            image: json.data.image,
            daily_price: json.data.daily_price,
          },
        });
      })
      .catch((error) => console.log("db'den aracı çekerken hata : ", error));
    await axios //get delivery office
      .get(
        `http://localhost:3001/offices/get/id/${this.state.rezervasyon.pickup_office_id}`
      )
      .then((json) => {
        this.setState({
          pickup_office: json.data,
        });
      })
      .catch((error) =>
        console.log("db'den alış ofisini çekerken hata : ", error)
      );
    await axios
      .get(
        `http://localhost:3001/api/v2/get/customer/id/${this.state.rezervasyon.customer_id}`
      )
      .then((json) => {
        this.setState({
          musteri: {
            id: json.data.id,
            ad_soyad: json.data.ad_soyad,
            tc_no: json.data.tc_no,
            cinsiyet: json.data.cinsiyet,
            dogum_tarihi: json.data.dogum_tarihi,
            ehliyet_alis_tarihi: json.data.ehliyet_alis_tarihi,
            telefon_no: json.data.telefon_no,
            eposta: json.data.eposta,
            adres: json.data.adres,
          },
        });
      })
      .catch((error) =>
        console.log("db'den müşteriyi çekerken hata : ", error)
      );
    await this.setState({ bilgiDisplay: true });
    await window.scrollTo(0, 0);
    await window.scrollTo(0, 620);
  };
  onClickRezervIptalHandle = async (e) => {
    e.preventDefault();
    await axios
      .put(`http://localhost:3001/api/v2/update/rezervasyon`, {
        durum: "İPTAL",
        rezerv_no: this.state.rezervNo,
      })
      .catch((err) => console.log(err));

    this.setState({ modalOpen: true });
  };

  modalCloseHandle = () => {
    this.setState({
      modalOpen: false,
      tc: "",
      rezervNo: "",
      musteri: {
        id: "",
        ad_soyad: "",
        tc_no: "",
        cinsiyet: "",
        dogum_tarihi: "",
        ehliyet_alis_tarihi: "",
        telefon_no: "",
        eposta: "",
        adres: "",
      },
      rezervasyon: {
        car_id: "",
        pickup_office_id: "",
        delivery_office_id: "",
        pickup_date_time: "",
        delivery_date_time: "",
        total_day: "",
        rezerv_date_time: "",
        durum: "",
        customer_id: "",
      },
      arac: {
        name: "",
        image: "",
        daily_price: "",
      },
      tcHata: "",
      rezervNoHata: "",
      pickup_office: "",
      delivery_office: "",
    });
  };

  render() {
    return (
      <>
        <Navigation />
        <HeroImage />
        <Helmet>
          <title>Rezervasyon Sorgula</title>
          <meta name="description" content="Rezervasyon sorgula" />
          <meta
            name="keywords"
            content="tc no ile rezervasyon sorgula, rezervasyon no ile rezervasyon sorgula, tc no, rezervasyon no, rezervasyon numarası, tc numarası"
          />
        </Helmet>
        <div className="rezervasyonSorguPanelContainer">
          <RezervasyonSorguPaneli
            onClickSelectedHandleFunc={(e) => this.onClickSelectedHandle(e)}
            selected={this.state.selected}
            rezervNoInputOnChangeFunc={(event) =>
              this.setState({
                rezervNo: event.target.value,
              })
            }
            tcInputOnChangeFunc={(event) =>
              this.setState({
                tc: event.target.value,
              })
            }
            onClickRezervNoHandleFunc={(e) => this.onClickRezervNoHandle(e)}
            rezervNoHata={this.state.rezervNoHata}
            onClickTCHandle={(e) => this.onClickTCHandle(e)}
            tcHata={this.state.tcHata}
            tc={this.state.tc}
          />

          {/** load animation */}
          <LoadingAnimation animationKey={this.state.loadAnimation} />

          {/** tc ile gelen rezervasyon listesi */}
          <div
            className="container row"
            style={{
              display: this.state.tcCarDisplay ? "flex" : "none",
              margin: "0 auto",
              justifyContent: "center",
            }}
          >
            {this.state.sorgulananRezervasyonlar.map((rezerv) => (
              <div
                className="col-10 col-sm-10 col-md-6 col-lg-5 col-xl-4"
                key={rezerv.id}
                style={{ margin: "8px 0" }}
              >
                {" "}
                <div>
                  <CarListhCameWithTC
                    style={{
                      margin: "8px",
                      padding: " 12px",
                      display: "inline-block",
                    }}
                    id={rezerv.id}
                    image={rezerv.image}
                    name={rezerv.name}
                    durum={rezerv.durum}
                    pickup={rezerv.pickup}
                    delivery={rezerv.delivery}
                    tcSelectedRezerv={(e) =>
                      this.tcSelectedRezerv(e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
          </div>

          {/** bilgi paneli
           * bilgi panelini  && ile bilgiDisplay true ise yani tc yada rezervNo girilince render ediyoruz
           */}

          {this.state.bilgiDisplay === true && (
            <div
              className="container"
              style={{
                border: "1px solid #E6E3DF",
                borderRadius: "8px",
                boxShadow:
                  " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                display: this.state.bilgiDisplay ? "block" : "none",
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
                      {this.state.rezervNo}
                    </span>
                  </p>
                </div>
                <div style={{ width: "50%", textAlign: "center" }}>
                  <p style={{ fontSize: "14px" }}>
                    Durum :{" "}
                    <span style={{ fontSize: "18px" }}>
                      {this.state.rezervasyon.durum}
                    </span>
                  </p>
                </div>
                <div style={{ width: "50%", textAlign: "center" }}>
                  <p style={{ fontSize: "14px" }}>
                    Rezervasyon Tarihi :{" "}
                    <span style={{ fontSize: "18px" }}>
                      {new Date(
                        parseInt(this.state.rezervasyon.rezerv_date_time)
                      ).toLocaleString("tr-TR")}
                    </span>
                  </p>
                </div>
              </div>
              <Row style={{ margin: "0 auto", padding: "0" }}>
                <Col
                  lg={6}
                  style={{
                    margin: "16px auto",
                    padding: " 0 8px",
                  }}
                >
                  <RezervasyonCarAndOfficeInfo
                    image={this.state.arac.image}
                    name={this.state.arac.name}
                    pickup_office={this.state.pickup_office}
                    pickup_date_time={this.state.rezervasyon.pickup_date_time}
                    delivery_office={this.state.delivery_office}
                    delivery_date_time={
                      this.state.rezervasyon.delivery_date_time
                    }
                    daily_price={this.state.arac.daily_price.toString()}
                    kac_gun={this.state.rezervasyon.total_day.toString()}
                  />
                </Col>
                <Col
                  lg={6}
                  style={{
                    margin: "16px auto",
                    padding: "0 8px",
                    textAlign: "center",
                  }}
                >
                  <RezervasyonUserInfo
                    adSoyad={this.state.musteri.ad_soyad}
                    tc={this.state.musteri.tc_no}
                    dogumTar={
                      this.state.musteri.dogum_tarihi &&
                      new Date(parseInt(this.state.musteri.dogum_tarihi))
                        .toISOString()
                        .split("T")[0]
                    }
                    ehliyetTar={
                      this.state.musteri.ehliyet_alis_tarihi &&
                      new Date(parseInt(this.state.musteri.ehliyet_alis_tarihi))
                        .toISOString()
                        .split("T")[0]
                    }
                    cinsiyet={this.state.musteri.cinsiyet}
                    eposta={this.state.musteri.eposta}
                    telefon={this.state.musteri.telefon_no}
                    adres={this.state.musteri.adres}
                    disabledMi={true}
                  />
                  <button
                    disabled={
                      this.state.rezervasyon.durum === "AKTİF" ? false : true
                    }
                    style={{
                      width: "auto",
                      padding: "8px 32px",
                      textAlign: "center",
                      height: "auto",
                      background: "gray",
                      boxShadow:
                        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                      border: "1px solid gray",
                      borderRadius: "4px",
                      marginTop: "-16px",
                      opacity:
                        this.state.rezervasyon.durum === "AKTİF" ? 1 : 0.5,
                    }}
                    onClick={(e) => this.onClickRezervIptalHandle(e)}
                  >
                    Rezervasyonu İptal Et
                  </button>
                </Col>
              </Row>

              <Modal
                className="h-auto w-auto"
                returnFocusAfterClose={false}
                isOpen={this.state.modalOpen}
                modalTransition={{ timeout: 700 }}
                modalClassName="modalOutline"
                size={"sm"}
                backdrop="static"
              >
                <ModalFooter
                  style={{ background: "transparent", textAlign: "center" }}
                >
                  <p
                    style={{
                      background: "transparent",
                      margin: "16px auto 32px auto",
                    }}
                  >
                    Rezervasyon İptal Edildi!
                  </p>
                  <NavLink exact to="/">
                    <Button
                      className="h-auto w-auto"
                      style={{
                        width: "auto",
                        padding: "8px 32px",
                        textAlign: "center",
                        height: "auto",
                        color: "white",
                        boxShadow:
                          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                        border: "1px solid gray",
                        borderRadius: "4px",
                      }}
                      onClick={this.modalCloseHandle}
                    >
                      Tamam
                    </Button>
                  </NavLink>
                </ModalFooter>
              </Modal>
            </div>
          )}
        </div>
        <Footer />;
      </>
    );
  }
}

export default RezervasyonSorgula;
