import { createReducer } from "@reduxjs/toolkit";
import { scoreboardsFetching,
         scoreboardsFetched,
         scoreboardsFetchingError,
         scoreboardChanges,
         scoreboardFightChanges,
         scoreboardTimerChanges,
         scoreboardTimerToogle,
         scoreboardActivePoolChanges,
         scoreboardLocalTimerUpdate,
         scoreboardLastGatheringToogle,
         scoreboardRevercerdViewToogle,
         scoreboardLocalTimerStart,
         scoreboardLocalTimerStop,
         scoreboardLocalTimerIdSet,
         scoreboardArrayChanges
          } from "../actions"

const initialState = {
    scoreboardLoadingStatus: 'loading',
    scoreboardActivePool: 0,
    scoreboardArray: 'pools',
    scoreboardLastGathering: false,
    scoreboardRevercedView: false,
    localTimer: 0,
    localTimerId: null,
    localTimerStatus: 'stop',
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

const scoreboards = createReducer(initialState,{
    [scoreboardsFetching]: state => {state.scoreboardLoadingStatus = 'loading'},
    [scoreboardsFetched]: (state, action) => {
        state.scoreboardLoadingStatus = 'idle';
        state.scoreboards = action.payload;
    },
    [scoreboardsFetchingError]: state => {state.scoreboardLoadingStatus = 'error'},
    [scoreboardChanges]: (state,action) => {state.activeScoreboard = action.payload},
    [scoreboardFightChanges]: (state, action) => {state.scoreboards[action.payload.id].fightId = action.payload.data},
    [scoreboardTimerChanges]: (state, action) => {state.scoreboards[action.payload.id].timer = action.payload.data},
    [scoreboardTimerToogle]: (state, action) => {state.scoreboards[action.payload.id].timerWorks = !state.scoreboards[action.payload.id].timerWorks},
    [scoreboardActivePoolChanges]: (state, action) => {state.scoreboardActivePool = action.payload},
    [scoreboardLocalTimerUpdate]: (state,action) => {state.localTimer = action.payload},
    [scoreboardLocalTimerStart]: state => {state.localTimerStatus = 'start'},
    [scoreboardLocalTimerStop]: state => {state.localTimerStatus = 'stop'},
    [scoreboardLastGatheringToogle]: state => {state.scoreboardLastGathering = !state.scoreboardLastGathering},
    [scoreboardRevercerdViewToogle]: state => {state.scoreboardRevercedView = !state.scoreboardRevercedView},
    [scoreboardLocalTimerIdSet]: (state, action) => {state.localTimerId = action.payload},
    [scoreboardArrayChanges]: (state, action) => {state.scoreboardArray = action.payload}
})

export default scoreboards;

