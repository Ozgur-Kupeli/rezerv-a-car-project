import React from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import "../../assets/admin.scss";
import PropTypes from "prop-types";
import RezervasyonCarAndOfficeInfo from "../rezervasyon/RezervasyonCarAndOfficeInfo";
import RezervasyonUserInfo from "../rezervasyon/RezervasyonUserInfo";
import RTGAnimation from "../RTGAnimation";

function AdminRezervasyonEditModal({
  selectRezervInfo,
  editModal,
  editModalClose,
  durum,
  editRezervFunc,
  rtgIptalEt,
  rtgTeslimEt,
  rtgTeslimAl,
}) {
  return (
    <Modal
      className="rezervasyonModalPrint"
      returnFocusAfterClose={false}
      isOpen={editModal}
      modalTransition={{ timeout: 400 }}
      //toggle={this.modalHandle}
      backdrop="static"
      modalClassName="adminRezervasyonModal"
      size={"md"}
    >
      <ModalBody className="h-auto w-auto">
        {editModal === true && (
          <>
            <RezervasyonCarAndOfficeInfo
              image={selectRezervInfo.car.image}
              name={selectRezervInfo.car.name}
              pickup_office={selectRezervInfo.office.pickup}
              pickup_date_time={selectRezervInfo.rezerv.pickup_date_time}
              delivery_office={selectRezervInfo.office.delivery}
              delivery_date_time={selectRezervInfo.rezerv.delivery_date_time}
              daily_price={selectRezervInfo.car.daily_price.toString()}
              kac_gun={selectRezervInfo.rezerv.total_day.toString()}
            />
            <RezervasyonUserInfo
              adSoyad={selectRezervInfo.customer.ad_soyad}
              tc={selectRezervInfo.customer.tc_no}
              dogumTar={
                new Date(parseInt(selectRezervInfo.customer.dogum_tarihi))
                  .toISOString()
                  .split("T")[0]
              }
              ehliyetTar={
                new Date(
                  parseInt(selectRezervInfo.customer.ehliyet_alis_tarihi)
                )
                  .toISOString()
                  .split("T")[0]
              }
              cinsiyet={selectRezervInfo.customer.cinsiyet}
              eposta={selectRezervInfo.customer.eposta}
              telefon={selectRezervInfo.customer.telefon_no}
              adres={selectRezervInfo.customer.adres}
              disabledMi={true}
            />
          </>
        )}
      </ModalBody>
      <ModalFooter>
        <div
          style={{
            textAlign: "center",
            position: "relative",
            display: durum === "AKTİF" ? "block" : "none",
          }}
        >
          <Button
            color="success"
            value="İPTAL"
            onClick={(e) =>
              editRezervFunc(e, selectRezervInfo.rezerv.rezerv_no)
            }
            style={{ width: "80%" }}
          >
            REZERVASYONU İPTAL ET
          </Button>
          <RTGAnimation
            rtgOpen={rtgIptalEt}
            rtgMessage={"Rezervasyon İptal Edildi!"}
          />
        </div>
        <div
          style={{
            textAlign: "center",
            position: "relative",
            display: durum === "AKTİF" ? "block" : "none",
          }}
        >
          <Button
            color="primary"
            value="ARAÇ TESLİM"
            onClick={(e) =>
              editRezervFunc(e, selectRezervInfo.rezerv.rezerv_no)
            }
            style={{ width: "80%" }}
          >
            ARAÇ TESLİM ET
          </Button>
          <RTGAnimation
            rtgOpen={rtgTeslimEt}
            rtgMessage={"Araç Teslim Edildi!"}
          />
        </div>
        <div
          style={{
            textAlign: "center",
            position: "relative",
            display: durum === "ARAÇ TESLİM" ? "block" : "none",
          }}
        >
          <Button
            color="warning"
            value="ARAÇ İADE"
            onClick={(e) =>
              editRezervFunc(e, selectRezervInfo.rezerv.rezerv_no)
            }
            style={{ width: "80%" }}
          >
            ARAÇ TESLİM AL
          </Button>
          <RTGAnimation
            rtgOpen={rtgTeslimAl}
            rtgMessage={"Araç Teslim Alındı!"}
          />
        </div>
        <div
          style={{
            textAlign: "center",
            position: "relative",
            display: "inline-block",
          }}
        >
          <Button
            color="danger"
            onClick={editModalClose}
            style={{ width: "80%" }}
          >
            İPTAL
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
}
AdminRezervasyonEditModal.propTypes = {
  selectRezervInfo: PropTypes.object.isRequired,
  editModal: PropTypes.bool.isRequired,
  editModalClose: PropTypes.func.isRequired,
  durum: PropTypes.string.isRequired,
  editRezervFunc: PropTypes.func.isRequired,
  rtgIptalEt: PropTypes.bool.isRequired,
  rtgTeslimEt: PropTypes.bool.isRequired,
  rtgTeslimAl: PropTypes.bool.isRequired,
};
AdminRezervasyonEditModal.defaultProps = {
  selectRezervInfo: {},
  editModal: false,
  editModalClose: () => {},
  durum: "",
  editRezervFunc: () => {},
  rtgIptalEt: false,
  rtgTeslimEt: false,
  rtgTeslimAl: false,
};

export default AdminRezervasyonEditModal;
