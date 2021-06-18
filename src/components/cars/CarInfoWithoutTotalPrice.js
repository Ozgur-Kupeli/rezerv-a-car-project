import React from "react";
import PropTypes from "prop-types";
import { Col, Row } from "reactstrap";

function CarInfoWithoutTotalPrice({
  age_limit,
  license_age,
  daily_price,
  id,
  editModal,
  deleteCar,
}) {
  return (
    <Row
      style={{
        width: "100%",
        height: "auto",
        margin: "0 auto",
        padding: "5px",
        background: "transparent",
        textAlign: "left",
      }}
    >
      <Col
        style={{
          margin: "0 auto",
          padding: "5px",
          background: "transparent",
          textAlign: "center",
          fontFamily: "Arial, Helvetica, sans-serif",
          fontSize: "14px",
        }}
      >
        <p
          style={{
            width: "100%",
            height: "auto",
            margin: "0 auto",
            padding: "5px",
            background: "transparent",
            textAlign: "center",
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize: "14px",
            display: "inline-block",
          }}
        >
          {`Bu aracı kiralayabilmek için ${age_limit} yaşından büyük ve minimum ${license_age} yıllık ehliyet sahibi olmak
          gereklidir`}
          ,
        </p>
      </Col>
      <Col
        style={{
          margin: "0 auto",
          padding: "5px",
          background: "transparent",
          textAlign: "center",
          fontFamily: "Arial, Helvetica, sans-serif",
          fontSize: "14px",
        }}
      >
        <Row
          style={{
            margin: "0 auto",
            padding: "5px",
            background: "transparent",
            textAlign: "center",
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize: "14px",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "auto",
              margin: "0 auto",
              padding: "5px",
              background: "transparent",
              textAlign: "center",
              fontFamily: "Arial, Helvetica, sans-serif",
              fontSize: "14px",
              display: "inline-block",
            }}
          >
            {daily_price} TL / Günlük Tutar
          </div>
        </Row>
        <Row
          style={{
            margin: "0 auto",
            padding: "5px",
            background: "transparent",
            textAlign: "center",
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize: "14px",
          }}
        >
          <button
            style={{
              width: "45%",
              height: "35px",
              display: "inline-block",
              margin: "2px auto",
              textAlign: "center",
              fontFamily: "Arial, Helvetica, sans-serif",
              letterSpacing: "0.5px",
              fontSize: "12px",
              background: "#5cb85c",
              borderRadius: "5px",
              border: " 1px solid #327371",
              cursor: "pointer",
              color: "#ffffff",
            }}
            onClick={() => editModal(id)}
          >
            DÜZENLE
          </button>
          <button
            style={{
              width: "45%",
              height: "35px",
              display: "inline-block",
              margin: "2px auto",
              textAlign: "center",
              fontFamily: "Arial, Helvetica, sans-serif",
              letterSpacing: "0.5px",
              fontSize: "12px",
              background: "#d9534f",
              borderRadius: "5px",
              border: " 1px solid #327371",
              cursor: "pointer",
              color: "#ffffff",
            }}
            onClick={() => deleteCar(id)}
          >
            SİL
          </button>
        </Row>
      </Col>
    </Row>
  );
}
CarInfoWithoutTotalPrice.propTypes = {
  age_limit: PropTypes.number.isRequired,
  license_age: PropTypes.number.isRequired,
  daily_price: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  editModal: PropTypes.func.isRequired,
  deleteCar: PropTypes.func.isRequired,
};
CarInfoWithoutTotalPrice.defaultProps = {
  age_limit: 0,
  license_age: 0,
  daily_price: 0,
  id: 0,
  editModal: () => {},
  deleteCar: () => {},
};
export default CarInfoWithoutTotalPrice;
