import React from "react";
import PropTypes from "prop-types";
import "@material-tailwind/react/tailwind.css";
import Card from "@material-tailwind/react/Card";
import CardImage from "@material-tailwind/react/CardImage";
import CardBody from "@material-tailwind/react/CardBody";
import H6 from "@material-tailwind/react/Heading6";
import { Row } from "reactstrap";
import "./rezervasyon.scss";
import { Helmet } from "react-helmet";

function RezervasyonCarAndOfficeInfo({
  image,
  name,
  pickup_office,
  pickup_date_time,
  delivery_office,
  delivery_date_time,
  daily_price,
  kac_gun,
}) {
  return (
    <>
      <Helmet>
        <title>{name} kirala</title>
        <meta name="description" content={name} />
        <meta
          name="keywords"
          content={(image, pickup_office, delivery_office)}
        />
      </Helmet>
      <Card>
        <CardImage src={image} alt={name} />

        <CardBody>
          <div style={{ color: "gray", marginBottom: "32px" }}>
            <div className="fasdfdsaf451fdsa">
              <div className="afdsa524f15ds2">
                <div className="fdsaf52d6sa2f5">
                  GÜNLÜK TUTAR{" "}
                  <span className="sfdsa25f54ds52">{daily_price} </span> TL
                </div>
              </div>

              <div className="afdsa524f15ds2">
                <div className="fdsaf52d6sa2f5">
                  KİRALAMA SÜRESİ{" "}
                  <span className="sfdsa25f54ds52">{kac_gun} </span> Gün
                </div>
              </div>
              <div className="afdsa524f15ds2">
                <div className="fdsaf52d6sa2f5">
                  TOPLAM TUTAR{" "}
                  <span className="sfdsa25f54ds52">
                    {parseInt(kac_gun) * parseInt(daily_price)}
                  </span>{" "}
                  TL
                </div>
              </div>
            </div>
          </div>
          <H6
            color="gray"
            style={{
              position: "relative",
              top: "-40px",
              textAlign: "center",
              textShadow: "2px 2px 4px grey",
            }}
          >
            {name}
          </H6>
          <Row
            style={{
              margin: "8px auto",
              padding: "0",
              position: "relative",
              top: "-30px",
              marginBottom: "-13px",
            }}
          >
            <div
              style={{
                padding: " 0 16px",
                border: "1px solid #E4E3DD",
                boxShadow:
                  " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                borderRadius: "8px",
                margin: "6px auto",
              }}
            >
              <div className="sfdgfd51sfds5">ALIŞ</div>
              <div className="adf51dsaf41">OFİS :</div>{" "}
              <div className="fdsafvu4far4">{pickup_office}</div>
              <br />
              <div className="adf51dsaf41">TARİH :</div>{" "}
              <div className="fdsafvu4far4">
                {new Date(parseInt(pickup_date_time)).toLocaleString("tr-TR")}
              </div>
            </div>
          </Row>
          <Row
            style={{
              margin: "8px auto",
              padding: "0",
              position: "relative",
              top: "-10px",
              marginBottom: "-13px",
            }}
          >
            <div
              style={{
                padding: " 0 16px",
                border: "1px solid #E4E3DD",
                boxShadow:
                  " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                borderRadius: "8px",
                margin: "6px auto",
              }}
            >
              <div className="sfdgfd51sfds5">İADE</div>
              <div className="adf51dsaf41">OFİS :</div>{" "}
              <div className="fdsafvu4far4">{delivery_office}</div>
              <br />
              <div className="adf51dsaf41">TARİH :</div>{" "}
              <div className="fdsafvu4far4">
                {new Date(parseInt(delivery_date_time)).toLocaleString("tr-TR")}
              </div>
            </div>
          </Row>
        </CardBody>
      </Card>
    </>
  );
}
RezervasyonCarAndOfficeInfo.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  pickup_office: PropTypes.string.isRequired,
  pickup_date_time: PropTypes.string.isRequired,
  delivery_office: PropTypes.string.isRequired,
  delivery_date_time: PropTypes.string.isRequired,
  daily_price: PropTypes.string.isRequired,
  kac_gun: PropTypes.string.isRequired,
};
RezervasyonCarAndOfficeInfo.defaultProps = {
  image: "",
  name: "",
  pickup_office: "",
  pickup_date_time: "",
  delivery_office: "",
  delivery_date_time: "",
  daily_price: "",
  kac_gun: "",
};

export default RezervasyonCarAndOfficeInfo;
