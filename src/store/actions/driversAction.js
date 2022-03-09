import {
  FETCH_DRIVER_START,
  FETCH_DRIVER_ERROR,
  FETCH_DRIVER_SUCCESS,
  ADD_DRIVER_START,
  ADD_DRIVER_ERROR,
  ADD_DRIVER_SUCCESS,
} from "./constants.js";
import api from "../../utils/api";

const fetchDrivers = (token, number = 1) => {
  return (dispatch) => {
    dispatch({ type: FETCH_DRIVER_START });
    return (
      token &&
      api
        .get("/carrier", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => dispatch({ type: FETCH_DRIVER_SUCCESS, response }))
        .catch((error) => dispatch({ type: FETCH_DRIVER_ERROR, error }))
    );
  };
};

const fetchDriversWithPagination = (token, number = 1) => {
  return (dispatch) => {
    dispatch({ type: FETCH_DRIVER_START });
    return (
      token &&
      api
        .get(`/carrier?page=${number}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => dispatch({ type: FETCH_DRIVER_SUCCESS, response }))
        .catch((error) => dispatch({ type: FETCH_DRIVER_ERROR, error }))
    );
  };
};

const addDriver = (token, values) => {
  return (dispatch) => {
    dispatch({ type: ADD_DRIVER_START });
    return  token && api
      .post("/carrier", values, {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json"
        },
      })
      .then((response) => response.data)
      .then((json) => {
        dispatch({ type: ADD_DRIVER_SUCCESS, json });
      })
      .catch((error) => {
        dispatch({ type: ADD_DRIVER_ERROR, error });
      });
  };
};

const updateDriver = (values, id) => {
  return (dispatch) => {
    dispatch({ type: ADD_DRIVER_START });
    return api
      .post(`/carrier/${id}`, values)
    .then((json) => {
      dispatch({ type: ADD_DRIVER_SUCCESS, json });
    })
    .catch((error) => {
      dispatch({ type: ADD_DRIVER_ERROR, error });
    });
  };
};

export { fetchDrivers, addDriver, updateDriver, fetchDriversWithPagination };
