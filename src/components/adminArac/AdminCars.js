import React from "react";
import CarInfo from "../cars/CarInfo";
import CarInfoWithoutTotalPrice from "../cars/CarInfoWithoutTotalPrice";
import PropTypes from "prop-types";

function AdminCars({ car, editModal, deleteCar }) {
  return (
    <div>
      <div
        style={{
          border: "1px solid rgba(117, 104, 104, 0.5)",
          background: "#eff8e2",
          margin: "8px auto",
          padding: "8px",
        }}
      >
        <CarInfo
          name={car.name}
          image={car.image}
          number_of_people={car.number_of_people}
          number_of_suitcase={car.number_of_suitcase}
          gear={car.gear}
          fuel={car.fuel}
        />
        <CarInfoWithoutTotalPrice
          age_limit={car.age_limit}
          license_age={car.license_age}
          daily_price={car.daily_price}
          id={car.id}
          editModal={editModal}
          deleteCar={deleteCar}
        />
      </div>
    </div>
  );
}
AdminCars.propTypes = {
  cars: PropTypes.array.isRequired,
  editModal: PropTypes.func.isRequired,
  deleteCar: PropTypes.func.isRequired,
};
AdminCars.defaultProps = {
  cars: [],
  editModal: () => {},
  deleteCar: () => {},
};

export default AdminCars;
