import React from "react";
import PropTypes from "prop-types";

function CarPriceInfo({
  age_limit,
  license_age,
  dissplay,
  daily_price,
  id,
  carSelectHandle,
}) {
  return (
    <div>
      <div className="textAndButton">
        <p className="uyari">
          {`Bu aracı kiralayabilmek için ${age_limit} yaşından büyük ve minimum ${license_age} yıllık ehliyet sahibi olmak
          gereklidir`}
          {/* yaş ve ehliyet şartı */}
        </p>
        <div
          className="fiyatBttn"
          style={{
            display: dissplay ? "block" : "none",
          }}
        >
          <div className="fiyat">
            {parseInt(sessionStorage.rg) * daily_price}
            <div>TL</div>
            {/* hesaplanmış fiyat */}
          </div>
          <div className="gunluk">{daily_price} TL / Günlük Tutar</div>
          {/* günlük fiyat */}
          <div className="gun">{sessionStorage.rg} Gün</div>

          <button
            className="bttn"
            onClick={() => {
              carSelectHandle(`${id}`);
            }}
          >
            Aracı Seç
          </button>
        </div>
      </div>
    </div>
  );
}
CarPriceInfo.propTypes = {
  age_limit: PropTypes.number.isRequired,
  license_age: PropTypes.number.isRequired,
  dissplay: PropTypes.bool.isRequired,
  daily_price: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  carSelectHandle: PropTypes.func.isRequired,
};
CarPriceInfo.defaultProps = {
  age_limit: 19,
  license_age: 1,
  dissplay: false,
  daily_price: 1000,
  id: 0,
  carSelectHandle: () => {},
};

export default CarPriceInfo;
