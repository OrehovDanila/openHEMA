import { createReducer } from "@reduxjs/toolkit";

import { modalToogle } from "../actions";

const initialState = {
    showModal: false,
}

const modal = createReducer(initialState, {
    [modalToogle]: state => {state.showModal = !state.showModal}
});

export default modal;