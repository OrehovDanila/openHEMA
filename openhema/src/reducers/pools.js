import { createReducer } from "@reduxjs/toolkit";

import { poolsFetching, poolsFetched, poolsFetchingError, poolsFightScore1Changes, poolsFightScore2Changes } from "../actions";

const initialState = {
    poolsLoadingStatus: "idle",
    pools: [{
        poolId: 0,
        fights: []
    }],
};

const pools = createReducer(initialState, {
    [poolsFetching]: state => {state.poolsLoadingStatus = 'loading'},
    [poolsFetched]: (state, action) => {
        state.poolsLoadingStatus = 'idle';
        state.pools = action.payload;
    },
    [poolsFetchingError]: state => {state.poolsLoadingStatus = 'error'},
    [poolsFightScore1Changes]: (state, action) => {state.pools[action.payload.poolId].fights[action.payload.fightId].score1 = action.payload.data},
    [poolsFightScore2Changes]: (state, action) => {state.pools[action.payload.poolId].fights[action.payload.fightId].score2 = action.payload.data}
});

export default pools;