import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { loading: false, movie: [], error: null };

export const fetchMovieDetail = createAsyncThunk(
  "movieDetail",
  async (id, { dispatch }) => {
    try {
      dispatch(movieDetailRequest());

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/movies/${id}/`,
        config
      );

      dispatch(movieDetailSuccess(data));
    } catch (error) {
      dispatch(movieDetailFail(error.message));
    }
  }
);

export const movieDetailSlice = createSlice({
  name: "movieDetailSlice",
  initialState,
  reducers: {
    movieDetailRequest: () => {
      return {
        loading: true,
      };
    },
    movieDetailSuccess: (state, action) => {
      return {
        loading: false,
        movie: action.payload,
      };
    },
    movieDetailFail: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});

export const { movieDetailRequest, movieDetailSuccess, movieDetailFail } =
  movieDetailSlice.actions;

export default movieDetailSlice.reducer;
