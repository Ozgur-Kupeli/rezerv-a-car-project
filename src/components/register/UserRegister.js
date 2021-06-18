import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Row,
  Col,
} from "reactstrap";
import axios from "axios";
import { Helmet } from "react-helmet";

class UserRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eposta: "",
      parola: "",
      ad: "",
      soyad: "",
      tc: "",
      tel: "",
      cinsiyet: "",
      dogumTar: "",
      ehliyetTar: "",
      adres: "",
      hataMesaji: "",
      successMesaji: "",
      fontSize: "14px",
    };
  }
  isEmty = (string) => {
    //giriş boş mu
    if (string.trim() === "") return true;
    else return false;
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
  parolaFormat = (string) => {
    const regEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!string.match(regEx)) {
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
  isimFormat = (string) => {
    const regEx = /^[a-zA-ZğĞöÖçÇıİüÜşŞ]+(([ ])?[a-zA-ZğĞöÖçÇıİüÜşŞ]*)*$/g;
    let str = string.replace(" ", "");
    if (str.length < 3) {
      return true;
    } else if (!string.match(regEx)) {
      return true;
    }
  };
  soyIsimFormat = (string) => {
    const regEx = /^[a-zA-ZğĞöÖçÇıİüÜşŞ]+(([ ])?[a-zA-ZğĞöÖçÇıİüÜşŞ]*)*$/g;
    let str = string.replace(" ", "");
    if (str.length < 2) {
      return true;
    } else if (!string.match(regEx)) {
      return true;
    }
  };
  formSubmit = async (e) => {
    e.preventDefault();
    if (this.isEmty(this.state.eposta)) {
      this.setState({
        hataMesaji: "E-Posta boş bırakılamaz!",
        fontSize: "14px",
      });
    } else if (this.emailFormat(this.state.eposta)) {
      this.setState({
        hataMesaji: "E-Posta hatalı!",
        fontSize: "14px",
      });
    } else if (this.isEmty(this.state.parola)) {
      this.setState({
        hataMesaji: "Parola boş bırakılamaz!",
        fontSize: "14px",
      });
    } else if (this.parolaFormat(this.state.parola)) {
      this.setState({
        hataMesaji: "Parola hatalı!",
        fontSize: "14px",
      });
    } else if (this.isEmty(this.state.ad)) {
      this.setState({
        hataMesaji: "Ad boş bırakılamaz!",
        fontSize: "14px",
      });
    } else if (this.isimFormat(this.state.ad)) {
      this.setState({
        hataMesaji: "Ad hatalı!",
        fontSize: "14px",
      });
    } else if (this.isEmty(this.state.soyad)) {
      this.setState({
        hataMesaji: "Soyad boş bırakılamaz!",
        fontSize: "14px",
      });
    } else if (this.soyIsimFormat(this.state.soyad)) {
      this.setState({
        hataMesaji: "Soyad hatalı!",
        fontSize: "14px",
      });
    } else if (this.isEmty(this.state.tc)) {
      this.setState({
        hataMesaji: "TC no boş bırakılamaz!",
        fontSize: "14px",
      });
    } else if (this.tcNoFormat(this.state.tc)) {
      this.setState({
        hataMesaji: "TC no hatalı!",
        fontSize: "14px",
      });
    } else if (this.isEmty(this.state.tel)) {
      this.setState({
        hataMesaji: "Telefon numarası boş bırakılamaz!",
        fontSize: "14px",
      });
    } else if (this.telNoFormat(this.state.tel)) {
      this.setState({
        hataMesaji: "Telefon numarası hatalı!",
        fontSize: "14px",
      });
    } else if (this.isEmty(this.state.cinsiyet)) {
      this.setState({
        hataMesaji: "Cinsiyet boş bırakılamaz!",
        fontSize: "14px",
      });
    } else if (this.isEmty(this.state.dogumTar)) {
      this.setState({
        hataMesaji: "Doğum tarihi boş bırakılamaz!",
        fontSize: "14px",
      });
    } else if (this.dogumTarihi(this.state.dogumTar)) {
      this.setState({
        hataMesaji: "Doğum tarihi hatalı!",
        fontSize: "14px",
      });
    } else if (this.isEmty(this.state.ehliyetTar)) {
      this.setState({
        hataMesaji: "Ehliyet alış tarihi boş bırakılamaz!",
        fontSize: "14px",
      });
    } else if (this.ehliyetTarihi(this.state.ehliyetTar, this.state.dogumTar)) {
      this.setState({
        hataMesaji: "Ehliyet alış tarihi hatalı!",
        fontSize: "14px",
      });
    } else if (this.isEmty(this.state.adres)) {
      this.setState({
        hataMesaji: "Adres boş bırakılamaz!",
        fontSize: "14px",
      });
    } else {
      this.setState({
        hataMesaji: "",
        fontSize: "14px",
      });
      axios
        .post("http://localhost:3001/user/auth/user/register", {
          ad_soyad: this.state.ad + " " + this.state.soyad,
          cinsiyet: this.state.cinsiyet,
          tc_no: this.state.tc,
          tel_no: this.state.tel,
          eposta: this.state.eposta,
          adres: this.state.adres,
          dogum_tarihi: Date.parse(this.state.dogumTar),
          ehliyet_alis_tarihi: Date.parse(this.state.ehliyetTar),
          parola: this.state.parola,
        })
        .then((res) => {
          if (res.status === 201) {
            this.setState({
              hataMesaji: "BU E-POSTA ÖNCEDEN ALINMIŞ!",
              fontSize: "18px",
            });
          } else if (res.status === 200) {
            this.setState({
              successMesaji: "KULLANICI KAYDI BAŞARIYLA GERÇEKLEŞTİ",
            });
            setTimeout(() => {
              this.props.history.push("/login");
            }, 2000);
          } else {
            this.setState({
              hataMesaji: "BEKLENMEYEN BİR HATA OLUŞTU!",
              fontSize: "18px",
            });
          }
        })
        .catch((err) => console.log(err));
    }
  };
  render() {
    return (
      <div className="container-flued">
        <Helmet>
          <title>Giriş Yap</title>
          <meta name="description" content="Kayıt Ol" />
          <meta name="keywords" content="kayıt ol, kaydol" />
        </Helmet>
        <div className="container">
          <Col xs={11} lg={8}>
            <Form
              style={{
                border: "1px solid #f7f7f7",
                padding: "1em 2.3em 1em 3em",
                borderRadius: ".5em",
                background: "#642978",
              }}
            >
              <Row form style={{ background: "transparent" }}>
                <Col md={6} style={{ background: "transparent" }}>
                  <FormGroup style={{ background: "transparent" }}>
                    <Label
                      for="ad"
                      style={{ background: "transparent", color: "#f7f7f7" }}
                    >
                      Ad
                    </Label>
                    <Input
                      type="text"
                      name="ad"
                      required
                      maxLength={50}
                      minLength={3}
                      value={this.state.ad}
                      onChange={(event) =>
                        this.setState({
                          ad: event.target.value,
                        })
                      }
                    />
                  </FormGroup>
                </Col>
                <Col md={6} style={{ background: "transparent" }}>
                  <FormGroup style={{ background: "transparent" }}>
                    <Label
                      for="soyad"
                      style={{ background: "transparent", color: "#f7f7f7" }}
                    >
                      Soyad
                    </Label>
                    <Input
                      type="text"
                      name="soyad"
                      required
                      maxLength={50}
                      minLength={2}
                      value={this.state.soyad}
                      onChange={(event) =>
                        this.setState({
                          soyad: event.target.value,
                        })
                      }
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row form style={{ background: "transparent" }}>
                <Col md={4} style={{ background: "transparent" }}>
                  <FormGroup style={{ background: "transparent" }}>
                    <Label
                      for="tc"
                      style={{ background: "transparent", color: "#f7f7f7" }}
                    >
                      TC No
                    </Label>
                    <Input
                      type="text"
                      name="tc"
                      maxLength={11}
                      minLength={11}
                      requiredvalue={this.state.tc}
                      onChange={(event) =>
                        this.setState({
                          tc: event.target.value,
                        })
                      }
                    />
                  </FormGroup>
                </Col>
                <Col md={4} style={{ background: "transparent" }}>
                  <FormGroup style={{ background: "transparent" }}>
                    <Label
                      for="tel"
                      style={{ background: "transparent", color: "#f7f7f7" }}
                    >
                      Telefon No
                    </Label>
                    <Input
                      type="text"
                      name="tel"
                      maxLength={10}
                      minLength={10}
                      required
                      placeholder="5xx xxx xx xx"
                      value={this.state.tel}
                      onChange={(event) =>
                        this.setState({
                          tel: event.target.value,
                        })
                      }
                    />
                  </FormGroup>
                </Col>
                <Col md={4} style={{ background: "transparent" }}>
                  <FormGroup style={{ background: "transparent" }}>
                    <Label
                      for="cinsiyet"
                      style={{ background: "transparent", color: "#f7f7f7" }}
                    >
                      Cinsiyet
                    </Label>
                    <Input
                      type="select"
                      name="cinsiyet"
                      requiredvalue={this.state.cinsiyet}
                      onChange={(event) =>
                        this.setState({
                          cinsiyet: event.target.value,
                        })
                      }
                    >
                      <option>...</option>
                      <option>Bay</option>
                      <option>Bayan</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row form style={{ background: "transparent" }}>
                <Col md={6} style={{ background: "transparent" }}>
                  <FormGroup style={{ background: "transparent" }}>
                    <Label
                      for="dogum"
                      style={{ background: "transparent", color: "#f7f7f7" }}
                    >
                      Doğum Tarihi
                    </Label>
                    <Input
                      type="date"
                      name="dogum"
                      required
                      style={{ border: "1px solid #d3d3d3", height: "40px" }}
                      value={this.state.dogumTar}
                      onChange={(event) =>
                        this.setState({
                          dogumTar: event.target.value,
                        })
                      }
                    />
                  </FormGroup>
                </Col>
                <Col md={6} style={{ background: "transparent" }}>
                  <FormGroup style={{ background: "transparent" }}>
                    <Label
                      for="ehliyet"
                      style={{ background: "transparent", color: "#f7f7f7" }}
                    >
                      Ehliyet Alış Tarihi
                    </Label>
                    <Input
                      type="date"
                      name="ehliyet"
                      required
                      style={{ border: "1px solid #d3d3d3", height: "40px" }}
                      value={this.state.ehliyetTar}
                      onChange={(event) =>
                        this.setState({
                          ehliyetTar: event.target.value,
                        })
                      }
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row form style={{ background: "transparent" }}>
                <Col xs={12} style={{ background: "transparent" }}>
                  <FormGroup style={{ background: "transparent" }}>
                    <Label
                      for="adres"
                      style={{ background: "transparent", color: "#f7f7f7" }}
                    >
                      Adres
                    </Label>
                    <Input
                      type="textarea"
                      name="adres"
                      rows="3"
                      required
                      value={this.state.adres}
                      onChange={(event) =>
                        this.setState({
                          adres: event.target.value,
                        })
                      }
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row form style={{ background: "transparent" }}>
                <Col md={6} style={{ background: "transparent" }}>
                  <FormGroup style={{ background: "transparent" }}>
                    <Label
                      for="eposta"
                      style={{ background: "transparent", color: "#f7f7f7" }}
                    >
                      E-Posta
                    </Label>
                    <Input
                      type="email"
                      name="eposta"
                      maxLength={100}
                      required
                      placeholder="exemple@mail.com"
                      value={this.state.eposta}
                      onChange={(event) =>
                        this.setState({
                          eposta: event.target.value,
                        })
                      }
                    />
                  </FormGroup>
                </Col>
                <Col md={6} style={{ background: "transparent" }}>
                  <FormGroup style={{ background: "transparent" }}>
                    <Label
                      for="parola"
                      style={{ background: "transparent", color: "#f7f7f7" }}
                    >
                      Parola
                    </Label>
                    <Input
                      type="password"
                      name="parola"
                      placeholder="********"
                      minLength={8}
                      maxLength={12}
                      required
                      value={this.state.parola}
                      onChange={(event) =>
                        this.setState({
                          parola: event.target.value,
                        })
                      }
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormText
                color="danger"
                style={{
                  textAlign: "center",
                  fontSize: this.state.fontSize,
                  background: "transparent",
                }}
              >
                {this.state.hataMesaji}
              </FormText>
              <FormText
                color="success"
                style={{
                  textAlign: "center",
                  fontSize: "18px",
                  background: "transparent",
                }}
              >
                {this.state.successMesaji}
              </FormText>
              <Button
                onClick={(e) => this.formSubmit(e)}
                style={{
                  background: "#23022e",
                  color: "#f7f7f7",
                  border: "1px solid #f7f7f7",
                  width: "50%",
                  margin: "16px 25%",
                }}
              >
                KAYDET
              </Button>
            </Form>
          </Col>
        </div>
      </div>
    );
  }
}
export default withRouter(UserRegister);
