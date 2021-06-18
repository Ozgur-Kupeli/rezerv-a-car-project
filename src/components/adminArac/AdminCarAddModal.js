import React from "react";
import { Modal, ModalBody } from "reactstrap";
import AdminCarEdit from "./AdminCarEdit";
import PropTypes from "prop-types";

function AdminCarAddModal({ modal, iptal, rtg, kaydet }) {
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
AdminCarAddModal.propTypes = {
  modal: PropTypes.bool.isRequired,
  kaydet: PropTypes.func.isRequired,
  iptal: PropTypes.func.isRequired,
  rtg: PropTypes.bool.isRequired,
};
AdminCarAddModal.defaultProps = {
  modal: false,
  kaydet: () => {},
  iptal: () => {},
  rtg: false,
};
export default AdminCarAddModal;
