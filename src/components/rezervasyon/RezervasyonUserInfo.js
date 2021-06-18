import React from "react";
import PropTypes from "prop-types";
import { Row, Form, Col, Input, Button, Label } from "reactstrap";
import "./rezervasyon.scss";

const labelStyle = {
  textAlign: "left",
  paddingLeft: "8px",
  margin: "0",
  color: "gray",
  background: "transparent",
  fontSize: "11px",
};
const inputStyle = {
  fontSize: "12px",
};
const rowStyle = {
  margin: "4px auto",
  padding: "0",
};
const rowStyleDis = {
  margin: "16px auto",
  padding: "0",
};
const basStyle = {
  background: "transparent",
  textAlign: "center",
  margin: "8px 0 8px auto",
  textShadow: "2px 2px 4px grey",
  fontSize: "18px",
  color: "gray",
};

function RezervasyonUserInfo({
  adSoyad,
  adSoyadFunc,
  tc,
  tcFunc,
  dogumTar,
  dogumTarFunc,
  ehliyetTar,
  ehliyetTarFunc,
  cinsiyet,
  cinsiyetFunc,
  eposta,
  epostaFunc,
  telefon,
  telefonFunc,
  adres,
  adresFunc,
  hata,
  display,
  handleInputFunc,
  disabledMi,
  printNone,
}) {
  return (
    <div
      style={{
        border: "1px solid #E6E3DF",
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1)",
        borderRadius: "16px",
        margin: "0",
        padding: "0 28px",
        width: "100%",
        background: "linear-gradient(#E4E3DD, white, white, white)",
      }}
    >
      <Form
        style={{
          margin: "0 auto",
          padding: "0 0 8px 0",
          position: "relative",
          top: "-28px",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.05), 0 6px 20px 0 rgba(0, 0, 0, 0.05)",
        }}
      >
        <Row form style={rowStyleDis}>
          <div style={basStyle}>KİŞİSEL BİLGİLER</div>
          <Row style={rowStyle}>
            <Col xs={12} lg={6}>
              <Label style={labelStyle}>Ad Soyad</Label>
              <Input
                disabled={disabledMi}
                style={inputStyle}
                name="adSoyad"
                type="text"
                required
                maxLength={50}
                minLength={6}
                value={adSoyad}
                onChange={(e) => adSoyadFunc(e)}
              />
            </Col>
            <Col xs={12} lg={6}>
              <Label style={labelStyle}>TC Kimlik No</Label>
              <Input
                disabled={disabledMi}
                style={inputStyle}
                name="tcNo"
                type="text"
                maxLength={11}
                minLength={11}
                required
                value={tc}
                onChange={(e) => tcFunc(e)}
              />
            </Col>
          </Row>
          <Row style={rowStyle}>
            <Col xs={12} lg={6}>
              <Label style={labelStyle}>Doğum Tarihi</Label>
              <Input
                disabled={disabledMi}
                style={inputStyle}
                name="dogumTarihi"
                type="date"
                required
                value={dogumTar}
                onChange={(e) => dogumTarFunc(e)}
              />
            </Col>

            <Col xs={12} lg={6}>
              <Label style={labelStyle}>Ehliyet Alış Tarihi</Label>
              <Input
                disabled={disabledMi}
                style={inputStyle}
                name="ehliyetTarihi"
                type="date"
                required
                value={ehliyetTar}
                onChange={(e) => ehliyetTarFunc(e)}
              />
            </Col>
          </Row>
          <Row style={rowStyle}>
            <Col xs={12} lg={6}>
              <Label style={labelStyle}>Cinsiyet</Label>
              <Input
                disabled={disabledMi}
                style={inputStyle}
                name="cinsiyet"
                type="select"
                required
                value={cinsiyet}
                onChange={(e) => cinsiyetFunc(e)}
              >
                <option value="...">...</option>
                <option value="Bay">Bay</option>
                <option value="Bayan">Bayan</option>
              </Input>
            </Col>

            <Col xs={12} lg={6}></Col>
          </Row>
        </Row>
        <Row form style={rowStyleDis}>
          <div style={basStyle}>İLETİŞİM BİLGİLERİ</div>
          <Row style={rowStyle}>
            <Col xs={12} lg={6}>
              <Label style={labelStyle}>E-posta</Label>
              <Input
                disabled={disabledMi}
                style={inputStyle}
                name="email"
                type="email"
                required
                value={eposta}
                maxLength={100}
                onChange={(e) => epostaFunc(e)}
              />
            </Col>

            <Col xs={12} lg={6}>
              <Label style={labelStyle}>Telefon No</Label>
              <Input
                disabled={disabledMi}
                style={inputStyle}
                name="telefon"
                type="text"
                maxLength={10}
                minLength={10}
                required
                value={telefon}
                onChange={(e) => telefonFunc(e)}
              />
            </Col>
          </Row>
          <Row style={rowStyle}>
            <Col xs={12}>
              <Label style={labelStyle}>Adres</Label>
              <Input
                disabled={disabledMi}
                style={inputStyle}
                name="adres"
                type="textarea"
                rows="4"
                cols="50"
                required
                value={adres}
                onChange={(e) => adresFunc(e)}
              />
            </Col>
          </Row>
        </Row>
        <div
          className="nonPrintible"
          style={{
            display: { display },
            color: "red",
            marginBottom: "-35px",
            textAlign: "center",
            position: "relative",
            top: "-5px",
          }}
        >
          {hata}
        </div>
        <div
          className="nonPrintible"
          style={{
            display: disabledMi ? "none" : printNone === "" ? "block" : "none",
            margin: "40px auto -20px auto",
            width: "50%",
            textAlign: "center",
          }}
        >
          <Button
            style={{
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
            type="submit"
            onClick={(e) => handleInputFunc(e)}
          >
            REZERVASYON YAP
          </Button>
        </div>
      </Form>
    </div>
  );
}
RezervasyonUserInfo.propTypes = {
  adSoyad: PropTypes.string.isRequired,
  adSoyadFunc: PropTypes.func.isRequired,
  tc: PropTypes.string.isRequired,
  tcFunc: PropTypes.func.isRequired,
  dogumTar: PropTypes.string.isRequired,
  dogumTarFunc: PropTypes.func.isRequired,
  ehliyetTar: PropTypes.string.isRequired,
  ehliyetTarFunc: PropTypes.func.isRequired,
  cinsiyet: PropTypes.string.isRequired,
  cinsiyetFunc: PropTypes.func.isRequired,
  eposta: PropTypes.string.isRequired,
  epostaFunc: PropTypes.func.isRequired,
  telefon: PropTypes.string.isRequired,
  telefonFunc: PropTypes.func.isRequired,
  adres: PropTypes.string.isRequired,
  adresFunc: PropTypes.func.isRequired,
  hata: PropTypes.string.isRequired,
  display: PropTypes.string.isRequired,
  handleInputFunc: PropTypes.func.isRequired,
  disabledMi: PropTypes.bool.isRequired,
  printNone: PropTypes.string.isRequired,
};
RezervasyonUserInfo.defaultProps = {
  adSoyad: "",
  adSoyadFunc: () => {},
  tc: "",
  tcFunc: () => {},
  dogumTar: "",
  dogumTarFunc: () => {},
  ehliyetTar: "",
  ehliyetTarFunc: () => {},
  cinsiyet: "",
  cinsiyetFunc: () => {},
  eposta: "",
  epostaFunc: () => {},
  telefon: "",
  telefonFunc: () => {},
  adres: "",
  adresFunc: () => {},
  hata: "",
  display: "",
  handleInputFunc: () => {},
  disabledMi: false,
  printNone: "",
};
export default RezervasyonUserInfo;
