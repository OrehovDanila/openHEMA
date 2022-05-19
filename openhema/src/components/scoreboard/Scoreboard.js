import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import classNames from 'classnames';
import { getDatabase, ref, onValue } from 'firebase/database'

import ServerTimer from "../timer/serverTimer";

import './scoreboard.scss'

import { authToogle, scoreboardsFetched, scoreboardChanges } from "../../actions";


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
            console.log('отписка табло')
            unsubScoreboards();
        }
        // eslint-disable-next-line
    }, []);

    if (scoreboardLoadingStatus === "loading") {
        return <h5 className="text-center mt-5">Загрузка групп</h5>
    } else if (scoreboardLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки групп</h5>
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

    console.log(scoreboards[activeScoreboard])

    const nextFighter1 = renderNextFighter(scoreboards[activeScoreboard].fightInfo.fighter1.nextName);
    const nextFighter2 = renderNextFighter(scoreboards[activeScoreboard].fightInfo.fighter2.nextName);
    

    const scoreboardClass = classNames('scoreboard__preview_big', {"scoreboard_reverced_big": scoreboardRevercedView === true});

    return(
        <div className="scoreboard_container">   
            <div className="scoreboard_header scoreboard_header_big">
                <ButtonGroup className="app__buttonGroup">
                    <NavLink type="button" className="btn btn-warning" to="/">Таблицы</NavLink>
                    <NavLink type="button" className="btn btn-warning" to="/scoreboard">Табло</NavLink>
                    <NavLink type="button" className="btn btn-warning" to="/scoreboard-control/pools">Управление таблом</NavLink>
                    <Button type="button" className="btn btn-warning">Админка</Button>
                    <Button type="button" className="btn btn-warning" onClick={() => dispatch(authToogle())}>Выход</Button>
                </ButtonGroup>

                <div className="control__button__group__scoreboardID">
                    <h5>Номер табло</h5>
                    <ButtonGroup className="me-2">
                        <Button onClick={() => dispatch(scoreboardChanges(0))} variant="success">1</Button>
                        <Button onClick={() => dispatch(scoreboardChanges(1))} variant="success">2</Button>
                        <Button onClick={() => dispatch(scoreboardChanges(2))} variant="success">3</Button> 
                        <Button onClick={() => dispatch(scoreboardChanges(3))} variant="success">4</Button>
                    </ButtonGroup>
                </div>
            </div>

            <div className={scoreboardClass}>
                <div className="scores1_big">
                    <h5>{scoreboards[activeScoreboard].fightInfo.fighter1.name}</h5>
                    <h6>{scoreboards[activeScoreboard].fightInfo.fighter1.club}</h6>
                    <p className="scoreboard__scores_big">{scoreboards[activeScoreboard].fightInfo.score1}</p>
                    <div>{nextFighter1}</div>
                </div>
                <div className="preview__center_big">
                    <div className="fight__round">1</div>
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