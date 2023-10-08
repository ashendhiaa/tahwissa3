import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";
import { api } from "~/utils/api";
import { RegionWithWilayas } from "~/types";

// Type for our state

const initialState: RegionWithWilayas[] = [];

const regionsSlice = createSlice({
  name: "regions",
  initialState: initialState,
  reducers: {
    updateRegion(state, action) {
      const changedRegion = action.payload;
      return state.map((region) =>
        region.id !== changedRegion.id ? region : changedRegion
      );
    },
    setRegions(state, action) {
      return action.payload;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.regions,
      };
    },
  },
});

export const { updateRegion, setRegions } = regionsSlice.actions;

export const selectRegionsState = (state: AppState) => state.regions;

export const getAllRegions = () => {
  return (dispatch: any, getState: () => AppState) => {
    const { regions } = getState();
    const { data } = api.regions.getAll.useQuery(void [], {
      enabled: !(regions.length > 0),
      trpc: {
        ssr: true,
      },
    });
    const regionsData = data;
    dispatch(setRegions(regionsData));
  };
};

export const setAllRegions = (regionsData: RegionWithWilayas[]) => {
  return (dispatch: any) => {
    dispatch(setRegions(regionsData));
  };
};

export const modifyRegion = (changedRegion: RegionWithWilayas) => {
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

export default regionsSlice.reducer;
