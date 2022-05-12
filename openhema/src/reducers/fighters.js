import { createReducer } from "@reduxjs/toolkit";

import { fightersFetching, fightersFetched, fightersFetchingError} from "../actions";

const initialState = {
    fighterLoadingStatus: "idle",
    fighters: []
};

const fighters = createReducer(initialState, {
    [fightersFetching]: state => {state.fighterLoadingStatus = 'loading'},
    [fightersFetched]: (state, action) => {
        state.fighterLoadingStatus = 'idle';
        state.fighters = action.payload;
    },
    [fightersFetchingError]: state => {state.fighterLoadingStatus = 'error'}
});

export default fighters;