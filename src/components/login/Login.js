import React, { Component } from "react";
import {
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormText,
} from "reactstrap";
import axios from "axios";
import "./login.scss";
import { Link, withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as aAction from "../../redux/actions/aAction";
import { compose } from "redux";
import { Helmet } from "react-helmet";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loginhata: "",
      validate: {
        emailState: "",
      },
    };
  }

  validateEmail(e) {
    const emailRex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validate } = this.state;
    if (emailRex.test(e.target.value)) {
      validate.emailState = "has-success";
    } else {
      validate.emailState = "has-danger";
    }
    this.setState({ validate });
  }

  submitForm() {
    try {
      axios
        .post("http://localhost:3001/user/auth/user/login", {
          eposta: this.state.email,
          parola: this.state.password,
        })
        .then((res) => {
          if (res.status === 200 && res.data.userInfo.user_status === "user") {
            localStorage.setItem("user_token", res.data.jwtToken);

            this.setState({
              loginhata: "",
            });
            setTimeout(() => {
              this.props.history.push("/");
            }, 500);
          }
          if (res.status === 200 && res.data.userInfo.user_status === "admin") {
            localStorage.setItem("user_token", res.data.jwtToken);
            this.props.actions.tasgy();
            this.setState({
              loginhata: "",
            });
            setTimeout(() => {
              this.props.history.push("/admin");
            }, 500);
          }
          if (res.status === 201) {
            this.setState({
              loginhata: "Eposta yada parola hatalı!",
            });
          }
        });
    } catch (err) {
      console.error(err.message);
    }
  }
  render() {
    const { email, password } = this.state;
    return (
      <div className="container-flued">
        <Helmet>
          <title>Giriş Yap</title>
          <meta name="description" content="Giriş Yap" />
          <meta name="keywords" content="giriş yap" />
        </Helmet>
        <div className="adminUserLoginContainer container-flued">
          <img
            className="loginImageContainer"
            src="/loginImage.png"
            alt="loginImage"
          ></img>
          <div className="userLogin">
            <div className="userLoginContainer">
              <Form
                style={{ background: "#642978" }}
                className="userLoginForm"
                onSubmit={(e) => this.submitForm(e)}
              >
                <Col style={{ background: "transparent" }}>
                  <FormGroup style={{ background: "transparent" }}>
                    <Label
                      className="userLoginLabel"
                      style={{ background: "transparent", color: "#f7f7f7" }}
                    >
                      Kullanıcı Adı
                    </Label>
                    <Input
                      type="email"
                      name="email"
                      placeholder="myemail@email.com"
                      value={email}
                      valid={this.state.validate.emailState === "has-success"}
                      invalid={this.state.validate.emailState === "has-danger"}
                      onChange={(e) => {
                        this.validateEmail(e);
                        this.setState({
                          email: e.target.value,
                        });
                      }}
                    />
                    <FormText style={{ background: "transparent" }}>
                      Kullanıcı Adı, bir eposta olmalıdır.
                    </FormText>
                  </FormGroup>
                </Col>
                <Col style={{ background: "transparent" }}>
                  <FormGroup style={{ background: "transparent" }}>
                    <Label
                      for="examplePassword"
                      style={{ background: "transparent", color: "#f7f7f7" }}
                    >
                      Parola
                    </Label>
                    <Input
                      type="password"
                      name="password"
                      placeholder="********"
                      value={password}
                      onChange={(e) =>
                        this.setState({
                          password: e.target.value,
                        })
                      }
                    />
                  </FormGroup>
                </Col>
                <div
                  className="userLoginHataMesaji"
                  style={{ background: "transparent", paddingBottom: "16px" }}
                >
                  {this.state.loginhata}
                </div>

                <Button
                  style={{
                    color: "#f7f7f7",
                    background: "#23022e",
                    width: "50%",
                    margin: "0 25%",
                    border: "1px solid #f7f7f7",
                  }}
                  className="userLoginButton"
                  onClick={() => this.submitForm()}
                >
                  Giriş Yap
                </Button>
              </Form>
              <div
                style={{
                  textAlign: "center",
                  margin: "0 auto",
                  background: "transparent",
                  width: "100%",
                }}
              >
                <Link
                  to="/user/register"
                  style={{
                    background: "transparent",
                    color: "#f7f7f7",
                  }}
                >
                  KAYDOL
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      tasgy: bindActionCreators(aAction.tasgy, dispatch),
    },
  };
}
export default compose(withRouter, connect(null, mapDispatchToProps))(Login);
