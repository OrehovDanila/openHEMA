import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    scoreboardActivePool: 0,
    scoreboardArray: 'pools',
    scoreboardLastGathering: false,
    scoreboardRevercedView: false,
    localTimer: 0,
    localTimerId: null,
    localTimerStatus: 'stop',
    poolsLoadingStatus: "idle",
    fighterLoadingStatus: "idle",
    fighters: [],
    pools: [{
        poolId: 0,
        fights: []
    }],
    eliminationsLoadingStatus: "loading",
    eliminations: [{
        eliminationType: '',
        nomination: '',
        rounds: [{
            roundId: 0,
            fights: []
        }]
        
    }],
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
        scoreboardArrayChanges: (state, action) => {state.scoreboardArray = action.payload},
        poolsFetching: state => {state.poolsLoadingStatus = 'loading'},
        poolsFetched: (state, action) => {
            state.poolsLoadingStatus = 'idle';
            state.pools = action.payload;
        },
        poolsFetchingError: state => {state.poolsLoadingStatus = 'error'},
        fightersFetching: state => {state.fighterLoadingStatus = 'loading'},
        fightersFetched: (state, action) => {
            state.fighterLoadingStatus = 'idle';
            state.fighters = action.payload;
        },
        fightersFetchingError: state => {state.fighterLoadingStatus = 'error'},
        eliminationsFetching: state => {state.eliminationsLoadingStatus = 'loading'},
        eliminationsFetched: (state, action) => {
            state.eliminationsLoadingStatus = 'idle';
            state.eliminations = action.payload;
        },
        eliminationsFetchingError: state => {state.eliminationsLoadingStatus = 'error'},
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
            scoreboardArrayChanges,
            poolsFetching,
            poolsFetched,
            poolsFetchingError, 
            eliminationsFetching, 
            eliminationsFetched,
            eliminationsFetchingError, 
            fightersFetching, 
            fightersFetched, 
            fightersFetchingError} = actions;