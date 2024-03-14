import { configureStore } from "@reduxjs/toolkit";
import vendorReducer from './vendorServices/vendorSlice'

const store = configureStore({
  reducer: {
    vendor: vendorReducer,
  },

});

export default store;