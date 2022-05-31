import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    eliminationsLoadingStatus: "loading",
    eliminations: [{
        eliminationType: '',
        nomination: '',
        rounds: [{
            roundId: 0,
            fights: []
        }]
        
    }]
};

const eliminationsSlice = createSlice({
    name: 'eliminations',
    initialState,
    reducers: {
        eliminationsFetching: state => {state.eliminationsLoadingStatus = 'loading'},
        eliminationsFetched: (state, action) => {
            state.eliminationsLoadingStatus = 'idle';
            state.eliminations = action.payload;
        },
        eliminationsFetchingError: state => {state.eliminationsLoadingStatus = 'error'},
    }
});

const {actions, reducer} = eliminationsSlice;

export default reducer;

export const { eliminationsFetching, eliminationsFetched, eliminationsFetchingError } = actions;