import React from "react";
import { Modal, ModalBody, Row, Col, Button } from "reactstrap";
import PropTypes from "prop-types";
import RTGAnimation from "../RTGAnimation";

function AdminOfficeDeleteModal({ modal, iptal, rtg, kaydet, ofis }) {
  return (
    <div>
      <Modal
        className="rezervasyonModalPrint"
        returnFocusAfterClose={false}
        isOpen={modal}
        modalTransition={{ timeout: 400 }}
        backdrop="static"
        modalClassName="adminRezervasyonModal"
        size={"md"}
      >
        <ModalBody className="h-auto w-100">
          <>
            <Row style={{ margin: "0 auto" }}>
              <Row style={{ margin: "16px auto" }}>
                <Col xs={12}>
                  <div
                    style={{
                      color: "#d9534f",
                      textAlign: "center",
                      marginTop: "8px",
                    }}
                  >
                    Ofis, bir rezervasyonda kayıtlı ise kayıtlı olduğu
                    rezervasyon da silinecektir!
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <span style={{ color: "#d9534f", fontSize: "16px" }}>
                      {ofis.value}
                    </span>{" "}
                    isimli ofis silinsin mi?
                  </div>
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
                      color="danger"
                      onClick={kaydet}
                      style={{ margin: "8px auto" }}
                    >
                      EVET
                    </Button>
                    <RTGAnimation rtgOpen={rtg} rtgMessage={"Ofis Silindi!"} />
                  </div>
                </Col>
                <Col xs={10}>
                  <div
                    style={{
                      position: "relative",
                    }}
                  >
                    <Button
                      color="success"
                      onClick={iptal}
                      style={{ margin: "8px auto" }}
                    >
                      HAYIR
                    </Button>
                  </div>
                </Col>
              </Row>
            </Row>
          </>
        </ModalBody>
      </Modal>
    </div>
  );
}
AdminOfficeDeleteModal.propTypes = {
  modal: PropTypes.bool.isRequired,
  kaydet: PropTypes.func.isRequired,
  iptal: PropTypes.func.isRequired,
  rtg: PropTypes.bool.isRequired,
  ofis: PropTypes.object.isRequired,
};
AdminOfficeDeleteModal.defaultProps = {
  modal: false,
  kaydet: () => {},
  iptal: () => {},
  rtg: false,
  ofis: {},
};
export default AdminOfficeDeleteModal;
