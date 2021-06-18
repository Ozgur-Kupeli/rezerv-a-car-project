import React, { Component } from "react";
import PropTypes from "prop-types";
import AdminOffices from "./AdminOffices";
import { Col, Row } from "reactstrap";
import AdminOfisTabMenu from "./AdminOfisTabMenu";
import AdminOfficeAddModal from "./AdminOfficeAddModal";
import AdminOfficeEditModal from "./AdminOfficeEditModal";
import AdminOfficeDeleteModal from "./AdminOfficeDeleteModal";
import axios from "axios";
import uniqueArray from "array-unique";
import LoadingAnimation from "../LoadingAnimation";

export class AdminOfficesComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: "a-z",
      addModal: false,
      editModal: false,
      rtg: false,
      deleteModal: false,
      rtgDelete: false,
      hata: false,
      selectedOffice: {
        id: "",
        value: "",
      },
      deleteOffice: {
        id: "",
        value: "",
      },
    };
  }
  duzenle = async (e) => {
    e.preventDefault();
    await this.setState({
      selectedOffice: {
        id: e.target.value,
        value: this.props.offices.filter(
          (i) => i.id === parseInt(e.target.value)
        )[0].value,
      },
      editModal: true,
    });
  };
  sil = async (e) => {
    await e.preventDefault();
    await this.setState({
      deleteOffice: {
        id: e.target.value,
        value: this.props.offices.filter(
          (i) => i.id === parseInt(e.target.value)
        )[0].value,
      },
      deleteModal: true,
    });
  };

  sort = async (e) => {
    await this.setState({
      sort: e.target.value,
    });
  };
  officesSorted = (x, arr) => {
    switch (x) {
      case (x = "z-a"):
        return arr.sort((a, b) => (a.value > b.value ? -1 : 1));
      default:
        return arr.sort((a, b) => (a.value > b.value ? 1 : -1));
    }
  };

  addModalOpen = () => {
    this.setState({
      addModal: true,
    });
  };
  addModalClose = () => {
    this.setState({
      addModal: false,
    });
  };
  editModalClose = () => {
    this.setState({
      editModal: false,
    });
  };
  deleteModalClose = () => {
    this.setState({
      deleteModal: false,
    });
  };
  officeAdd = async (ofis) => {
    const arr = await this.props.offices.filter((i) => i.value === ofis);
    if (arr.length > 0) {
      this.setState({
        hata: true,
      });
    } else {
      await this.setState({
        hata: false,
      });
      await axios
        .post("http://localhost:3001/offices/post", {
          value: ofis,
        })
        .then((res) => {
          if (res.status === 201) {
            this.setState({
              rtg: true,
            });
            setTimeout(() => {
              this.props.guncelle(true);
              setTimeout(() => {
                this.setState({
                  rtg: false,
                  addModal: false,
                });
              }, 500);
            }, 1000);
          }
        });
    }
  };
  officeEdit = async (ofis) => {
    const arr = await this.props.offices.filter((i) => i.value === ofis);
    if (arr.length > 0) {
      this.setState({
        hata: true,
      });
    } else {
      await this.setState({
        hata: false,
      });
      await axios
        .put(
          `http://localhost:3001/offices/update/id/${this.state.selectedOffice.id}`,
          {
            value: ofis,
          }
        )
        .then((res) => {
          if (res.status === 200) {
            this.setState({
              rtg: true,
            });
            setTimeout(() => {
              this.props.guncelle(true);
              setTimeout(() => {
                this.setState({
                  rtg: false,
                  editModal: false,
                  selectedOffice: { id: "", value: "" },
                });
              }, 500);
            }, 1000);
          }
        });
    }
  };
  officeDelete = async () => {
    const pickupRezerv = await this.props.rezervs.filter(
      (i) => i.pickup_office_id === parseInt(this.state.deleteOffice.id)
    );
    const deliveryRezerv = await this.props.rezervs.filter(
      (i) => i.delivery_office_id === parseInt(this.state.deleteOffice.id)
    );
    const rezervList = await pickupRezerv.concat(deliveryRezerv);

    let rezervIdArr = [];
    if (rezervList.length > 0) {
      for (let i = 0; i < rezervList.length; i++) {
        rezervIdArr.push(parseInt(rezervList[i].rezerv_id));
      }
    }
    //dizideki elemanlar benzersiz olsun.sonuçta 1den fazla rezervasyon aynı ofisi kullanabilir
    let newX = await this.arrayUniq(rezervIdArr);

    if (newX.length > 0) {
      await newX.forEach((i) =>
        axios
          .delete(`http://localhost:3001/api/v2/delete/rezervasyon/${i}`)
          .catch((err) => console.log("Rezervasyon silerken hata : " + err))
      );
      await axios
        .delete(
          `http://localhost:3001/offices/delete/id/${this.state.deleteOffice.id}`
        )
        .then((res) => {
          if (res.status === 204) {
            this.setState({
              rtgDelete: true,
            });
            setTimeout(() => {
              this.props.guncelle(true);
              setTimeout(() => {
                this.setState({
                  rtgDelete: false,
                  deleteModal: false,
                  selectedOffice: { id: "", value: "" },
                });
              }, 500);
            }, 1000);
          }
        })
        .catch((err) => console.log("Ofis silerken hata : " + err));
    } else {
      await axios
        .delete(
          `http://localhost:3001/offices/delete/id/${this.state.deleteOffice.id}`
        )
        .then((res) => {
          if (res.status === 204) {
            this.setState({
              rtgDelete: true,
            });
            setTimeout(() => {
              this.props.guncelle(true);
              setTimeout(() => {
                this.setState({
                  rtgDelete: false,
                  deleteModal: false,
                  selectedOffice: { id: "", value: "" },
                });
              }, 500);
            }, 1000);
          }
        })
        .catch((err) => console.log("Ofis silerken hata : " + err));
    }
  };
  arrayUniq = (arr) => {
    return uniqueArray(arr);
  };
  render() {
    return (
      <>
        <AdminOfisTabMenu
          sort={this.state.sort}
          officeSortFunc={this.sort}
          addModalOpenFunc={this.addModalOpen}
        />
        {this.props.offices.length === 0 ? (
          <>
            <LoadingAnimation animationKey={true} />
            <div>Ofis bulunamadı!</div>
          </>
        ) : (
          <Row style={{ margin: "0 auto" }}>
            {this.officesSorted(this.state.sort, this.props.offices).map(
              (i) => (
                <Col
                  xs={12}
                  md={9}
                  lg={6}
                  style={{ margin: "0 auto" }}
                  key={i.id}
                >
                  <AdminOffices
                    name={i.value}
                    id={i.id}
                    duzenle={this.duzenle}
                    sil={this.sil}
                  />
                </Col>
              )
            )}
          </Row>
        )}

        <AdminOfficeAddModal
          modal={this.state.addModal}
          rtg={this.state.rtg}
          iptal={this.addModalClose}
          kaydet={this.officeAdd}
          selectedOffice={this.state.selectedOffice}
          hata={this.state.hata}
        />
        <AdminOfficeEditModal
          modal={this.state.editModal}
          rtg={this.state.rtg}
          iptal={this.editModalClose}
          kaydet={this.officeEdit}
          selectedOffice={this.state.selectedOffice}
          hata={this.state.hata}
        />
        <AdminOfficeDeleteModal
          modal={this.state.deleteModal}
          rtg={this.state.rtgDelete}
          iptal={this.deleteModalClose}
          kaydet={this.officeDelete}
          ofis={this.state.deleteOffice}
        />
      </>
    );
  }
}
AdminOfficesComponent.propTypes = {
  offices: PropTypes.array.isRequired,
  rezervs: PropTypes.array.isRequired,
  guncelle: PropTypes.func.isRequired,
};
AdminOfficesComponent.defaultProps = {
  offices: [],
  rezervs: [],
  guncelle: () => {},
};

export default AdminOfficesComponent;
