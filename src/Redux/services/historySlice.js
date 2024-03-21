import { createSlice } from "@reduxjs/toolkit";
import { removeDuplicates } from "../../utils/constants";

const initialState = {
  historyList: [],
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    gethistoryList(state, action) {
      const { username } = action.payload;
      const historyList = localStorage.getItem(`${username}-historylist`)
        ? JSON.parse(localStorage.getItem(`${username}-historylist`))
        : [];
      state.historyList = historyList;
    },
    removehistory(state, action) {
      const { id, username } = action.payload;
      let list = state.historyList;
      list.splice(list.indexOf(id), 1);
      localStorage.setItem(`${username}-historylist`, JSON.stringify(list));
      state.historyList = list;
    },
    addtohistory(state, action) {
      const { id, username } = action.payload;
      const historyList = localStorage.getItem(`${username}-historylist`)
        ? JSON.parse(localStorage.getItem(`${username}-historylist`))
        : [];
      let list = removeDuplicates(historyList.concat(id));
      localStorage.setItem(`${username}-historylist`, JSON.stringify(list));
      state.historyList = list;
    },
  },
});

export const { gethistoryList, removehistory, addtohistory } =
  historySlice.actions;
export default historySlice.reducer;
