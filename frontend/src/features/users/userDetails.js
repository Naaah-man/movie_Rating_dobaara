import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { loading: false, userDetails: [], error: null };

export const fetchUserDetails = createAsyncThunk(
  "fetchUserDetails",
  async ({ id }, { dispatch, getState }) => {
    try {
      dispatch(userDetailRequest());

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `http://127.0.0.1:8000/api/users/profile/${id}`,
        config
      );

      dispatch(userDetailSuccess(data));
    } catch (error) {
      dispatch(
        userDetailFail(
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        )
      );
    }
  }
);

export const userDetailSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    userDetailRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    userDetailSuccess: (state, action) => {
      state.loading = false;
      state.userDetails = action.payload;
      state.error = null;
    },
    userDetailFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { userDetailRequest, userDetailSuccess, userDetailFail } =
  userDetailSlice.actions;

export default userDetailSlice.reducer;
