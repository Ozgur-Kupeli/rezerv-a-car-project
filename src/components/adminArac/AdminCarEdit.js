import React, { Component } from "react";
import PropTypes from "prop-types";
import { Input, Row, Form, Col, Button } from "reactstrap";
import RTGAnimation from "../RTGAnimation";

export class AdminCarEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      number_of_people: "",
      number_of_suitcase: "",
      gear: "",
      fuel: "",
      age_limit: "",
      license_age: "",
      daily_price: "",
      image: "",
      selectedFile: null,
    };
  }
  componentDidMount() {
    this.props.arac.id &&
      this.setState({
        id: this.props.arac.id,
        name: this.props.arac.name,
        number_of_people: this.props.arac.number_of_people,
        number_of_suitcase: this.props.arac.number_of_suitcase,
        gear: this.props.arac.gear,
        fuel: this.props.arac.fuel,
        age_limit: this.props.arac.age_limit,
        license_age: this.props.arac.license_age,
        daily_price: this.props.arac.daily_price,
        image: this.props.arac.image,
      });
  }
  fileSelectedHandler = async (e) => {
    this.setState({ selectedFile: e.target.files[0] }); //yüklenen dosya state de tutulur
  };
  render() {
    return (
      <div>
        <Form>
          <Col
            xs={10}
            style={{
              margin: "0 auto",
              fontFamily: "Tahoma, sans-serif",
              fontSize: "12px",
              color: "#621E00",
            }}
          >
            <Row style={{ margin: "0 auto", padding: "8px 0" }}>
              <Col>
                <div style={{ display: this.props.arac.id ? "block" : "none" }}>
                  Fotoğraf seçilmezse eski fotoğrafı kullanır!
                </div>
                <Input
                  ref={(e) => (this.file = e)}
                  type="file"
                  onChange={this.fileSelectedHandler}
                ></Input>
              </Col>
            </Row>

            <Row style={{ margin: "0 auto", padding: "8px 0" }}>
              <Col>
                Araç Adı
                <Input
                  type="text"
                  value={this.state.name}
                  onChange={(event) =>
                    this.setState({ name: event.target.value })
                  }
                  required
                  style={{
                    fontSize: "14px",
                  }}
                ></Input>
              </Col>
            </Row>

            <Row style={{ margin: "0 auto", padding: "8px 0" }}>
              <Col>
                Vites Tipi
                <Input
                  type="text"
                  value={this.state.gear}
                  onChange={(event) =>
                    this.setState({ gear: event.target.value })
                  }
                  required
                  style={{
                    fontSize: "14px",
                  }}
                ></Input>
              </Col>
            </Row>
            <Row style={{ margin: "0 auto", padding: "8px 0" }}>
              <Col>
                Yakıt Türü
                <Input
                  type="text"
                  value={this.state.fuel}
                  onChange={(event) =>
                    this.setState({ fuel: event.target.value })
                  }
                  required
                  style={{
                    fontSize: "14px",
                  }}
                ></Input>
              </Col>
            </Row>

            <Row style={{ margin: "0 auto", padding: "8px 0" }}>
              <Col>
                Araç Kaç Kişilik?
                <Input
                  type="number"
                  value={this.state.number_of_people}
                  onChange={(event) =>
                    this.setState({
                      number_of_people: event.target.value,
                    })
                  }
                  required
                  style={{
                    fontSize: "14px",
                  }}
                ></Input>
              </Col>
              <Col>
                Araç Bavul Kapasitesi
                <Input
                  type="number"
                  value={this.state.number_of_suitcase}
                  onChange={(event) =>
                    this.setState({
                      number_of_suitcase: event.target.value,
                    })
                  }
                  required
                  style={{
                    fontSize: "14px",
                  }}
                ></Input>
              </Col>
            </Row>
            <Row style={{ margin: "0 auto", padding: "8px 0" }}>
              <Col>
                Müşteri Yaş Sınırı
                <Input
                  type="number"
                  value={this.state.age_limit}
                  onChange={(event) =>
                    this.setState({ age_limit: event.target.value })
                  }
                  required
                  style={{
                    fontSize: "14px",
                  }}
                ></Input>
              </Col>
              <Col>
                Müşteri Ehliyet Yaşı
                <Input
                  type="number"
                  value={this.state.license_age}
                  onChange={(event) =>
                    this.setState({ license_age: event.target.value })
                  }
                  required
                  style={{
                    fontSize: "14px",
                  }}
                ></Input>
              </Col>
            </Row>
            <Row style={{ margin: "0 auto", padding: "8px 0" }}>
              <Col>
                Günlük Kiralama Bedeli
                <Input
                  type="number"
                  value={this.state.daily_price}
                  onChange={(event) =>
                    this.setState({ daily_price: event.target.value })
                  }
                  required
                  style={{
                    fontSize: "14px",
                  }}
                ></Input>
              </Col>
              <Col></Col>
            </Row>
            <Row style={{ margin: "0 auto", padding: "8px 0" }}>
              <Col>
                <div
                  style={{
                    textAlign: "center",
                    position: "relative",
                  }}
                >
                  <Button
                    color="success"
                    onClick={
                      // this.updateFunc(e)
                      (e) => this.props.kaydetFunc(e, this.state)
                    }
                    style={{ width: "90%", margin: "8px auto" }}
                    disabled={
                      this.state.id
                        ? false
                        : this.state.name === "" ||
                          this.state.number_of_people === "" ||
                          this.state.number_of_suitcase === "" ||
                          this.state.gear === "" ||
                          this.state.fuel === "" ||
                          this.state.age_limit === "" ||
                          this.state.license_age === "" ||
                          this.state.daily_price === "" ||
                          this.state.selectedFile === null
                        ? true
                        : false
                    }
                  >
                    KAYDET
                  </Button>
                  <RTGAnimation
                    rtgOpen={this.props.rtgKaydet}
                    rtgMessage={
                      this.props.arac.id ? "Araç Güncellendi!" : "Araç Eklendi"
                    }
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
                    onClick={this.props.iptalFunc}
                    style={{ width: "90%", margin: "8px auto" }}
                  >
                    İPTAL
                  </Button>
                </div>
              </Col>
            </Row>
          </Col>
        </Form>
      </div>
    );
  }
}
AdminCarEdit.propTypes = {
  arac: PropTypes.object.isRequired,
  kaydetFunc: PropTypes.func.isRequired,
  iptalFunc: PropTypes.func.isRequired,
  rtgKaydet: PropTypes.bool.isRequired,
};
AdminCarEdit.defaultProps = {
  arac: {},
  kaydetFunc: () => {},
  rtgKaydet: false,
  iptalFunc: () => {},
};
export default AdminCarEdit;
