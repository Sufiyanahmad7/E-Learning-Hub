import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { cartCounterReducer, cartReducer } from "./reducer/cartReducer";

import { userLoginReducer, userRegisterReducer } from "./reducer/userReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userCartCounter: cartCounterReducer,
  // cart: cartReducer,
});
 // user name 
const userInfoFromStorage = localStorage.getItem("userInfo")         
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

  // user role -> admin , instructor , student
const userRoleFromStorage = localStorage.getItem("userRole")
  ? JSON.parse(localStorage.getItem("userRole"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  userLoginRole: { userRole: userRoleFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
