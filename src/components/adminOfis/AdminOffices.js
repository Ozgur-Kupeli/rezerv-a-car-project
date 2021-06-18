import React from "react";
import PropTypes from "prop-types";

function AdminOffices({ name, id, duzenle, sil }) {
  return (
    <div className="adminOfisContainer">
      <div className="adminOfis">{name}</div>
      <div className="adminOfis">
        <button
          className="adminOfisButton"
          style={{ background: "#5cb85c", color: "#fff" }}
          value={id}
          onClick={(e) => duzenle(e)}
        >
          DÜZENLE
        </button>
        <button
          className="adminOfisButton"
          style={{ background: "#d9534f", color: "#fff" }}
          value={id}
          onClick={(e) => sil(e)}
        >
          SİL
        </button>
      </div>
    </div>
  );
}
AdminOffices.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  duzenle: PropTypes.func.isRequired,
  sil: PropTypes.func.isRequired,
};
AdminOffices.defaultProps = {
  name: "",
  id: 0,
  duzenle: () => {},
  sil: () => {},
};
export default AdminOffices;
