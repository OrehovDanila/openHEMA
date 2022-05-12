import { createReducer } from "@reduxjs/toolkit";

import { nominationsFetching, nominationsFetched, nominationsFetchingError, nominationChanges} from "../actions";

const initialState = {
    nominationsLoadingStatus: "idle",
    nominations: [],
    activeNomination: ''
};

const nominations = createReducer(initialState, {
    [nominationsFetching]: state => {state.nominationsLoadingStatus = 'loading'},
    [nominationsFetched]: (state, action) => {
        state.nominationsLoadingStatus = 'idle';
        state.nominations = action.payload;
    },
    [nominationsFetchingError]: state => {state.nominationsLoadingStatus = 'error'},
    [nominationChanges]: (state,action) => {state.activeNomination = action.payload}
});

export default nominations;