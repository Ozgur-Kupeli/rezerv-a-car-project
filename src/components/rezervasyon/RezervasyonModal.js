import React from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import "./rezervasyon.scss";
import PropTypes from "prop-types";

function RezervasyonModal({
  rezervasyonModalOpen,
  rezervasyonNo,
  modalCloseHandle,
  modalPrintHandle,
}) {
  return (
    <Modal
      className="rezervasyonModalPrint"
      returnFocusAfterClose={false}
      isOpen={rezervasyonModalOpen}
      modalTransition={{ timeout: 400 }}
      //toggle={this.modalHandle}
      backdrop="static"
      modalClassName="rezervasyonModal"
      size={"md"}
    >
      <ModalBody className="h-auto w-auto">
        Rezervasyon başarıyla gerçekleştirildi! Rezervasyon numaranız :
        <h1 style={{ textAlign: "center", color: "#d9534f" }}>
          {rezervasyonNo}
        </h1>
      </ModalBody>
      <ModalFooter
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Button
          color="primary"
          onClick={modalPrintHandle}
          style={{
            margin: "0 auto",
            width: "100px",
          }}
        >
          BELGE AL
        </Button>
        <Button
          color="danger"
          onClick={modalCloseHandle}
          style={{
            margin: "0 auto",
            width: "100px",
          }}
        >
          TAMAMLA
        </Button>
      </ModalFooter>
    </Modal>
  );
}
RezervasyonModal.propTypes = {
  rezervasyonModalOpen: PropTypes.bool.isRequired,
  rezervasyonNo: PropTypes.string.isRequired,
  modalCloseHandle: PropTypes.func.isRequired,
  modalPrintHandle: PropTypes.func.isRequired,
};
RezervasyonModal.defaultProps = {
  rezervasyonModalOpen: false,
  rezervasyonNo: "",
  modalCloseHandle: () => {},
  modalPrintHandle: () => {},
};

export default RezervasyonModal;
