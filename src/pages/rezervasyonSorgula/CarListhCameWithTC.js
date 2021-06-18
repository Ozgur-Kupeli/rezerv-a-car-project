import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";

const genel = {
  margin: "4px auto",
  padding: "0",
  width: "100%",
  height: "auto",
  border: "1px solid #d1d0ce",
  borderRadius: "8px",
  fontSize: "14px",
  textAlign: "center",
  background: "transparent",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
};
function CarListhCameWithTC({
  id,
  image,
  name,
  durum,
  pickup,
  delivery,
  tcSelectedRezerv,
}) {
  return (
    <div
      style={{
        margin: "0 auto",
        padding: "0 4px",
        width: "100%",
        height: "auto",
        border: "1px solid #d1d0ce",
        borderRadius: "8px",
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        fontSize: "14px",
        textAlign: "center",
        background: "#E6E3DF",
      }}
    >
      <Row style={genel}>
        <div style={{ background: "transparent" }}>
          <img
            style={{ background: "transparent" }}
            src={`${image}`}
            alt={`${name}`}
          />
        </div>
      </Row>
      <Row style={genel}>
        <Row
          style={{
            background: "transparent",
            textAlign: "center",
            margin: "4px",
          }}
        >
          <span
            style={{
              background: "transparent",
              fontSize: "18px",
              textShadow: " 2px 2px 4px grey",
            }}
          >
            {name}
          </span>
        </Row>
        <Row
          style={{
            background: "transparent",
            fontSize: "12px",
            margin: "4px auto",
          }}
        >
          <Col style={{ background: "transparent" }}>
            <div
              style={{
                background: "transparent",
                textShadow: " 2px 2px 4px grey",
              }}
            >
              Alış Tarihi/Saati
            </div>
            <div style={{ background: "transparent", fontSize: "14px" }}>
              {new Date(parseInt(pickup)).toLocaleDateString("tr-TR")}{" "}
              {new Date(parseInt(pickup)).toLocaleTimeString("tr-TR")}
            </div>
          </Col>

          <Col style={{ background: "transparent" }}>
            <div
              style={{
                background: "transparent",
                textShadow: " 2px 2px 4px grey",
              }}
            >
              Rezervasyon Durumu
            </div>
            <div style={{ background: "transparent", fontSize: "14px" }}>
              {durum}
            </div>
          </Col>
          <Col style={{ background: "transparent" }}>
            <div
              style={{
                background: "transparent",
                textShadow: " 2px 2px 4px grey",
              }}
            >
              İade Tarihi/Saati
            </div>
            <div style={{ background: "transparent", fontSize: "14px" }}>
              {new Date(parseInt(delivery)).toLocaleDateString("tr-TR")}{" "}
              {new Date(parseInt(delivery)).toLocaleTimeString("tr-TR")}
            </div>
          </Col>
        </Row>
        <Row
          style={{
            background: "transparent",
            margin: "0 auto",
            textAlign: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              background: "transparent",
              margin: "0 auto",
              textAlign: "center",
              width: "100%",
            }}
          >
            <button
              style={{
                width: "auto",
                padding: "8px 32px",
                textAlign: "center",
                height: "auto",
                color: "black",
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                border: "1px solid gray",
                borderRadius: "4px",
                margin: "12px auto",
              }}
              value={id}
              onClick={(e) => tcSelectedRezerv(e)}
            >
              GÖRÜNTÜLE
            </button>
          </div>
        </Row>
      </Row>
    </div>
  );
}
CarListhCameWithTC.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  durum: PropTypes.string.isRequired,
  pickup: PropTypes.string.isRequired,
  delivery: PropTypes.string.isRequired,
  tcSelectedRezerv: PropTypes.func.isRequired,
};
CarListhCameWithTC.defaultProps = {
  id: "",
  image: "",
  name: "",
  durum: "",
  pickup: "",
  delivery: "",
  tcSelectedRezerv: () => {},
};
export default CarListhCameWithTC;
