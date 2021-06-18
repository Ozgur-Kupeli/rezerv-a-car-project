import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import AdminRezervasyonCard from "./AdminRezervasyonCard";
import AdminRezervasyonEditModal from "./AdminRezervasyonEditModal";
import "../../assets/admin.scss";

export class AdminRezervasyonCardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectRezervInfo: {},
      editModal: false,
      rtgIptalEt: false,
      rtgTeslimEt: false,
      rtgTeslimAl: false,
    };
  }
  getRezerv = async (id) => {
    const selectedRezerv = await this.props.rezervs.filter(
      (rezerv) => rezerv.rezerv_id === id
    )[0];
    const selectedCar = await this.props.cars.filter(
      (car) => car.id === selectedRezerv.car_id
    )[0];
    const selectedPickupOffice = await this.props.offices.filter(
      (office) => office.id === selectedRezerv.pickup_office_id
    )[0].value;
    const selectedDeliveryOffice = await this.props.offices.filter(
      (office) => office.id === selectedRezerv.delivery_office_id
    )[0].value;
    await axios
      .get(
        `http://localhost:3001/api/v2/get/customer/id/${selectedRezerv.customer_id}`
      )
      .then((res) =>
        this.setState({
          selectRezervInfo: {
            rezerv: selectedRezerv,
            customer: res.data,
            car: selectedCar,
            office: {
              pickup: selectedPickupOffice,
              delivery: selectedDeliveryOffice,
            },
          },
          editModal: true,
        })
      );
  };
  editModalClose = () => {
    this.setState({
      editModal: false,
    });
  };
  errorFunc = (x) => {
    let now = Date.parse(new Date());
    let pickupDTNow = parseInt(this.props.pickupDT);
    let deliveryDTNow = parseInt(this.props.deliveryDT);
    if (deliveryDTNow - now < 0 && x === "ARAÇ TESLİM") {
      return "ARAÇ MÜŞTERİDEN TESLİM ALINMADI";
    }
    if (pickupDTNow - now < 0 && x === "AKTİF") {
      return "ARAÇ MÜŞTERİYE TESLİM EDİLMEDİ";
    }
  };
  editRezerv = async (e, no) => {
    await axios
      .put(`http://localhost:3001/api/v2/update/rezervasyon`, {
        durum: e.target.value,
        rezerv_no: no,
      })
      .catch((err) => console.log(err));
    if (e.target.value === "İPTAL") {
      this.setState({
        rtgIptalEt: true,
      });
    }
    if (e.target.value === "ARAÇ TESLİM") {
      this.setState({
        rtgTeslimEt: true,
      });
    }
    if (e.target.value === "ARAÇ İADE") {
      this.setState({
        rtgTeslimAl: true,
      });
    }
    await setTimeout(() => {
      this.setState({
        rtgTeslimAl: false,
        rtgTeslimEt: false,
        rtgIptalEt: false,
      });
      setTimeout(() => {
        this.setState({ editModal: false });
        setTimeout(() => this.props.guncelle(true), 500);
      }, 500);
    }, 1000);
  };
  render() {
    return (
      <>
        <AdminRezervasyonCard
          cardInfo={{
            durum: this.props.durum,
            carImg: this.props.carImg,
            carName: this.props.carName,
            rezervDT: this.props.rezervDT,
            rezervNo: this.props.rezervNo,
            id: this.props.id,
            pickupDT: this.props.pickupDT,
            pickupOffice: this.props.pickupOffice,
            deliveryDT: this.props.deliveryDT,
            deliveryOffice: this.props.deliveryOffice,
            totalDay: this.props.totalDay,
            errorFunc: this.errorFunc,
            getRezerv: this.getRezerv,
          }}
        />
        <AdminRezervasyonEditModal
          selectRezervInfo={this.state.selectRezervInfo}
          editModal={this.state.editModal}
          editModalClose={this.editModalClose}
          durum={this.props.durum}
          editRezervFunc={this.editRezerv}
          rtgIptalEt={this.state.rtgIptalEt}
          rtgTeslimEt={this.state.rtgTeslimEt}
          rtgTeslimAl={this.state.rtgTeslimAl}
        />
      </>
    );
  }
}
AdminRezervasyonCardComponent.propTypes = {
  durum: PropTypes.string.isRequired,
  carImg: PropTypes.string.isRequired,
  carName: PropTypes.string.isRequired,
  rezervDT: PropTypes.string.isRequired,
  rezervNo: PropTypes.string.isRequired,
  pickupDT: PropTypes.string.isRequired,
  deliveryDT: PropTypes.string.isRequired,
  pickupOffice: PropTypes.string.isRequired,
  deliveryOffice: PropTypes.string.isRequired,
  totalDay: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  cars: PropTypes.array.isRequired,
  offices: PropTypes.array.isRequired,
  rezervs: PropTypes.array.isRequired,
  guncelle: PropTypes.func.isRequired,
};
AdminRezervasyonCardComponent.defaultProps = {
  durum: "",
  carImg: "",
  carName: "",
  rezervDT: "",
  rezervNo: "",
  pickupDT: "",
  deliveryDT: "",
  pickupOffice: "",
  deliveryOffice: "",
  totalDay: 0,
  id: "",
  cars: [],
  offices: [],
  rezervs: [],
  guncelle: () => {},
};

export default AdminRezervasyonCardComponent;
