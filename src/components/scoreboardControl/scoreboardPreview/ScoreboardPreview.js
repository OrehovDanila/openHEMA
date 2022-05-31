import { useSelector } from "react-redux";
import { getDatabase, ref, set } from 'firebase/database'
import { useEffect } from "react";
import classNames from 'classnames';

import { useTransformData } from "../../../hooks/transformData.hook";

import Timer from "../../timer/Timer";

import "./scoreboardPreview.scss"

//Смарт-компонент для работы с данными табло, так же рендерить маленькое табло для секретаря

const ScoreboardPreview = ({activeArrayValue}) => {

    const database = getDatabase();

    const scoreboards = useSelector(state => state.scoreboards.scoreboards);
    const activeScoreboard = useSelector(state => state.scoreboards.activeScoreboard);
    const scoreboardRevercedView = useSelector(state => state.scoreboardsControl.scoreboardRevercedView);

    const fighters = useSelector(state => state.fighters.fighters)

    const activeFightId = scoreboards[activeScoreboard].fightId;

    const { transformScoreboardData } = useTransformData();


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

    const FightInfo = transformScoreboardData(activeArrayValue, fighters, activeFightId);

    useEffect(() => {
        //Отправляем на сервер значение табло при изменениях
        set(ref(database, 'scoreboards/' + activeScoreboard + '/fightInfo'), FightInfo);
        // eslint-disable-next-line
    },[FightInfo, activeScoreboard])

    const nextFighter1 = renderNextFighter(FightInfo.fighter1.nextName);
    const nextFighter2 = renderNextFighter(FightInfo.fighter2.nextName);


    const scoreboardClass = classNames('scoreboard__preview', {"scoreboard_reverced": scoreboardRevercedView === true});


    return(
        <div className={scoreboardClass}>
            <div className="scores1">
                <h5>{FightInfo.fighter1.name}</h5>
                <h6>{FightInfo.fighter1.club}</h6>
                <p className="scoreboard__scores">{FightInfo.score1}</p>
                <div>{nextFighter1}</div>
            </div>
            <div className="preview__center">
                <div className="fight__round">1</div>
                <Timer />
            </div>
            <div className="scores2">
                <h5>{FightInfo.fighter2.name}</h5>
                <h6>{FightInfo.fighter2.club}</h6>
                <p className="scoreboard__scores">{FightInfo.score2}</p>
                <div>{nextFighter2}</div>
            </div>
        </div>
    )
}

export default ScoreboardPreview;