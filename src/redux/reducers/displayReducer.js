import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

const displayReducer = (state = initialState.dissplay, action) => {
  switch (action.type) {
    case actionTypes.TRUE_DİSPLAY:
      return (state = true);
    case actionTypes.FALSE_DİSPLAY:
      return (state = false);
    default:
      return state;
  }
};
export default displayReducer;
