import { useSelector } from "react-redux";
import classNames from 'classnames';

const ServerTimer = () => {

    const scoreboards = useSelector(state => state.scoreboards.scoreboards);
    const activeScoreboard = useSelector(state => state.scoreboards.activeScoreboard);

    const timer = scoreboards[activeScoreboard].timer;
    const scoreboardLastGathering = scoreboards[activeScoreboard].lastGathering

    let ms = timer % 1000;
    let s = Math.floor(timer / 1000) % 60;
    let min = Math.floor(timer /1000 / 60);

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
    

    const timerClass = classNames('serverTimer', {'timer_lastGathering': scoreboardLastGathering === true})
    

    return (
        <div className={timerClass}>{min}:{s}.{ms}</div>
    )

};

export default ServerTimer;