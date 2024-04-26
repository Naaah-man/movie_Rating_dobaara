import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  movies: [],
  error: null,
};

export const fetchMovies = createAsyncThunk(
  "movieList/fetchMovies",
  async (_, { dispatch }) => {
    try {
      dispatch(movieListRequest());

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/movies/`,
        config
      );
      console.log(data);
      dispatch(movieListSuccess(data));
    } catch (error) {
      dispatch(movieListFail(error.message));
    }
  }
);

const moviesSlice = createSlice({
  name: "moviesList",
  initialState,
  reducers: {
    movieListRequest(state) {
      return {
        loading: true,
      };
    },
    movieListSuccess(state, action) {
      return {
        loading: false,
        movies: action.payload,
      };
    },
    movieListFail(state, action) {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});

export const { movieListRequest, movieListSuccess, movieListFail } =
  moviesSlice.actions;

export default moviesSlice.reducer;
