import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    poolsLoadingStatus: "idle",
    pools: [{
        poolId: 0,
        fights: []
    }],
};

const poolsSlice = createSlice({
    name: 'pools',
    initialState,
    reducers:{
        poolsFetching: state => {state.poolsLoadingStatus = 'loading'},
        poolsFetched: (state, action) => {
            state.poolsLoadingStatus = 'idle';
            state.pools = action.payload;
        },
        poolsFetchingError: state => {state.poolsLoadingStatus = 'error'},
    }
});

const {actions, reducer} = poolsSlice;

export default reducer;

export const { poolsFetching, poolsFetched, poolsFetchingError } = actions;