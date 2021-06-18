import React, { useState } from "react";
import { Button, Modal, ModalBody, Col, Row } from "reactstrap";
import PropTypes from "prop-types";
import RTGAnimation from "../RTGAnimation";

function AdminCarDeleteModal({ car, modal, modalCloseFunc, kaydet, rtg }) {
  const [load, setLoad] = useState(false);
  function sil() {
    setLoad(true);
    kaydet();
  }
  return (
    <div>
      <Modal
        className="rezervasyonModalPrint"
        returnFocusAfterClose={false}
        isOpen={modal}
        modalTransition={{ timeout: 400 }}
        //toggle={this.modalHandle}
        backdrop="static"
        modalClassName="adminRezervasyonModal"
        size={"md"}
      >
        <ModalBody className="h-auto w-100">
          <div style={{ textAlign: "center", margin: "32px 0" }}>
            <div style={{ color: "#d9534f" }}>
              Arac, bir rezervasyonda kayıtlı ise kayıtlı olduğu rezervasyon da
              silinecektir!
            </div>
            <div>
              <span style={{ color: "#d9534f" }}>{car.name} </span>
              isimli arac silinsin mi?
            </div>
          </div>
          <div
            style={{
              display: load ? "block" : "none",
              textAlign: "center",
              width: "100%",
              color: "red",
            }}
          >
            Araç Silindi!
          </div>
          <Row style={{ margin: "0 auto" }}>
            <Col xs={10}>
              <div
                style={{
                  position: "relative",
                }}
              >
                <Button
                  color="danger"
                  onClick={sil}
                  style={{ margin: "8px auto" }}
                >
                  EVET
                </Button>
                <RTGAnimation rtgOpen={rtg} rtgMessage={"Araç Silindi!"} />
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
                  onClick={() => modalCloseFunc()}
                  style={{ margin: "8px auto" }}
                >
                  HAYIR
                </Button>
              </div>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  );
}
AdminCarDeleteModal.propTypes = {
  modal: PropTypes.bool.isRequired,
  rtg: PropTypes.bool.isRequired,
  car: PropTypes.object.isRequired,
  modalCloseFunc: PropTypes.func.isRequired,
  kaydet: PropTypes.func.isRequired,
};
AdminCarDeleteModal.defaultProps = {
  modal: false,
  rtg: false,
  car: {},
  modalCloseFunc: () => {},
  kaydet: () => {},
};
export default AdminCarDeleteModal;
