import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";
import { api } from "~/utils/api";

// Type for our state
export interface RegionState {
  id: number;
  name: string;
  about: string;
  description: string;
  wilayas: any[];
}

const initialState: RegionState[] = [];

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
    });
    const regionsData = data;
    dispatch(setRegions(regionsData));
  };
};

export const modifyRegion = (changedRegion: RegionState) => {
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
