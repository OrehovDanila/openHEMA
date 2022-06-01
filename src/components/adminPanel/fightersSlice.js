import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fighterLoadingStatus: "idle",
    fighters: []
};

const fightersSlice = createSlice({
    name: 'fighters',
    initialState,
    reducers: {
        fightersFetching: state => {state.fighterLoadingStatus = 'loading'},
        fightersFetched: (state, action) => {
            state.fighterLoadingStatus = 'idle';
            state.fighters = action.payload;
        },
        fightersFetchingError: state => {state.fighterLoadingStatus = 'error'}
    }
});

const {actions, reducer} = fightersSlice;

export default reducer;

export const { fightersFetching, fightersFetched, fightersFetchingError } = actions;