import React from "react";
import { Modal, ModalBody } from "reactstrap";
import AdminOfficeAdd from "./AdminOfficeAdd";
import PropTypes from "prop-types";

function AdminOfficeAddModal({
  modal,
  iptal,
  rtg,
  kaydet,
  selectedOffice,
  hata,
}) {
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
        <ModalBody className="h-auto w-auto">
          <>
            <div
              style={{
                textAlign: "center",
                color: "red",
                display: hata ? "block" : "none",
              }}
            >
              Girilen ofis zaten mevcuttur!
            </div>
            <AdminOfficeAdd
              kaydetFunc={kaydet}
              rtgKaydet={rtg}
              iptalFunc={iptal}
              office={selectedOffice}
            />
          </>
        </ModalBody>
      </Modal>
    </div>
  );
}
AdminOfficeAddModal.propTypes = {
  modal: PropTypes.bool.isRequired,
  kaydet: PropTypes.func.isRequired,
  iptal: PropTypes.func.isRequired,
  rtg: PropTypes.bool.isRequired,
  hata: PropTypes.bool.isRequired,
  selectedOffice: PropTypes.object.isRequired,
};
AdminOfficeAddModal.defaultProps = {
  modal: false,
  kaydet: () => {},
  iptal: () => {},
  rtg: false,
  hata: false,
  selectedOffice: {},
};
export default AdminOfficeAddModal;
