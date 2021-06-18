import React from "react";
import PropTypes from "prop-types";
import { Modal, ModalBody } from "reactstrap";
import AdminCarEdit from "./AdminCarEdit";
//import RTGAnimation from "../RTGAnimation";

function AdminCarEditModal({ car, modal, kaydet, iptal, rtg }) {
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
        <ModalBody className="h-auto w-auto">
          <>
            <AdminCarEdit
              arac={car}
              kaydetFunc={kaydet}
              rtgKaydet={rtg}
              iptalFunc={iptal}
            />
          </>
        </ModalBody>
      </Modal>
    </div>
  );
}
AdminCarEditModal.propTypes = {
  car: PropTypes.object.isRequired,
  modal: PropTypes.bool.isRequired,
  kaydet: PropTypes.func.isRequired,
  iptal: PropTypes.func.isRequired,
  rtg: PropTypes.bool.isRequired,
};
AdminCarEditModal.defaultProps = {
  car: {},
  modal: false,
  kaydet: () => {},
  iptal: () => {},
  rtg: false,
};
export default AdminCarEditModal;
