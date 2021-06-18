import React from "react";
import AdminRezervasyonCardComponent from "./AdminRezervasyonCardComponent";
import PropTypes from "prop-types";
import { Col, Row } from "reactstrap";
import "../../assets/admin.scss";

function AdminRezervasyonComponent({
  offices,
  cars,
  rezervs,
  rezervsSort,
  rezervsFilter,
  guncelle,
}) {
  function filteredRezervs(x) {
    let arr = rezervs.filter((i) => {
      return i.durum === x;
    });
    return arr;
  }
  function sortedRezervs(x, arr) {
    switch (x) {
      case (x = "KAYIT"):
        return arr.sort((a, b) =>
          parseInt(Date.parse(new Date()) - a.rezerv_date_time) >
          parseInt(Date.parse(new Date()) - b.rezerv_date_time)
            ? 1
            : -1
        );

      case (x = "AL"):
        return arr.sort((a, b) =>
          parseInt(a.delivery_date_time) - Date.parse(new Date()) >
          parseInt(b.delivery_date_time) - Date.parse(new Date())
            ? 1
            : -1
        );

      default:
        //VER
        return arr.sort((a, b) =>
          parseInt(a.pickup_date_time) - Date.parse(new Date()) >
          parseInt(b.pickup_date_time) - Date.parse(new Date())
            ? 1
            : -1
        );
    }
  }

  return (
    <div>
      <Row style={{ margin: "4px auto", borderRadius: "8px" }}>
        {sortedRezervs(rezervsSort, filteredRezervs(rezervsFilter)).length <
        1 ? (
          <h6 style={{ color: "red", margin: "0 auto", padding: "32px 0" }}>
            Aranan kritere uygun rezervasyon bulunamadı!
          </h6>
        ) : (
          sortedRezervs(rezervsSort, filteredRezervs(rezervsFilter)).map(
            (rezerv) => (
              <Col
                style={{ margin: "4px auto", borderRadius: "8px" }}
                xs={12}
                md={9}
                lg={6}
                key={rezerv.rezerv_id}
              >
                <AdminRezervasyonCardComponent
                  guncelle={guncelle}
                  cars={cars}
                  offices={offices}
                  rezervs={rezervs}
                  id={rezerv.rezerv_id}
                  durum={rezerv.durum}
                  carImg={
                    cars.filter((i) => {
                      return i.id === rezerv.car_id;
                    })[0].image
                  }
                  carName={
                    cars.filter((i) => {
                      return i.id === rezerv.car_id;
                    })[0].name
                  }
                  rezervDT={rezerv.rezerv_date_time}
                  rezervNo={rezerv.rezerv_no}
                  pickupDT={rezerv.pickup_date_time}
                  deliveryDT={rezerv.delivery_date_time}
                  pickupOffice={
                    offices.filter((i) => {
                      return i.id === rezerv.pickup_office_id;
                    })[0].value
                  }
                  deliveryOffice={
                    offices.filter((i) => {
                      return i.id === rezerv.delivery_office_id;
                    })[0].value
                  }
                  totalDay={rezerv.total_day}
                />
              </Col>
            )
          )
        )}
      </Row>
    </div>
  );
}

AdminRezervasyonComponent.propTypes = {
  offices: PropTypes.array.isRequired,
  cars: PropTypes.array.isRequired,
  rezervs: PropTypes.array.isRequired,
  rezervsSort: PropTypes.string.isRequired,
  rezervsFilter: PropTypes.string.isRequired,
  guncelle: PropTypes.func.isRequired,
};
AdminRezervasyonComponent.defaultProps = {
  offices: [],
  cars: [],
  rezervs: [],
  rezervsSort: "",
  rezervsFilter: "",
  guncelle: () => {},
};

export default AdminRezervasyonComponent;
