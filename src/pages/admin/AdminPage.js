import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as carAction from "../../redux/actions/carAction";
import * as officeAction from "../../redux/actions/officeAction";
import * as allRezervAction from "../../redux/actions/allRezervAction";
import AdminHeaderComponent from "../../components/adminHeader/AdminHeaderComponent";

export class AdminRezervasyonComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: [],
      rezervs: [],
      offices: [],
      activeTab: "rezervs", //cars, offices ve rezervs olarak dönüyor
    };
  }
  async componentDidMount() {
    await this.props.actions.getCarsFromRedux();
    await this.props.actions.getOfficesFromRedux();
    await this.props.actions.getRezervsFromRedux();
    await this.setState({
      cars: this.props.allCars,
      offices: this.props.allOffices,
      rezervs: this.props.allRezervs,
    });
  }

  tabToggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  };
  guncelleFunc = async (x) => {
    if (x === true) {
      await this.props.actions.getCarsFromRedux();
      await this.props.actions.getOfficesFromRedux();
      await this.props.actions.getRezervsFromRedux();
      await this.setState({
        cars: this.props.allCars,
        offices: this.props.allOffices,
        rezervs: this.props.allRezervs,
      });
    }
  };
  render() {
    return (
      <div className="container">
        <AdminHeaderComponent
          activeTab={this.state.activeTab}
          tabToggleFunc={this.tabToggle}
          cars={this.state.cars}
          rezervs={this.state.rezervs}
          offices={this.state.offices}
          guncelle={this.guncelleFunc}
        />
      </div>
    );
  }
}

//okuma
function mapStateToProps(state) {
  return {
    allCars: state.carListReducer,
    allOffices: state.officeReducer,
    allRezervs: state.allRezervReducer,
  };
}
//yazma
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getCarsFromRedux: bindActionCreators(carAction.getCars, dispatch),
      getRezervsFromRedux: bindActionCreators(
        allRezervAction.getAllRezerv,
        dispatch
      ),
      getOfficesFromRedux: bindActionCreators(
        officeAction.getOffices,
        dispatch
      ),
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminRezervasyonComponent);
