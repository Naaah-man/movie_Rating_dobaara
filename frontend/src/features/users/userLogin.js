import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

function getLocalStorage() {
  const data = JSON.parse(localStorage.getItem("userInfo"));
  return data ? data : [];
}

const initialState = {
  loading: false,
  userInfo: getLocalStorage(),
  error: null,
};

export const loginUser = createAsyncThunk(
  "SendLoginUser",
  async ({ username, password }, { dispatch }) => {
    dispatch(userLoginRequest());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `http://127.0.0.1:8000/api/users/login/`,
      { username, password },
      config
    );

    localStorage.setItem("userInfo", JSON.stringify(data));
    dispatch(userLoginSuccess(data));
  }
);

export const userLoginSlice = createSlice({
  name: "loginUser",
  initialState,
  reducers: {
    userLoginRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    userLoginSuccess: (state, action) => {
      localStorage.setItem("userInfo", JSON.stringify(action.payload));

      state.loading = false;
      state.userInfo = action.payload;
      state.error = null;
    },
    userLoginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    userLogout: (state, action) => {
      localStorage.removeItem("userInfo");

      state.loading = false;
      state.userInfo = [];
      state.error = null;
    },
  },
});

export const { userLoginRequest, userLoginSuccess, userLoginFail, userLogout } =
  userLoginSlice.actions;

export default userLoginSlice.reducer;
