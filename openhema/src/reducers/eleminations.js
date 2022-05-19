import { createReducer } from "@reduxjs/toolkit";

import { eleminationsFetching, eleminationsFetched, eleminationsFetchingError, eleminationsFightScore1Changes, eleminationsFightScore2Changes } from "../actions";

const initialState = {
    eleminationsLoadingStatus: "loading",
    eleminations: [{
        eleminationType: '',
        nomination: '',
        rounds: [{
            roundId: 0,
            fights: []
        }]
        
    }]
};

const eleminations = createReducer(initialState, {
    [eleminationsFetching]: state => {state.eleminationsLoadingStatus = 'loading'},
    [eleminationsFetched]: (state, action) => {
        state.eleminationsLoadingStatus = 'idle';
        state.eleminations = action.payload;
    },
    [eleminationsFetchingError]: state => {state.eleminationsLoadingStatus = 'error'},
    [eleminationsFightScore1Changes]: (state, action) => {state.pools[action.payload.poolId].fights[action.payload.fightId].score1 = action.payload.data},
    [eleminationsFightScore2Changes]: (state, action) => {state.pools[action.payload.poolId].fights[action.payload.fightId].score2 = action.payload.data}
});

export default eleminations;