import { combineReducers } from "redux";
import carListReducer from "./carListReducer";
import displayReducer from "./displayReducer";
import rezervasyonReducer from "./rezervasyonReducer";
import aReducer from "./aReducer";
import officeReducer from "./officeReducer";
import allRezervReducer from "./allRezervReducer";

const rootReducer = combineReducers({
  carListReducer,
  displayReducer,
  rezervasyonReducer,
  aReducer,
  officeReducer,
  allRezervReducer,
});
export default rootReducer;
