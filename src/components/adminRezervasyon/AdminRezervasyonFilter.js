import React from "react";
import "../../assets/admin.scss";
import PropTypes from "prop-types";

function AdminRezervasyonFilter({
  rezervsSort,
  rezervsFilter,
  rezervsSortFunc,
  rezervsFilterFunc,
}) {
  return (
    <div className="adminFilterContainer">
      <select
        className="adminFilter"
        required
        value={rezervsFilter}
        onChange={(e) => rezervsFilterFunc(e)}
      >
        <option value="AKTİF">AKTİF REZERVASYONLAR</option>
        <option value="İPTAL">İPTAL OLAN REZERVASYONLAR</option>
        <option value="ARAÇ TESLİM">ARAÇ TESLİM EDİLEN REZERVASYONLAR</option>
        <option value="ARAÇ İADE">ARAÇ TESLİM ALINAN REZERVASYONLAR</option>
      </select>
      <select
        className="adminFilter"
        required
        value={rezervsSort}
        onChange={(e) => rezervsSortFunc(e)}
      >
        <option value="VER">TESLİM ETME TARİHİ EN YAKIN</option>
        <option value="AL">TESLİM ALMA TARİHİ EN YAKIN</option>
        <option value="KAYIT">REZERVASYON KAYIT TARİHİNE GÖRE EN YENİ</option>
      </select>
    </div>
  );
}
AdminRezervasyonFilter.propTypes = {
  rezervsSort: PropTypes.string.isRequired,
  rezervsFilter: PropTypes.string.isRequired,
  rezervsSortFunc: PropTypes.func.isRequired,
  rezervsFilterFunc: PropTypes.func.isRequired,
};
AdminRezervasyonFilter.defaultProps = {
  rezervsSort: "VER",
  rezervsFilter: "AKTİF",
  rezervsSortFunc: () => {},
  rezervsFilterFunc: () => {},
};
export default AdminRezervasyonFilter;
