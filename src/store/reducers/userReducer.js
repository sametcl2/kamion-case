import * as actionTypes from "../actions/constants";

const defaultState = {
  error: null,
  loading: false,
  userData: null,
};

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_USER_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.SAVE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        userData: action.payload,
      };
    case actionTypes.SAVE_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: "Login Failed",
      };
    default:
      return state;
  }
};

export default userReducer;
