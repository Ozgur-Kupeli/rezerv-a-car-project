import axios from "axios";

export function isTheCarAvailable(
  pickup_date_time,
  delivery_date_time,
  rezervedCars
) {
  //müsait araçları reducera gönder
  //initialState'teki güncel rezervasyonlarla arama yapılan rezervasyonun bilgilerini
  // karşılaştırıp uygun olmayan aracların id'lerini bir dizide topla
  let new_pickup_date_time = parseInt(pickup_date_time);
  let new_delivery_date_time = parseInt(delivery_date_time);
  //tüm rezervasyonlar=rezervedCars
  let carArray = []; //rezervasyona uygun olmayan araç id dizisi
  for (let i = 0; i < rezervedCars[0].length; i++) {
    let pickup_date_time = parseInt(rezervedCars[0][i].pickup_date_time);
    let delivery_date_time = parseInt(rezervedCars[0][i].delivery_date_time);
    if (pickup_date_time < new_pickup_date_time) {
      if (pickup_date_time === delivery_date_time) {
        //nothing
      }
      if (delivery_date_time < new_pickup_date_time) {
        //nothing
      }
      if (delivery_date_time === new_pickup_date_time) {
        carArray.push(rezervedCars[0][i].car_id);
      }
      if (
        delivery_date_time > new_pickup_date_time &&
        delivery_date_time < new_delivery_date_time
      ) {
        carArray.push(rezervedCars[0][i].car_id);
      }
      if (delivery_date_time === new_delivery_date_time) {
        carArray.push(rezervedCars[0][i].car_id);
      }
      if (delivery_date_time > new_delivery_date_time) {
        carArray.push(rezervedCars[0][i].car_id);
      }
    }
    if (pickup_date_time === new_pickup_date_time) {
      if (delivery_date_time === new_pickup_date_time) {
        carArray.push(rezervedCars[0][i].car_id);
      }
      if (delivery_date_time === new_delivery_date_time) {
        carArray.push(rezervedCars[0][i].car_id);
      }
      if (delivery_date_time > new_delivery_date_time) {
        carArray.push(rezervedCars[0][i].car_id);
      }
      if (delivery_date_time < new_delivery_date_time) {
        carArray.push(rezervedCars[0][i].car_id);
      }
    }
    if (
      pickup_date_time > new_pickup_date_time &&
      pickup_date_time < new_delivery_date_time
    ) {
      if (delivery_date_time < new_delivery_date_time) {
        carArray.push(rezervedCars[0][i].car_id);
      }
      if (delivery_date_time === new_delivery_date_time) {
        carArray.push(rezervedCars[0][i].car_id);
      }
      if (delivery_date_time > new_delivery_date_time) {
        carArray.push(rezervedCars[0][i].car_id);
      }
    }
    if (pickup_date_time === new_delivery_date_time) {
      if (delivery_date_time === new_delivery_date_time) {
        carArray.push(rezervedCars[0][i].car_id);
      }
      if (delivery_date_time > new_delivery_date_time) {
        carArray.push(rezervedCars[0][i].car_id);
      }
    }
    if (pickup_date_time > new_delivery_date_time) {
      //nothing
    }
  }
  //bu uygun olmayan araç id'lerini içermeyen araçları (müsait olanları) reducer'a gönder

  let cars = axios
    .get("http://localhost:3001/cars/get")
    .then((res) => res.data.filter((item) => !carArray.includes(item.id)))
    .catch((error) =>
      console.log("db'den müsait araçları çekerken hata : ", error)
    );
  return cars;
}
export function gunHesapla(
  pickup_date,
  delivery_date,
  pickup_time,
  delivery_time
) {
  //araç alış ve iade zamanları arasında geçen günü hesapla. üçretlendirme için
  let alısGun = Math.floor(Date.parse(pickup_date) / (1000 * 60 * 60 * 24));
  let iadeGun = Math.floor(Date.parse(delivery_date) / (1000 * 60 * 60 * 24));
  let alisSaati = parseInt(pickup_time.split(":")[0]);
  let iadeSaati = parseInt(delivery_time.split(":")[0]);
  let gun = iadeGun - alısGun;
  let saat = iadeSaati - alisSaati;
  if (gun === 1 && alisSaati === 23 && iadeSaati === 0) {
    return 1;
  } else if (gun >= 1 && saat === 0) {
    return gun;
  } else if (gun >= 1 && alisSaati !== 23 && iadeSaati !== 0 && saat !== 0) {
    return 1 + gun;
  } else if (gun === 0 && saat !== 0) {
    return 1;
  } else if (gun > 1 && alisSaati === 23 && iadeSaati === 0) {
    return 1 + gun;
  } else return 0;
}

export function timeRange(x, y, pickup_date, delivery_date) {
  //giriş saat kontrolü
  let pickup_hour = parseInt(x.split(":")[0]);
  let pickup_minute = parseInt(x.split(":")[1]);
  let delivery_hour = parseInt(y.split(":")[0]);
  let delivery_minute = parseInt(y.split(":")[1]);
  let delivery_days = Math.floor(
    Date.parse(delivery_date) / (1000 * 60 * 60 * 24)
  );
  let pickup_days = Math.floor(Date.parse(pickup_date) / (1000 * 60 * 60 * 24));

  if (pickup_date === delivery_date) {
    if (
      delivery_hour * 60 +
        delivery_minute -
        (pickup_hour * 60 + pickup_minute) <=
      59
    )
      return true;
    else return false;
  } else if (delivery_days - pickup_days === 1) {
    if (
      delivery_hour * 60 +
        delivery_minute -
        (pickup_hour * 60 + pickup_minute) <
      -23 * 60
    )
      return true;
    else return false;
  } else return false;
}
