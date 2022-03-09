import * as actionTypes from "../actions/constants";

const defaultState = {
  error: null,
  loading: false,
  pagination: null,
  driversData: [
    {
      id: 1,
      first_name: "Samet",
      last_name: "Şahin",
      photo: "dsadsa",
      email: "samet@test.com",
    },
    {
      id: 2,
      first_name: "Test",
      last_name: "Testoglu",
      photo: "321321",
      email: "test@test.com",
    },
    {
      id: 3,
      first_name: "Test",
      last_name: "Testov",
      photo: "5ffwe",
      email: "testov@testov.com",
    },
    {
      id: 4,
      first_name: "Test",
      last_name: "Testovski",
      photo: "czxcxz",
      email: "testovski@test.com",
    },
  ],
};

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_DRIVER_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_DRIVER_SUCCESS:
      return {
        ...state,
        loading: false,
        driversData: defaultState.driversData,
        pagination: action.response.data.meta,
      };
    case actionTypes.FETCH_DRIVER_ERROR:
      return {
        ...state,
        loading: false,
        error: "Driver Fetch Failed",
      };
    case actionTypes.ADD_DRIVER_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.ADD_DRIVER_SUCCESS:
      return {
        ...state,
        loading: false,
        driversData: [...state.driversData, action.payload],
      };
    case actionTypes.ADD_DRIVER_ERROR:
      return {
        ...state,
        loading: false,
        error: "Driver Add Failed",
      };
    case actionTypes.UPDATE_DRIVER_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.UPDATE_DRIVER_SUCCESS:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.UPDATE_DRIVER_ERROR:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default userReducer;
