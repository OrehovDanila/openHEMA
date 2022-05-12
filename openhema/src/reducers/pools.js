import { createReducer } from "@reduxjs/toolkit";

import { poolsFetching, poolsFetched, poolsFetchingError} from "../actions";

const initialState = {
    poolsLoadingStatus: "idle",
    pools: [],
};

const pools = createReducer(initialState, {
    [poolsFetching]: state => {state.poolsLoadingStatus = 'loading'},
    [poolsFetched]: (state, action) => {
        state.poolsLoadingStatus = 'idle';
        state.pools = action.payload;
    },
    [poolsFetchingError]: state => {state.poolsLoadingStatus = 'error'},
});

export default pools;