import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import Settings from "./Settings";
import ErrorUI from "./ErrorUI";
import AuthReducer from "../../components/AppModule/Authentication/AuthReducer";


const reducers = combineReducers({
  routing: routerReducer,
  settings: Settings,
  auth: AuthReducer,
  errorUI: ErrorUI
});

export default reducers;
