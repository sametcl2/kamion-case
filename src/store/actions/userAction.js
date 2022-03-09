import {
  SAVE_USER_START,
  SAVE_USER_SUCCESS,
  SAVE_USER_ERROR,
} from "./constants.js";
import api from "../../utils/api";

const saveUser = (payload) => {
  return (dispatch) => {
    dispatch({ type: SAVE_USER_START });
    return api
      .post("/login", payload)
      .then((response) => response.data)
      .then((json) => {
        dispatch({ type: SAVE_USER_SUCCESS, json });
        localStorage.setItem("token", json.data.token);
      })
      .catch((error) => {
        dispatch({ type: SAVE_USER_ERROR, error });
      });
  };
};

export default saveUser;
