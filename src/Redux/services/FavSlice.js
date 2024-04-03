import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favList: [],
};

const favSlice = createSlice({
  name: "fav",
  initialState,
  reducers: {
    getFavList(state, action) {
      const { username } = action.payload;
      const favList = localStorage.getItem(`${username}-Favlist`)
        ? JSON.parse(localStorage.getItem(`${username}-Favlist`))
        : [];
      state.favList = favList;
    },
    removefav(state, action) {
      const { id, username } = action.payload;
      let list = state.favList;
      list.splice(list.indexOf(id), 1);
      localStorage.setItem(`${username}-Favlist`, JSON.stringify(list));
      state.favList = list;
    },
    addtofav(state, action) {
      const { id, username } = action.payload;
      let list = state.favList.concat(id);
      localStorage.setItem(`${username}-Favlist`, JSON.stringify(list));
      state.favList = list;
    },
    deleteAll(state, action) {
      const { username } = action.payload;
      localStorage.setItem(`${username}-Favlist`, JSON.stringify([]));
      state.favList = [];
    },
  },
});

export const { getFavList, removefav, addtofav, deleteAll } = favSlice.actions;
export default favSlice.reducer;
