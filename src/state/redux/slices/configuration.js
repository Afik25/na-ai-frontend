import { createSlice } from "@reduxjs/toolkit";

export const configurationSlice = createSlice({
  name: "setUp",
  initialState: {
    initConnectedUser: {},
    initOriginsData: {},
  },
  reducers: {
    initConnectedUser: (state, action) => {
      state.initConnectedUser = {
        connectedUserData: action.payload,
      };
    },
    getOriginsData: (state, action) => {
      state.initOriginsData = {
        originsData: action.payload,
      };
    },
  },
});
