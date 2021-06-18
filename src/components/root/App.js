import React, { useState, useEffect, Suspense } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import { Helmet } from "react-helmet";
import ScrollToTop from "./ScrollToTop";
import Home from "../../pages/home/Home";
import LoadingAnimation from "../LoadingAnimation";

const NotFound = React.lazy(() => import("../../pages/notFound/NotFound"));
const Rezervasyon = React.lazy(() => import("../rezervasyon/Rezervasyon"));
const RezervasyonSorgula = React.lazy(() =>
  import("../../pages/rezervasyonSorgula/RezervasyonSorgula")
);
const LoginPage = React.lazy(() =>
  import("../../pages/loginRegisterPage/LoginPage")
);
const Admin = React.lazy(() => import("../../pages/admin/AdminPage"));
const UserRegisterPage = React.lazy(() =>
  import("../../pages/loginRegisterPage/RegisterPage")
);

const App = () => {
  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:3001/user/auth/user/verify", {
        method: "POST",
        headers: { token: localStorage.user_token },
      });

      const parseRes = await res.json();
      if (parseRes === true) {
        setAuth(true);
      } else {
        if (localStorage.user_token) {
          localStorage.removeItem("user_token");
          window.location.reload(true);
        }
        setAuth(false);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  const [auth, setAuth] = useState(
    localStorage.token ? checkAuthenticated() : false
  );
  useEffect(() => {
    checkAuthenticated();
  });

  return (
    <Router>
      <Suspense fallback={<LoadingAnimation animationKey={true} />}>
        <div className="App">
          <ScrollToTop />
          <Helmet>
            <title>Anka Rent A Car</title>
            <meta
              name="description"
              content="Araç kiralamanın en kolay yolu, rezervasyon yap ve sonra al"
            />
            <meta
              name="keywords"
              content="Araç kiralama, Araç, Araç rezervasyon, araba kirala, araba, araba rezervasyon, rezervasyon, rent, rent a car, anka, anka rent a car, rent-a-car"
            />
          </Helmet>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/araclar" exact component={Home} />
            <Route path="/login" exact component={LoginPage} />
            <Route
              path="/rezervasyon/sorgu"
              exact
              component={RezervasyonSorgula}
            />
            <Route path="/rezervasyon" exact component={Rezervasyon} />
            <Route path="/user/register" exact component={UserRegisterPage} />

            <PrivateRoute exact path="/admin" component={Admin} auth={auth} />

            <Route component={NotFound} />
          </Switch>
        </div>
      </Suspense>
    </Router>
  );
};

const PrivateRoute = ({ auth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        auth ? <Component {...props} /> : <Redirect to={{ pathname: "/" }} />
      }
    />
  );
};

export default App;
