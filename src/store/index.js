import { configureStore } from '@reduxjs/toolkit';

import fighters from '../components/pools/fightersSlice'
import eliminations from '../components/elimination/elininationsSlice'
import scoreboards from '../components/scoreboard/scoreboard/scoreboardsSlice'
import authModal from '../components/modal/modalSlice';
import scoreboardsControl from '../components/scoreboardControl/scoreboardControlSlice';
import pools from "../components/pools/poolsSlice";
import nominations from "../components/tabs/nominationsSlice";


const store = configureStore({
    reducer: {pools, fighters, eliminations, nominations, authModal, scoreboards, scoreboardsControl},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;