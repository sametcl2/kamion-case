import { combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import driversReducer from "./reducers/driversReducer";

const rootReducers = combineReducers({
  user: userReducer,
  drivers: driversReducer,
});

export default rootReducers;
