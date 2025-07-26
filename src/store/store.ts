import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import regionsReducer from "./regionsReducer";
import wilayasReducer from "./wilayasReducer";
import { createWrapper } from "next-redux-wrapper";

const store = () =>
  configureStore({
    reducer: {
      regions: regionsReducer,
      wilayas: wilayasReducer,
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof store>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(store);
