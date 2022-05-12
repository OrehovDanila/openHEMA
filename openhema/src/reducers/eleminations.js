import { createReducer } from "@reduxjs/toolkit";

import { eleminationsFetching, eleminationsFetched, eleminationsFetchingError} from "../actions";

const initialState = {
    eleminationsLoadingStatus: "loading",
    eleminations: [{
        eleminationType: '',
        nomination: ''
    }]
};

const eleminations = createReducer(initialState, {
    [eleminationsFetching]: state => {state.eleminationsLoadingStatus = 'loading'},
    [eleminationsFetched]: (state, action) => {
        state.eleminationsLoadingStatus = 'idle';
        state.eleminations = action.payload;
    },
    [eleminationsFetchingError]: state => {state.eleminationsLoadingStatus = 'error'},
});

export default eleminations;