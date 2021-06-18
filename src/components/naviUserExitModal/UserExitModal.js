import React from "react";
import "./userExitModal.scss";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import PropTypes from "prop-types";

function UserExitModal({ isOpen, exitFunc, cancelFunc }) {
  return (
    <Modal
      className="modalUserExit"
      returnFocusAfterClose={false}
      isOpen={isOpen}
      modalTransition={{ timeout: 400 }}
      backdrop="static" //modalın dışına tıklayınca kapanmaması için, kapanınca hata veriyor
      modalClassName="zx" //arka planı(modal dışı) transparent yapacak class
      //centered={true} dikeyde ortalama için
      size={"md"} // yada sm boyut ararlar
      //scrollable={true} içerik uzun olduğunda kaydırma çubuğu çıkar
    >
      <ModalBody className="h-auto w-auto bg-transparent">
        Çıkış yapmak istediğinize emin misiniz?
      </ModalBody>
      <ModalFooter className="d-flex justify-content-between border-0 bg-light">
        <Button
          className="h-auto"
          style={{
            background: "#23022e",
            padding: "4px 36px",
            marginLeft: "64px",
            width: "150px",
          }}
          onClick={() => exitFunc()}
        >
          Çıkış Yap
        </Button>
        <Button
          className="h-auto"
          style={{
            background: "#23022e",
            padding: "4px 36px",
            marginRight: "64px",
            width: "150px",
          }}
          onClick={() => cancelFunc()}
        >
          İptal
        </Button>
      </ModalFooter>
    </Modal>
  );
}
UserExitModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  exitFunc: PropTypes.func.isRequired,
  cancelFunc: PropTypes.func.isRequired,
};
UserExitModal.defaultProps = {
  isOpen: false,
  exitFunc: () => {},
  cancelFunc: () => {},
};

export default UserExitModal;
