import React from "react";
import "../../assets/admin.scss";
import PropTypes from "prop-types";

function AdminCarsTabMenu({ carsSort, carsSortFunc, addModalOpenFunc }) {
  return (
    <div className="adminFilterContainer">
      <select
        className="adminFilter"
        required
        value={carsSort}
        onChange={(e) => carsSortFunc(e)}
      >
        <option value="IsmeGore">Araç Adı A'dan Z'ye</option>
        <option value="FiyatArtan">Günlük Bedel Artan</option>
        <option value="FiyatAzalan">Günlük Bedel Azalan</option>
      </select>
      <button className="adminFilter" onClick={addModalOpenFunc}>
        ARAÇ EKLE
      </button>
    </div>
  );
}
AdminCarsTabMenu.propTypes = {
  carsSort: PropTypes.string.isRequired,
  carsSortFunc: PropTypes.func.isRequired,
  addModalOpenFunc: PropTypes.func.isRequired,
};
AdminCarsTabMenu.defaultProps = {
  carsSort: "IsmeGore",
  carsSortFunc: () => {},
  addModalOpenFunc: () => {},
};
export default AdminCarsTabMenu;
