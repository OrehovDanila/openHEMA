import { createReducer } from "@reduxjs/toolkit";

import { authToogle, authError } from "../actions";

const initialState = {
    authStatus: "idle",
    auth: true
}

const auth = createReducer(initialState, {
    [authToogle]: state => {state.auth = !state.auth},
    [authError]: state => {state.authStatus = "error"}
});

export default auth;