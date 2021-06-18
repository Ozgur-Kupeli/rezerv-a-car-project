import React from "react";
import PropTypes from "prop-types";
import "../../assets/admin.scss";

function AdminOfisTabMenu({ sort, officeSortFunc, addModalOpenFunc }) {
  return (
    <div className="adminFilterContainer">
      <select
        className="adminFilter"
        required
        value={sort}
        onChange={(e) => officeSortFunc(e)}
      >
        <option value="a-z">Ofis Adı A'dan Z'ye</option>
        <option value="z-a">Ofis Adı Z'den A'ya</option>
      </select>

      <button className="adminFilter" onClick={addModalOpenFunc}>
        OFİS EKLE
      </button>
    </div>
  );
}
AdminOfisTabMenu.propTypes = {
  sort: PropTypes.string.isRequired,
  officeSortFunc: PropTypes.func.isRequired,
  addModalOpenFunc: PropTypes.func.isRequired,
};
AdminOfisTabMenu.defaultProps = {
  sort: "a-z",
  officeSortFunc: () => {},
  addModalOpenFunc: () => {},
};
export default AdminOfisTabMenu;
