import React, { Component } from "react";
import AdminCars from "./AdminCars";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";
import AdminCarEditModal from "./AdminCarEditModal";
import axios from "axios";
import AdminCarsTabMenu from "./AdminCarsTabMenu";
import AdminCarAddModal from "./AdminCarAddModal";
import AdminCarDeleteModal from "./AdminCarDeleteModal";
import LoadingAnimation from "../LoadingAnimation";

export class AdminCarsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editCarModal: false,
      addCarModal: false,
      car: {},
      rtg: false,
      newCarImageNameFromPublicFolder: "",
      sort: "IsmeGore",
      deleteCar: {},
      deleteModal: false,
      rtgDelete: false,
    };
  }
  editModalOpen = async (id) => {
    const car = await this.props.cars.filter((i) => i.id === id)[0];
    await this.setState({ car: car, editCarModal: true });
  };
  imageSavingPublicFolder = async () => {
    if (this.state.car.selectedFile === null) {
      this.setState({
        newCarImageNameFromPublicFolder: this.state.car.image,
      });
    } else {
      const fd = await new FormData();
      await fd.append("file", this.state.car.selectedFile);
      await axios
        .post("http://localhost:3001/api/v2/post/img", fd)
        .then((res) =>
          this.setState({ newCarImageNameFromPublicFolder: res.data.image })
        );
    }
  };
  updateImage = async () => {
    axios
      .put(`http://localhost:3001/cars/update/id/withimage`, {
        newImage: this.state.newCarImageNameFromPublicFolder,
        id: this.state.car.id,
        oldImage: this.state.car.image,
        name: this.state.car.name,
        number_of_people: this.state.car.number_of_people,
        number_of_suitcase: this.state.car.number_of_suitcase,
        gear: this.state.car.gear,
        fuel: this.state.car.fuel,
        age_limit: this.state.car.age_limit,
        license_age: this.state.car.license_age,
        daily_price: this.state.car.daily_price,
      })
      .catch((err) => console.log(err));
    this.setState({
      rtg: true,
    });
  };
  createCar = async () => {
    axios
      .post(`http://localhost:3001/cars/post`, {
        name: this.state.car.name,
        number_of_people: this.state.car.number_of_people,
        number_of_suitcase: this.state.car.number_of_suitcase,
        gear: this.state.car.gear,
        fuel: this.state.car.fuel,
        age_limit: this.state.car.age_limit,
        license_age: this.state.car.license_age,
        daily_price: this.state.car.daily_price,
        image: this.state.newCarImageNameFromPublicFolder,
      })
      .catch((err) => console.log(err));
    this.setState({
      rtg: true,
    });
  };

  dbGuncelle = async (e, car) => {
    e.preventDefault();
    //db yaz
    await this.setState({
      car: car,
    });
    await this.imageSavingPublicFolder();
    await this.updateImage();
    await setTimeout(() => {
      this.props.guncelle(true);
      this.setState({
        rtg: false,
      });
      setTimeout(() => {
        this.setState({
          editCarModal: false,
        });
      }, 500);
    }, 1500);
  };
  dbEkle = async (e, car) => {
    e.preventDefault();
    //db yaz
    await this.setState({
      car: car,
    });
    console.log(this.state);
    await this.imageSavingPublicFolder();
    await this.createCar();
    await setTimeout(() => {
      this.props.guncelle(true);
      this.setState({
        rtg: false,
      });
      setTimeout(() => {
        this.setState({
          addCarModal: false,
        });
      }, 500);
    }, 1500);
  };
  async carHardDelete(x, id, image) {
    await x.forEach((item) =>
      axios
        .delete(`http://localhost:3001/api/v2/delete/rezervasyon/${item}`)
        .catch((err) => console.log("Rezervasyon silerken hata : " + err))
    );
    await axios
      .delete(`http://localhost:3001/cars/delete/id/${id}`, {
        data: { image: image },
      })
      .catch((err) => console.log("Araçları silerken hata : " + err));
    this.setState({
      rtgDelete: true,
    });
  }
  sil = async () => {
    const rezervDizi = await this.props.rezervs.filter(
      (i) => i.car_id === this.state.deleteCar.id
    );
    if (rezervDizi.length > 0) {
      let x = [];
      for (let i = 0; i < rezervDizi.length; i++) {
        x.push(parseInt(rezervDizi[i].rezerv_id));
      }
      this.carHardDelete(
        x,
        this.state.deleteCar.id,
        this.state.deleteCar.image
      );
    } else {
      axios
        .delete(
          `http://localhost:3001/cars/delete/id/${this.state.deleteCar.id}`,
          {
            data: { image: this.state.deleteCar.image },
          }
        )
        .catch((err) => console.log("Araçları silerken hata : " + err));
      this.setState({
        rtgDelete: true,
      });
    }
  };
  dbSil = async () => {
    await this.sil();
    await setTimeout(() => {
      this.props.guncelle(true);
      setTimeout(() => {
        this.setState({
          deleteModal: false,
          rtgDelete: false,
        });
      }, 500);
    }, 1000);
  };

  modalClose = () => {
    this.setState({
      editCarModal: false,
      addCarModal: false,
      deleteModal: false,
    });
  };
  sortedCars = (x, arr) => {
    switch (x) {
      case (x = "FiyatArtan"):
        return arr.sort((a, b) =>
          parseInt(a.daily_price) > parseInt(b.daily_price) ? 1 : -1
        );

      case (x = "FiyatAzalan"):
        return arr.sort((a, b) =>
          parseInt(a.daily_price) > parseInt(b.daily_price) ? -1 : 1
        );

      default:
        //IsmeGore
        return arr.sort((a, b) => (a.name > b.name ? 1 : -1));
    }
  };
  sortFunc = async (e) => {
    await this.setState({
      sort: e.target.value,
    });
  };
  addCarModalOpen = () => {
    this.setState({
      addCarModal: true,
    });
  };
  deleteCarModal = (id) => {
    this.setState({
      deleteCar: {
        id: id,
        name: this.props.cars.filter((i) => i.id === id)[0].name,
        image: this.props.cars.filter((i) => i.id === id)[0].image,
      },
      deleteModal: true,
    });
  };
  render() {
    return (
      <div>
        <AdminCarsTabMenu
          carsSort={this.state.sort}
          carsSortFunc={this.sortFunc}
          addModalOpenFunc={this.addCarModalOpen}
        />
        {this.props.cars.length === 0 ? (
          <>
            <LoadingAnimation animationKey={true} />
            <div>Araç bulunamadı!</div>
          </>
        ) : (
          <Row
            style={{
              background: "transparent",
              padding: "0",
              margin: "0 auto",
            }}
          >
            {this.sortedCars(this.state.sort, this.props.cars).map((c) => (
              <Col xs={11} md={9} lg={6} key={c.id}>
                <AdminCars
                  car={c}
                  editModal={this.editModalOpen}
                  deleteCar={this.deleteCarModal}
                />
              </Col>
            ))}
          </Row>
        )}

        <AdminCarEditModal
          car={this.state.car}
          modal={this.state.editCarModal}
          kaydet={this.dbGuncelle}
          iptal={this.modalClose}
          rtg={this.state.rtg}
        />
        <AdminCarAddModal
          modal={this.state.addCarModal}
          iptal={this.modalClose}
          rtg={this.state.rtg}
          kaydet={this.dbEkle}
        />
        <AdminCarDeleteModal
          car={this.state.deleteCar}
          modal={this.state.deleteModal}
          modalCloseFunc={this.modalClose}
          kaydet={this.dbSil}
          rtg={this.state.rtgDelete}
        />
      </div>
    );
  }
}
AdminCarsComponent.propTypes = {
  cars: PropTypes.array.isRequired,
  rezervs: PropTypes.array.isRequired,
  guncelle: PropTypes.func.isRequired,
};
AdminCarsComponent.defaultProps = {
  cars: [],
  rezervs: [],
  guncelle: () => {},
};
export default AdminCarsComponent;
