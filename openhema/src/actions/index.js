import { createAction } from "@reduxjs/toolkit";

export const fetchPools = (request) => (dispatch) => {
    dispatch(poolsFetching());
    request("http://localhost:3001/pools")
        .then(data => dispatch(poolsFetched(data)))
        .catch(() => dispatch(poolsFetchingError()))
}

export const poolsFetching = createAction('POOLS_FETCHING');
export const poolsFetched = createAction('POOLS_FETCHED');
export const poolsFetchingError = createAction('POOLS_FETCHING_ERROR');

export const fetchFighters = (request) => (dispatch) => {
    dispatch(fightersFetching());
    request("http://localhost:3001/fighters")
        .then(data => dispatch(fightersFetched(data)))
        .catch(() => dispatch(fightersFetchingError()))
}

export const fightersFetching = createAction('FIGHTER_FETCHING');
export const fightersFetched = createAction('FIGHTER_FETCHED');
export const fightersFetchingError = createAction('FIGHTER_FETCHING_ERROR');

export const fetchEleminations = (request) => (dispatch) => {
    dispatch(eleminationsFetching());
    request("http://localhost:3001/eleminations")
        .then(data => dispatch(eleminationsFetched(data)))
        .catch(() => dispatch(eleminationsFetchingError()))
}

export const eleminationsFetching = createAction('ELEMINATIONS_FETCHING');
export const eleminationsFetched = createAction('ELEMINATIONS_FETCHED');
export const eleminationsFetchingError = createAction('ELEMINATIONS_FETCHING_ERROR');

export const fetchNominations = (request) => (dispatch) => {
    dispatch(nominationsFetching());
    request("http://localhost:3001/nominations")
        .then(data => dispatch(nominationsFetched(data)))
        .catch(() => dispatch(nominationsFetchingError()))
}

export const nominationChanges = createAction('NOMINATIONS_CHANGES');
export const nominationsFetching = createAction('NOMINATIONS_FETCHING');
export const nominationsFetched = createAction('NOMINATIONS_FETCHED');
export const nominationsFetchingError = createAction('NOMINATIONS_FETCHING_ERROR');

export const modalToogle = createAction('MODAL_TOOGLE');

export const authToogle = createAction('AUTHORISATION_TOGGLE');
export const authError = createAction('AUTHORISATION_ERROR');