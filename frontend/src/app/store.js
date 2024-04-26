import { configureStore } from "@reduxjs/toolkit";
import movieListReducer from "../features/movieList";
import movieDetailReducer from "../features/movieDetail";
import userLoginReducer from "../features/users/userLogin";
import userRegisterReducer from "../features/users/userRegister";

export const store = configureStore({
  reducer: {
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,

    movieList: movieListReducer,
    movieDetail: movieDetailReducer,
  },
});
