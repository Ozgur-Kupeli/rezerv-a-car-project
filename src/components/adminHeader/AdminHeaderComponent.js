import React, { Component } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import "../../assets/admin.scss";
import AdminInfo from "../naviUserInfo/UserInfoComponent";
import jwt_decode from "jwt-decode";
import UserExitModal from "../naviUserExitModal/UserExitModal";
import AdminRezervasyonComponent from "../adminRezervasyon/AdminRezervasyonComponent";
import PropTypes from "prop-types";
import LoadingAnimation from "../LoadingAnimation";
import AdminRezervasyonFilter from "../adminRezervasyon/AdminRezervasyonFilter";
import AdminCarsComponent from "../adminArac/AdminCarsComponent";
import AdminOfficesComponent from "../adminOfis/AdminOfficesComponent";

export class AdminHeaderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userVerifyed: true,
      userName: localStorage.user_token ? this.userNameDecodeToken().name : "",
      modalOpen: false,
      rezervsSort: "VER",
      rezervsFilter: "AKTİF",
    };
  }

  userNameDecodeToken = () => {
    const decoded = jwt_decode(localStorage.user_token);
    return { name: decoded.user.name, user_status: decoded.user.user_status };
  };
  cikisHandler = () => {
    this.setState({
      modalOpen: true,
    });
  };
  cikisYap = async () => {
    await localStorage.removeItem("user_token");

    window.location.reload(true);
  };
  cikisIptal = () => {
    this.setState({
      modalOpen: false,
    });
  };
  render() {
    return (
      <>
        <AdminInfo
          userVerifyed={this.state.userVerifyed}
          name={this.state.userName}
          quit={this.cikisHandler}
        />
        <Nav tabs id="adminNavBar">
          <NavItem className="adminNavBarItem">
            <NavLink
              className={classnames({
                active: this.props.activeTab === "rezervs",
              })}
              onClick={() => {
                this.props.tabToggleFunc("rezervs");
              }}
            >
              REZERVASYONLAR
            </NavLink>
          </NavItem>
          <NavItem className="adminNavBarItem">
            <NavLink
              className={classnames({
                active: this.props.activeTab === "cars",
              })}
              onClick={() => {
                this.props.tabToggleFunc("cars");
              }}
            >
              ARAÇLAR
            </NavLink>
          </NavItem>
          <NavItem className="adminNavBarItem">
            <NavLink
              className={classnames({
                active: this.props.activeTab === "offices",
              })}
              onClick={() => {
                this.props.tabToggleFunc("offices");
              }}
            >
              OFİSLER
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent
          activeTab={this.props.activeTab}
          className="container tabContent"
        >
          <TabPane tabId="rezervs" className="tabContent">
            <AdminRezervasyonFilter
              rezervsSort={this.state.rezervsSort}
              rezervsFilter={this.state.rezervsFilter}
              rezervsSortFunc={(event) =>
                this.setState({
                  rezervsSort: event.target.value,
                })
              }
              rezervsFilterFunc={(event) =>
                this.setState({
                  rezervsFilter: event.target.value,
                })
              }
            />
            {this.props.cars.length === 0 ||
            this.props.rezervs.length === 0 ||
            this.props.offices.length === 0 ? (
              <>
                <LoadingAnimation animationKey={true} />
                <div>Rezervasyon bulunamadı!</div>
              </>
            ) : (
              <AdminRezervasyonComponent
                cars={this.props.cars}
                offices={this.props.offices}
                rezervs={this.props.rezervs}
                rezervsSort={this.state.rezervsSort}
                rezervsFilter={this.state.rezervsFilter}
                guncelle={this.props.guncelle}
              />
            )}
          </TabPane>
          <TabPane tabId="cars" className="tabContent">
            <AdminCarsComponent
              cars={this.props.cars}
              guncelle={this.props.guncelle}
              rezervs={this.props.rezervs}
            />
          </TabPane>
          <TabPane tabId="offices" className="tabContent">
            <AdminOfficesComponent
              offices={this.props.offices}
              guncelle={this.props.guncelle}
              rezervs={this.props.rezervs}
            />
          </TabPane>
        </TabContent>
        <UserExitModal
          isOpen={this.state.modalOpen}
          exitFunc={this.cikisYap}
          cancelFunc={this.cikisIptal}
        />
      </>
    );
  }
}
AdminHeaderComponent.propTypes = {
  offices: PropTypes.array.isRequired,
  cars: PropTypes.array.isRequired,
  rezervs: PropTypes.array.isRequired,
  activeTab: PropTypes.string.isRequired,
  tabToggleFunc: PropTypes.func.isRequired,
  guncelle: PropTypes.func.isRequired,
};
AdminHeaderComponent.defaultProps = {
  offices: [],
  cars: [],
  rezervs: [],
  activeTab: "",
  tabToggleFunc: () => {},
  guncelle: () => {},
};
export default AdminHeaderComponent;
