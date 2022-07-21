import {all, takeLatest} from "redux-saga/effects";
import {combineReducers} from "redux";

import * as auth from "../app/modules/Auth/_redux/authRedux";
import {customersSlice} from "../app/modules/ECommerce/_redux/customers/customersSlice";
import {productsSlice} from "../app/modules/ECommerce/_redux/products/productsSlice";
import {remarksSlice} from "../app/modules/ECommerce/_redux/remarks/remarksSlice";
import {specificationsSlice} from "../app/modules/ECommerce/_redux/specifications/specificationsSlice";
import * as app from "./appRedux";
import * as subscription from "./subscriptionRedux";
import * as calculation from "./calculationRedux";
import * as resetPassword from "./resetPasswordRedux";

export const rootReducer = combineReducers({
  app: app.reducer,
  subscription: subscription.reducer,
  resetPassword: resetPassword.reducer,
  calculation: calculation.reducer,
  auth: auth.reducer,
  customers: customersSlice.reducer,
  products: productsSlice.reducer,
  remarks: remarksSlice.reducer,
  specifications: specificationsSlice.reducer
});

export function* rootSaga() {
  yield all([auth.saga(), app.saga(), subscription.saga(), calculation.saga(), resetPassword.saga()]);
}