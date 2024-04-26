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

export const registerUser = createAsyncThunk(
  "registerUser",
  async ({ name, email, password }, { dispatch }) => {
    try {
      dispatch(userRegisterRequest());

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `http://127.0.0.1:8000/api/users/register/`,
        { name, email, password },
        config
      );

      dispatch(userRegisterSuccess(data));
    } catch (error) {
      dispatch(
        userRegisterFail(
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        )
      );
    }
  }
);

export const userRegisterSlice = createSlice({
  name: "registerUser",
  initialState,
  reducers: {
    userRegisterRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    userRegisterSuccess: (state, action) => {
      localStorage.setItem("userInfo", JSON.stringify(action.payload));

      state.loading = false;
      state.userInfo = action.payload;
      state.error = null;
    },
    userRegisterFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { userRegisterRequest, userRegisterSuccess, userRegisterFail } =
  userRegisterSlice.actions;

export default userRegisterSlice.reducer;
