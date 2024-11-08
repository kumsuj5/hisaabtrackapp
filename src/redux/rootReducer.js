import { combineReducers } from "redux";
import authReducer from "./reducer/authReducer";
import businessReducer from "./reducer/businessReducer";



const rootReducer = combineReducers({
    auth: authReducer,
    business:businessReducer
})

export default rootReducer