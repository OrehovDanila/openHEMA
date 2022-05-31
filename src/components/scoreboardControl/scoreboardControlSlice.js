import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    scoreboardActivePool: 0,
    scoreboardArray: 'pools',
    scoreboardLastGathering: false,
    scoreboardRevercedView: false,
    localTimer: 0,
    localTimerId: null,
    localTimerStatus: 'stop',
};

const scoredboardsControlSlice = createSlice({
    name: 'scoredboardsControl',
    initialState,
    reducers: {
        scoreboardActivePoolChanges: (state, action) => {state.scoreboardActivePool = action.payload},
        scoreboardLocalTimerUpdate: (state,action) => {state.localTimer = action.payload},
        scoreboardLocalTimerStart: state => {state.localTimerStatus = 'start'},
        scoreboardLocalTimerStop: state => {state.localTimerStatus = 'stop'},
        scoreboardLastGatheringToogle: state => {state.scoreboardLastGathering = !state.scoreboardLastGathering},
        scoreboardRevercerdViewToogle: state => {state.scoreboardRevercedView = !state.scoreboardRevercedView},
        scoreboardLocalTimerIdSet: (state, action) => {state.localTimerId = action.payload},
        scoreboardArrayChanges: (state, action) => {state.scoreboardArray = action.payload}
    }
});

const {actions, reducer} = scoredboardsControlSlice;

export default reducer;

export const {scoreboardActivePoolChanges,
            scoreboardLocalTimerUpdate,
            scoreboardLastGatheringToogle,
            scoreboardRevercerdViewToogle,
            scoreboardLocalTimerStart,
            scoreboardLocalTimerStop,
            scoreboardLocalTimerIdSet,
            scoreboardArrayChanges} = actions;