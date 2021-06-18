import React from "react";

import Reserv from "../../components/reserv/Reserv";
import Cars from "../../components/cars/Cars";
import Navigation from "../../parts/navi/Navi";
import Footer from "../../parts/footer/Footer";
import HeroImage from "../../parts/heroImage/HeroImage";

function Home() {
  return (
    <div>
      <Navigation />
      <HeroImage />
      <Reserv />
      <Cars />
      <Footer />
    </div>
  );
}

export default Home;
