import { createAction } from "@reduxjs/toolkit";

export const poolsFetching = createAction('POOLS_FETCHING');
export const poolsFetched = createAction('POOLS_FETCHED');
export const poolsFetchingError = createAction('POOLS_FETCHING_ERROR');


export const poolsFightScore1Changes = createAction('POOLS_FIGHT_SCORE1_CHANGES');
export const poolsFightScore2Changes = createAction('POOLS_FIGHT_SCORE2_CHANGES');
export const poolsFightStatusChanges = createAction('POOLS_FIGHT_STATUS_CHANGES');

export const fightersFetching = createAction('FIGHTER_FETCHING');
export const fightersFetched = createAction('FIGHTER_FETCHED');
export const fightersFetchingError = createAction('FIGHTER_FETCHING_ERROR');


export const eleminationsFetching = createAction('ELEMINATIONS_FETCHING');
export const eleminationsFetched = createAction('ELEMINATIONS_FETCHED');
export const eleminationsFetchingError = createAction('ELEMINATIONS_FETCHING_ERROR');

export const eleminationsFightScore1Changes = createAction('ELEMINATIONS_FIGHT_SCORE1_CHANGES');
export const eleminationsFightScore2Changes = createAction('ELEMINATIONS_FIGHT_SCORE2_CHANGES');
export const eleminationsFightStatusChanges = createAction('ELEMINATIONS_FIGHT_STATUS_CHANGES');


export const nominationChanges = createAction('NOMINATIONS_CHANGES');
export const nominationsFetching = createAction('NOMINATIONS_FETCHING');
export const nominationsFetched = createAction('NOMINATIONS_FETCHED');
export const nominationsFetchingError = createAction('NOMINATIONS_FETCHING_ERROR');

export const modalToogle = createAction('MODAL_TOOGLE');

export const authToogle = createAction('AUTHORISATION_TOGGLE');
export const authError = createAction('AUTHORISATION_ERROR');

export const scoreboardsFetching = createAction('SCOREBOARDS_FETCHING');
export const scoreboardsFetched = createAction('SCOREBOARDS_FETCHED');
export const scoreboardsFetchingError = createAction('SCOREBOARDS_FETCHING_ERROR');


export const scoreboardChanges = createAction('SCOREBOARD_CHANGES');
export const scoreboardFightChanges = createAction('SCOREBOARD_FIGHT_CHANGES');
export const scoreboardActivePoolChanges = createAction('SCOREBOARD_ACTIVE_POOL_CHANGES');
export const scoreboardActiveFightChanges = createAction('SCOREBOARD_ACTIVE_FIGHT_CHANGES');
export const scoreboardLocalTimerUpdate = createAction('SCOREBOARD_LOCAL_TIMER_UPDATE');
export const scoreboardArrayChanges = createAction('SCOREBOARD_ARRAY_CHANGES');

export const scoreboardLocalTimerStart = (createAction('SCOREBOARD_LOCAL_TIMER_START'));
export const scoreboardLocalTimerStop = createAction('SCOREBOARD_LOCAL_TIMER_STOP');
export const scoreboardLocalTimerIdSet = createAction('SCOREBOARD_LOCAL_TIMER_ID_SET');

export const scoreboardTimerChanges = createAction('SCOREBOARD_TIMER_CHANGES');
export const scoreboardTimerToogle = createAction('SCOREBOARD_TIMER_TOOGLE');
export const scoreboardLastGatheringToogle = createAction('SCOREBOARD_LAST_GATHERING_TOOGLE');
export const scoreboardRevercerdViewToogle = createAction('SCOREBOARD_REVERCED_VIEW_TOOGLE');
