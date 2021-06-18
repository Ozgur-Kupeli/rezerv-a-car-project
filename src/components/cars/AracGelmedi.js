import React, { useState } from "react";
import cars from "../../services/static/araclar.json";

function AracGelmedi() {
  const [gun, setGun] = useState(1);
  const [dissplay, setDissplay] = useState(false);
  return (
    <div className="container-flued">
      <h1 style={{ textAlign: "center" }}>
        {" "}
        Veritabanından araçlar alınamadı!
      </h1>
      <h4 style={{ textAlign: "center", color: "red" }}>
        {" "}
        Aşağıdakiler örnektir!
      </h4>
      <div style={{ display: "inline-block", textAlign: "center" }}>
        <label style={{ width: "auto", margin: "16px" }}>
          Kiralama Süresi Belirle (min 1 gün){" "}
        </label>
        <input
          style={{ width: "150px", margin: "16px" }}
          onChange={(e) => {
            setGun(e.target.value <= 1 ? 1 : e.target.value);
            setDissplay(false);
          }}
          value={gun}
        />

        <button
          style={{
            width: "150px",
            color: "white",
            background: "purple",
            margin: "16px",
          }}
          onClick={() => setDissplay(!dissplay)}
        >
          Belirle
        </button>
      </div>
      <div className="container">
        <div className="row">
          {cars.map((car) => (
            <div
              className="col-12 col-sm-12 col-md-9 col-lg-6 col-xl-4"
              key={car.id}
            >
              <div className="cardContainer">
                <div className="cardHeader">{car.name}</div>
                <div className="cardImage">
                  {/* araç resmi*/}
                  <img src={`${car.image}`} alt={`${car.name}`} />
                </div>
                <div className="cardText">
                  <div className="imgContainer">
                    <img
                      className="img"
                      src={"/carImage/300x300kisi.png"}
                      alt="kaç kişilik"
                    />
                    <p className="imgText">{car.number_of_people} Kişi</p>
                  </div>

                  <div className="imgContainer">
                    <img
                      className="img"
                      src={"/carImage/300x300bavul.png"}
                      alt="Kaç bavul Alır"
                    />
                    <p className="imgText">{car.number_of_suitcase} bavul</p>
                  </div>

                  <div className="imgContainer">
                    <img
                      className="img"
                      src={"/carImage/300x300vites.png"}
                      alt="Vites Tipi"
                    />
                    <p className="imgText">{car.gear /* vites tipi */}</p>
                  </div>

                  <div className="imgContainer">
                    <img
                      className="img"
                      src={"/carImage/300x300penzin.png"}
                      alt="Yakıt Türü"
                    />
                    <p className="imgText">{car.fuel /* yakıt türü */}</p>
                  </div>
                </div>
                <div className="textAndButton">
                  <p className="uyari">
                    {`Bu aracı kiralayabilmek için ${car.age_limit} yaşından büyük ve minimum ${car.license_age} yıllık ehliyet sahibi olmak
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
                      {gun * car.daily_price}
                      <div>TL</div>
                      {/* hesaplanmış fiyat */}
                    </div>
                    <div className="gunluk">
                      {car.daily_price} TL / Günlük Tutar
                    </div>
                    {/* günlük fiyat */}
                    <div className="gun">{gun} Gün</div>

                    <button
                      className="bttn"
                      onClick={() => this.carSelectHandle(`${car.id}`)}
                    >
                      Aracı Seç
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AracGelmedi;
