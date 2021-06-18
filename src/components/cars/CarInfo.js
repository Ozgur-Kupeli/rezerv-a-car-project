import React from "react";
import "./cars.scss";
import PropTypes from "prop-types";

function CarInfo({
  name,
  image,
  number_of_people,
  number_of_suitcase,
  gear,
  fuel,
}) {
  return (
    <div>
      <div className="cardHeader">{name}</div>
      <div className="cardImage">
        <img src={image} alt={name} />
      </div>
      <div className="cardText">
        <div className="imgContainer">
          <img
            className="img"
            src={"/carImage/300x300kisi.png"}
            alt="kaç kişilik"
          />
          <p className="imgText">{number_of_people} Kişi</p>
        </div>

        <div className="imgContainer">
          <img
            className="img"
            src={"/carImage/300x300bavul.png"}
            alt="Kaç bavul Alır"
          />
          <p className="imgText">{number_of_suitcase} bavul</p>
        </div>

        <div className="imgContainer">
          <img
            className="img"
            src={"/carImage/300x300vites.png"}
            alt="Vites Tipi"
          />
          <p className="imgText">{gear /* vites tipi */}</p>
        </div>

        <div className="imgContainer">
          <img
            className="img"
            src={"/carImage/300x300penzin.png"}
            alt="Yakıt Türü"
          />
          <p className="imgText">{fuel /* yakıt türü */}</p>
        </div>
      </div>
    </div>
  );
}
CarInfo.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  number_of_people: PropTypes.number.isRequired,
  number_of_suitcase: PropTypes.number.isRequired,
  gear: PropTypes.string.isRequired,
  fuel: PropTypes.string.isRequired,
};
CarInfo.defaultProps = {
  name: "Error",
  image: "Error",
  number_of_people: 0,
  number_of_suitcase: 0,
  gear: "Error",
  fuel: "Error",
};
export default CarInfo;
