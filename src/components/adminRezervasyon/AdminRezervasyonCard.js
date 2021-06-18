import React from "react";
import "../../assets/admin.scss";
import { Col, Row } from "reactstrap";
import PropTypes from "prop-types";

function AdminRezervasyonCard({ cardInfo }) {
  return (
    <div
      className="rezervComp"
      style={{
        background:
          cardInfo.durum === "ARAÇ İADE"
            ? "#999999"
            : cardInfo.durum === "ARAÇ TESLİM"
            ? "#9999ff"
            : cardInfo.durum === "İPTAL"
            ? "#ff9999"
            : "#99ffcc",
        position: "relative",
      }}
    >
      <div
        style={{
          width: "auto",
          height: "auto",
          background: "transparent",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translateX(-50%) translateY(-50%) rotate(-25deg)",
          fontSize: "36px",
          fontWeight: "bold",
          textAlign: "center",
          zIndex: "2",
          color: "rgba(255, 0, 0 , .35)",
        }}
      >
        {cardInfo.errorFunc(cardInfo.durum)}
      </div>
      <Row className="rezervCompRow">
        <Col xs={8} className="rezervCompRowCol">
          <Row className="rezervCompRowColRow">
            <img src={cardInfo.carImg} alt={cardInfo.carName} />
          </Row>
          <Row className="rezervCompRowColRow">
            <p>{cardInfo.carName}</p>
          </Row>
        </Col>
        <Col xs={4} className="rezervCompRowCol">
          <Row className="rezervCompRowColRow">
            <div className="birim">Rezervasyon Tarihi</div>
            <div className="deger">
              {new Date(parseInt(cardInfo.rezervDT)).toLocaleString("tr-TR")}
            </div>
          </Row>
          <Row className="rezervCompRowColRow">
            <div className="birim">Rezervasyon No</div>
            <div className="deger">{cardInfo.rezervNo}</div>
          </Row>
          <Row className="rezervCompRowColRow">
            <div className="birim">Rezervasyon Durumu</div>
            <div className="deger">{cardInfo.durum}</div>
          </Row>
          <Row className="rezervCompRowColRow">
            <button
              value={cardInfo.id}
              onClick={(e) => cardInfo.getRezerv(e.target.value)}
            >
              GÖRÜNTÜLE
            </button>
          </Row>
        </Col>
      </Row>
      <Row className="rezervCompRow">
        <Col xs={12} className="rezervCompRowCol">
          <Row className="rezervCompRowColRow">
            <Col className="rezervCompRowColRowCol">
              <div className="birim">ALIŞ</div>
              <div className="deger">
                {new Date(parseInt(cardInfo.pickupDT)).toLocaleString("tr-TR")}
              </div>
              <div className="deger">{cardInfo.pickupOffice}</div>
            </Col>
            <Col className="rezervCompRowColRowCol">
              <div className="birim">İADE</div>
              <div className="deger">
                {new Date(parseInt(cardInfo.deliveryDT)).toLocaleString(
                  "tr-TR"
                )}
              </div>
              <div className="deger">{cardInfo.deliveryOffice}</div>
            </Col>
            <Col className="rezervCompRowColRowCol">
              <div className="birim">Toplam Süre</div>
              <div className="deger">{cardInfo.totalDay} Gün</div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
AdminRezervasyonCard.propTypes = {
  durum: PropTypes.object.isRequired,
};
AdminRezervasyonCard.defaultProps = {
  durum: {},
};
export default AdminRezervasyonCard;
