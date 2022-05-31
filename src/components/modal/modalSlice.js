import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authStatus: "idle",
    auth: true,
    showModal: false,
}

const modalSlice = createSlice({
    name: 'authModal',
    initialState,
    reducers: {
        authToogle: state => {state.auth = !state.auth},
        authError: state => {state.authStatus = "error"},
        modalToogle: state => {state.showModal = !state.showModal}
    }
});

const {actions, reducer} = modalSlice;

export default reducer;
export const { authToogle, authError, modalToogle } = actions;