import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    scoreboardLoadingStatus: 'loading',
    scoreboards: [
        {
            id: 0,
            fightId: 0,
            fightInfo: {},
            timer: 0,
            timerWorks: false
        },
        {
            id: 1,
            fightId: 0,
            fightInfo: {},
            timer: 0,
            timerWorks: false
        },
        {
            id: 2,
            fightId: 0,
            fightInfo: {},
            timer: 0,
            timerWorks: false
        },
        {
            id: 3,
            fightId: 0,
            fightInfo: {},
            timer: 0,
            timerWorks: false
        }
    ],
    activeScoreboard: 0,
};

const scoreboardsSlice = createSlice({
    name: 'scoreboards',
    initialState,
    reducers:{
        scoreboardsFetching: state => {state.scoreboardLoadingStatus = 'loading'},
        scoreboardsFetched: (state, action) => {
            state.scoreboardLoadingStatus = 'idle';
            state.scoreboards = action.payload;
        },
        scoreboardsFetchingError: state => {state.scoreboardLoadingStatus = 'error'},
        scoreboardChanges: (state,action) => {state.activeScoreboard = action.payload},
        scoreboardFightChanges: (state, action) => {state.scoreboards[action.payload.id].fightId = action.payload.data},
        scoreboardTimerChanges: (state, action) => {state.scoreboards[action.payload.id].timer = action.payload.data},
        scoreboardTimerToogle: (state, action) => {state.scoreboards[action.payload.id].timerWorks = !state.scoreboards[action.payload.id].timerWorks},
    }
});

const {actions, reducer} = scoreboardsSlice;

export default reducer;

export const {
    scoreboardsFetching,
    scoreboardsFetched,
    scoreboardsFetchingError,
    scoreboardChanges,
    scoreboardFightChanges,
    scoreboardTimerChanges,
    scoreboardTimerToogle,
} = actions;