import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Input, Row, Col } from "reactstrap";
import RTGAnimation from "../RTGAnimation";

function AdminOfficeAdd({ kaydetFunc, rtgKaydet, iptalFunc, office }) {
  const [ofis, setOfis] = useState(office.id ? office.value : "");
  return (
    <Row style={{ margin: "0 auto" }}>
      <Row style={{ margin: "16px auto" }}>
        <Col xs={12}>
          Ofis
          <Input
            type="text"
            value={ofis}
            onChange={(event) => setOfis(event.target.value)}
            required
            style={{
              fontSize: "14px",
              width: "100%",
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          ></Input>
        </Col>
      </Row>
      <Row style={{ margin: "32px auto" }}>
        <Col xs={10}>
          <div
            style={{
              position: "relative",
            }}
          >
            <Button
              color="success"
              onClick={() => kaydetFunc(ofis)}
              style={{ margin: "8px auto" }}
              disabled={office.id ? false : ofis === "" ? true : false}
            >
              KAYDET
            </Button>
            <RTGAnimation
              rtgOpen={rtgKaydet}
              rtgMessage={office.id ? "Ofis Güncellendi!" : "Ofis Eklendi!"}
            />
          </div>
        </Col>
        <Col xs={10}>
          <div
            style={{
              position: "relative",
            }}
          >
            <Button
              color="danger"
              onClick={iptalFunc}
              style={{ margin: "8px auto" }}
            >
              İPTAL
            </Button>
          </div>
        </Col>
      </Row>
    </Row>
  );
}
AdminOfficeAdd.propTypes = {
  kaydetFunc: PropTypes.func.isRequired,
  rtgKaydet: PropTypes.bool.isRequired,
  iptalFunc: PropTypes.func.isRequired,
  office: PropTypes.object.isRequired,
};
AdminOfficeAdd.defaultProps = {
  kaydetFunc: () => {},
  rtgKaydet: false,
  iptalFunc: () => {},
  office: {},
};
export default AdminOfficeAdd;
