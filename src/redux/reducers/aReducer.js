import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

const aReducer = (state = initialState.asgy, action) => {
  switch (action.type) {
    case actionTypes.ADMIN_LOGİN:
      return (state = true);
    case actionTypes.ADMIN_LOGOUT:
      return (state = false);
    default:
      return state;
  }
};
export default aReducer;
