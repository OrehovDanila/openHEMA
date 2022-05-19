import { configureStore } from '@reduxjs/toolkit';

import pools from '../reducers/pools';
import fighters from '../reducers/fighters';
import eleminations from '../reducers/eleminations';
import nominations from '../reducers/nominations';
import modal from '../reducers/modal';
import auth from '../reducers/auth';
import scoreboards from '../reducers/scoreboards';


const store = configureStore({
    reducer: {pools, fighters, eleminations, nominations, modal, auth, scoreboards},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;