import { createSlice } from "@reduxjs/toolkit";

const logged = localStorage.getItem("loggedvendor")
  ? JSON.parse(localStorage.getItem("loggedvendor"))
  : {
      isLogged: false,
    };

const initialState = {
  isLogged: true,
  ...logged,
};

const vendorSlice = createSlice({
  name: "vendor",
  initialState,
  reducers: {
    vendorlogin(state, action) {
      const data = action.payload;
      localStorage.setItem(
        "loggedvendor",
        JSON.stringify(data)
      );
      state.username = data.username;
      state.email = data.email;
      state.token = data.token;
      state.is_vendor = data.is_vendor;
      state.isLogged = true;
    },
    vendorlogout(state) {
      localStorage.removeItem("loggedvendor");
      state.username = "nouser";
      state.email = "nouser@mail.com";
      state.isLogged = false;
    },
    getvendor(state) {
      const logged = localStorage.getItem("loggedvendor")
        ? JSON.parse(localStorage.getItem("loggedvendor"))
        : {
            usernameame: "nouser",
            email: "nouser@mail.com",
            token: '',
            isLogged: false,
          };
      state.vendorName = logged.username;
      state.email = logged.email;
      state.isLogged = logged.isLogged ? logged.isLogged : true;
    },
  },
});

export const { vendorlogin, vendorlogout,getvendor } = vendorSlice.actions;
export default vendorSlice.reducer;
