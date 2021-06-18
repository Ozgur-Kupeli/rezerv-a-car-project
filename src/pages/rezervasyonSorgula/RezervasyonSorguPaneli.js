import React from "react";
import PropTypes from "prop-types";

function RezervasyonSorguPaneli({
  onClickSelectedHandleFunc,
  selected,
  rezervNoInputOnChangeFunc,
  tcInputOnChangeFunc,
  onClickRezervNoHandleFunc,
  rezervNoHata,
  onClickTCHandle,
  tcHata,
  tc,
}) {
  return (
    <div id="sorguPaneli">
      <button
        className="buttonSorgulama"
        onClick={(e) => onClickSelectedHandleFunc(e)}
        style={{
          background: selected ? "#b0aeb1" : "#666267",
        }}
        disabled={selected}
      >
        Rezervasyon No
      </button>
      <div id="bosluk"></div>
      <button
        className="buttonSorgulama"
        onClick={(e) => onClickSelectedHandleFunc(e)}
        style={{
          background: selected ? "#666267" : "#b0aeb1",
        }}
        disabled={!selected}
      >
        TC No
      </button>
      <div className="sorguContainer">
        <div
          className="sorgu"
          id="rezervNoIle"
          style={{
            display: selected ? "block" : "none",
          }}
        >
          <form>
            <input
              id="rezervNo"
              name="rezervno"
              placeholder="Rezervasyon No"
              maxLength={10}
              minLength={10}
              type="text"
              required
              onChange={(e) => rezervNoInputOnChangeFunc(e)}
            ></input>
            <button
              className="sorguButton"
              type="submit"
              onClick={(e) => onClickRezervNoHandleFunc(e)}
            >
              SORGULA
            </button>
          </form>
          <div className="hataMesaji">{rezervNoHata}</div>
        </div>
        <div
          className="sorgu"
          id="tcNoIle"
          style={{
            display: selected ? "none" : "block",
          }}
        >
          <form>
            <input
              id="tcNo"
              name="tcno"
              placeholder="TC No"
              maxLength={11}
              minLength={11}
              type="text"
              required
              value={tc}
              onChange={(e) => tcInputOnChangeFunc(e)}
            ></input>
            <button
              className="sorguButton"
              type="submit"
              onClick={(e) => onClickTCHandle(e)}
            >
              SORGULA
            </button>
          </form>
          <div className="hataMesaji">{tcHata}</div>
        </div>
      </div>
    </div>
  );
}
RezervasyonSorguPaneli.propTypes = {
  onClickSelectedHandleFunc: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  rezervNoInputOnChangeFunc: PropTypes.func.isRequired,
  tcInputOnChangeFunc: PropTypes.func.isRequired,
  onClickRezervNoHandleFunc: PropTypes.func.isRequired,
  rezervNoHata: PropTypes.string.isRequired,
  onClickTCHandle: PropTypes.func.isRequired,
  tcHata: PropTypes.string.isRequired,
  tc: PropTypes.string.isRequired,
};
RezervasyonSorguPaneli.defaultProps = {
  onClickSelectedHandleFunc: () => {},
  selected: true,
  rezervNoInputOnChangeFunc: () => {},
  tcInputOnChangeFunc: () => {},
  onClickRezervNoHandleFunc: () => {},
  rezervNoHata: "",
  onClickTCHandle: () => {},
  tcHata: "",
  tc: "",
};
export default RezervasyonSorguPaneli;
