import { createSlice } from "@reduxjs/toolkit";

export const configurationSlice = createSlice({
  name: "setUp",
  initialState: {
    initConnectedUser: {},
    initDocuments: {},
    initContracts: {},
    initSigners: {},
    initUsers: {},
    initAnnotation: {},
  },
  reducers: {
    initConnectedUser: (state, action) => {
      state.initConnectedUser = {
        connectedUserData: action.payload,
      };
    },
    getDocuments: (state, action) => {
      state.initDocuments = {
        documentsData: action.payload,
      };
    },
    getContracts: (state, action) => {
      state.initContracts = {
        contractsData: action.payload,
      };
    },
    getSigners: (state, action) => {
      state.initSigners = {
        signersData: action.payload,
      };
    },
    getUsers: (state, action) => {
      state.initUsers = {
        usersData: action.payload,
      };
    },
    getAnnotation: (state, action) => {
      state.initAnnotation = {
        annotation: action.payload,
      };
    },
  },
});
