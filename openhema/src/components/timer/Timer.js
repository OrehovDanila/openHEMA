import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

import { getDatabase, ref, set } from 'firebase/database'

import { scoreboardLocalTimerUpdate , scoreboardLocalTimerStart, scoreboardLocalTimerStop, scoreboardTimerChanges , scoreboardLocalTimerIdSet,scoreboardTimerToogle } from "../../actions";

import './timer.scss';


const Timer = () => {

    const scoreboardLastGathering = useSelector(state => state.scoreboards.scoreboardLastGathering);
    const activeScoreboard = useSelector(state => state.scoreboards.activeScoreboard);
    const scoreboards = useSelector(state => state.scoreboards.scoreboards);
    const localTimer = useSelector(state => state.scoreboards.localTimer);
    const localTimerId = useSelector(state => state.scoreboards.localTimerId);

    const database = getDatabase();
    const dispatch = useDispatch();
    
    let timer = null;

    const setTimer = (time) => {

        set(ref(database, 'scoreboards/' + activeScoreboard + '/timer'), time)
        .then(dispatch(scoreboardLocalTimerUpdate(time)))
        .then(() => {
            const data = {
                id: activeScoreboard,
                data: time
            };
            dispatch(scoreboardTimerChanges(data));
        });

    };

    const start = () => {
        let deadline = Date.now() + localTimer;
        clearInterval(timer);

        timer = setInterval(() => {
            setTimer(deadline - Date.now());
        }, 1);
        dispatch(scoreboardLocalTimerIdSet(timer));
        dispatch(scoreboardLocalTimerStart());
    };

    const stop = () => {
        clearInterval(localTimerId);
        dispatch(scoreboardLocalTimerStop());
        dispatch(scoreboardLocalTimerUpdate(scoreboards[activeScoreboard].timer));
    };

    useEffect(() => {

        dispatch(scoreboardLocalTimerUpdate(scoreboards[activeScoreboard].timer));

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if(scoreboards[activeScoreboard].timerWorks){
            start();
        } else {
            stop();
        }
        // eslint-disable-next-line
    }, [scoreboards[activeScoreboard].timerWorks]);

    useEffect(() => {
        if(localTimer < 0) {
            stop();
            dispatch(scoreboardTimerToogle(scoreboards[activeScoreboard]));
            set(ref(database, 'scoreboards/' + activeScoreboard + '/timerWorks'), false);
            setTimer(0);
        }
     // eslint-disable-next-line
    },[scoreboards[activeScoreboard].timer, localTimer])

    let ms = localTimer % 1000;
    let s = Math.floor(localTimer / 1000) % 60;
    let min = Math.floor(localTimer /1000 / 60);

    if(min < 10){
        min =  '0' + +min;
    }

    if(s < 10){
        s =  '0' + +s;
    }

    if(ms < 100 && ms < 10){
        ms = '00' + +ms;
    } else if(ms < 100){
        ms = '0' + +ms;
    }
    

    const timerClass = classNames('timer', {'timer_lastGathering': scoreboardLastGathering === true})
    

    return (
        <div className={timerClass}>{min}:{s}.{ms}</div>
    )
};

export default Timer;