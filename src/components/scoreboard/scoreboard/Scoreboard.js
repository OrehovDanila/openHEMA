import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from 'classnames';
import { getDatabase, ref, onValue } from 'firebase/database'

import ServerTimer from "../../timer/serverTimer";

import './scoreboard.scss'

import { scoreboardsFetched } from "./scoreboardsSlice";

//Смарт-компонент табло, исключительно слушает события с сервера

const Scoreboard = () => {
    const dispatch = useDispatch();

    const scoreboards = useSelector(state => state.scoreboards.scoreboards);
    const activeScoreboard = useSelector(state => state.scoreboards.activeScoreboard);
    const scoreboardLoadingStatus = useSelector(state => state.scoreboards.scoreboardLoadingStatus);
    const scoreboardRevercedView = scoreboards[activeScoreboard].scoreboardReverse;

    const database = getDatabase();

    useEffect(() => {

        // подписываемся на обновления Readltime database когда компонент отрендерился 

        const unsubScoreboards = onValue(ref(database, 'scoreboards'), (snapshot) => {
            const data = snapshot.val();
            dispatch(scoreboardsFetched(data));
        });

        return function cleanup() {
            //Отписка по удалению компонента
            unsubScoreboards();
        }
        // eslint-disable-next-line
    }, []);

    //Заглушка при загрузке или ошибке

    if (scoreboardLoadingStatus === "loading") {
        return <h5 className="text-center mt-5">Загрузка табло</h5>
    } else if (scoreboardLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки табло</h5>
    };
    
    const renderNextFighter = (fighter) => {
        if(fighter){
            return(
                <>
                 <h6>Следующий боец</h6>
                <h6>{fighter}</h6>
                </>
            )
        }
    };

    const nextFighter1 = renderNextFighter(scoreboards[activeScoreboard].fightInfo.fighter1.nextName);
    const nextFighter2 = renderNextFighter(scoreboards[activeScoreboard].fightInfo.fighter2.nextName);
    

    const scoreboardClass = classNames('scoreboard__preview_big', {"scoreboard_reverced_big": scoreboardRevercedView === true});

    return(
        <div className="scoreboard_container">   
            <div className={scoreboardClass}>
                <div className="scores1_big">
                    <h5>{scoreboards[activeScoreboard].fightInfo.fighter1.name}</h5>
                    <h6>{scoreboards[activeScoreboard].fightInfo.fighter1.club}</h6>
                    <p className="scoreboard__scores_big">{scoreboards[activeScoreboard].fightInfo.score1}</p>
                    <div>{nextFighter1}</div>
                </div>
                <div className="preview__center_big">
                    <ServerTimer />
                </div>
                <div className="scores2_big">
                    <h5>{scoreboards[activeScoreboard].fightInfo.fighter2.name}</h5>
                    <h6>{scoreboards[activeScoreboard].fightInfo.fighter2.club}</h6>
                    <p className="scoreboard__scores_big">{scoreboards[activeScoreboard].fightInfo.score2}</p>
                    <div>{nextFighter2}</div>
                </div>
            </div>
        </div>

    )
}

export default Scoreboard;