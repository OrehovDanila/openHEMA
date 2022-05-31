import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    nominationsLoadingStatus: "idle",
    nominations: [],
    activeNomination: ''
};

const nominationsSlice = createSlice({
    name: 'nominations',
    initialState,
    reducers: {
        nominationsFetching: state => {state.nominationsLoadingStatus = 'loading'},
        nominationsFetched: (state, action) => {
            state.nominationsLoadingStatus = 'idle';
            state.nominations = action.payload;
        },
        nominationsFetchingError: state => {state.nominationsLoadingStatus = 'error'},
        nominationChanges: (state,action) => {state.activeNomination = action.payload}
    }
})

const {actions, reducer} = nominationsSlice;

export default reducer;

export const { nominationsFetching, nominationsFetched, nominationsFetchingError, nominationChanges } = actions;