import React from "react";
import { Col, FormGroup, Input, Label, Row } from "reactstrap";
import PropTypes from "prop-types";

function RezervInputs({
  officeLabel,
  officeValue,
  officeOnChange,
  officeList,
  dateLabel,
  dateValue,
  dateOnChange,
  timeLabel,
  timeValue,
  timeOnChange,
  dateValuePickup,
}) {
  return (
    <Row
      style={{
        border: "1px solid #d3d3d3",
        margin: "0 auto",
        padding: ".5rem 0",
        borderRadius: "0",
        background: "transparent",
      }}
    >
      <Row
        style={{ background: "transparent", margin: "0 auto", padding: "0" }}
      >
        <Col
          xs={12}
          style={{
            background: "transparent",
          }}
        >
          <FormGroup style={{ background: "transparent" }}>
            <Label
              for="ofis"
              style={{
                background: "transparent",
                color: "#f7f7f7",
              }}
            >
              {officeLabel}
            </Label>
            <Input
              type="select"
              name="ofis"
              required
              value={officeValue}
              onChange={(e) => officeOnChange(e)}
              style={{ borderRadius: "0" }}
            >
              <option value=""></option>
              {officeList.map((o) => (
                <option key={o.id} value={o.value}>
                  {o.value}
                </option>
              ))}
            </Input>
          </FormGroup>
        </Col>
      </Row>

      <Row
        style={{ background: "transparent", margin: "0 auto", padding: "0" }}
      >
        <Col xs={7} style={{ background: "transparent" }}>
          <FormGroup style={{ background: "transparent" }}>
            <Label
              for="tarih"
              style={{
                background: "transparent",
                color: "#f7f7f7",
              }}
            >
              {dateLabel}
            </Label>
            <Input
              type="date"
              name="tarih"
              required
              style={{
                border: "1px solid #d3d3d3",
                height: "40px",
                borderRadius: "0",
              }}
              min={
                dateValuePickup !== ""
                  ? dateValuePickup
                  : new Date().toISOString().split("T")[0]
              }
              value={dateValue}
              onChange={(e) => dateOnChange(e)}
            />
          </FormGroup>
        </Col>
        <Col xs={5} style={{ background: "transparent" }}>
          <FormGroup style={{ background: "transparent" }}>
            <Label
              for="saat"
              style={{
                background: "transparent",
                color: "#f7f7f7",
              }}
            >
              {timeLabel}
            </Label>
            <Input
              type="time"
              name="saat"
              required
              style={{
                border: "1px solid #d3d3d3",
                height: "40px",
                borderRadius: "0",
              }}
              value={timeValue}
              onChange={(e) => timeOnChange(e)}
            />
          </FormGroup>
        </Col>
      </Row>
    </Row>
  );
}
RezervInputs.propTypes = {
  officeLabel: PropTypes.string.isRequired,
  officeValue: PropTypes.string.isRequired,
  officeOnChange: PropTypes.func.isRequired,
  officeList: PropTypes.array.isRequired,
  dateLabel: PropTypes.string.isRequired,
  dateValue: PropTypes.string.isRequired,
  dateValuePickup: PropTypes.string.isRequired,
  dateOnChange: PropTypes.func.isRequired,
  timeLabel: PropTypes.string.isRequired,
  timeValue: PropTypes.string.isRequired,
  timeOnChange: PropTypes.func.isRequired,
};
RezervInputs.defaultProps = {
  officeLabel: "...",
  officeValue: "",
  officeOnChange: () => {},
  officeList: [],
  dateLabel: "...",
  dateValue: "",
  dateValuePickup: "",
  dateOnChange: () => {},
  timeLabel: "...",
  timeValue: "",
  timeOnChange: () => {},
};
export default RezervInputs;
