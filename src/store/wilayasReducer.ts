import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";
import { api } from "~/utils/api";

// Type for our state
export interface WilayaState {
  id: number;
  name: string;
  nickname: string;
  about: string;
  description: string;
  weather: string;
  tranportation: string;
  regionId: number;
  sites: any[];
}

const initialState: WilayaState[] = [];

const wilayasSlice = createSlice({
  name: "wilayas",
  initialState: initialState,
  reducers: {
    updateWilaya(state, action) {
      const changedWilaya = action.payload;
      return state.map((wilaya) =>
        wilaya.id !== changedWilaya.id ? wilaya : changedWilaya
      );
    },
    setWilayas(state, action) {
      return action.payload;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.wilayas,
      };
    },
  },
});

export const { updateWilaya, setWilayas } = wilayasSlice.actions;

export const selectWilayasState = (state: AppState) => state.wilayas;

export const getRegionWilayas = (regionId: number) => {
  return (dispatch: any) => {
    const { data } = api.wilayas.getAll.useQuery(
      { id: regionId },
      {
        enabled: true,
      }
    );
    const regionsWilayasData = data;
    dispatch(setWilayas(regionsWilayasData));
  };
};

export const modifyWilaya = (changedRegion: WilayaState) => {
  return async (dispatch: any) => {
    /*const newAnecdote = await 
    anecdoteService.updateOld(
      changedAnecdote.id,
      changedAnecdote
    );
    */
    console.log("not implemented yet");
  };
};

export default wilayasSlice.reducer;
