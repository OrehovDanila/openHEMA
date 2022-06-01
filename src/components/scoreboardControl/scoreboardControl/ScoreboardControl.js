import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from 'react';
import { getDatabase, ref, onValue, set } from 'firebase/database'
import classNames from 'classnames';

import { fightersFetched } from "../scoreboardControlSlice";

import './scoreboardControl.scss';

import ScoreboardScoresControl from "../scoreboardScoresControl/ScoreboardScoresControl";
import ScoreboardTimeControl from "../scoreboardTimeControl/ScoreboardTimeControl";
import ScoreboardPreview from "../scoreboardPreview/ScoreboardPreview";


//Смарт-компонент для управлением табло. Результаты отправляет на сревер в реальном времени

const ScoreboardControl = () => {

    const scoreboardLoadingStatus = useSelector(state => state.scoreboards.scoreboardLoadingStatus);
    const scoreboards = useSelector(state => state.scoreboards.scoreboards);
    const activeScoreboard = useSelector(state => state.scoreboards.activeScoreboard);

    const scoreboardRevercedView = useSelector(state => state.scoreboardsControl.scoreboardRevercedView);
    const activeArray = useSelector(state => state.scoreboardsControl.scoreboardActivePool);
    const scoreboardArray = useSelector(state => state.scoreboardsControl.scoreboardArray);

    const poolsLoadingStatus = useSelector(state => state.scoreboardsControl.poolsLoadingStatus);
    const fightersLoadingStatus = useSelector(state => state.scoreboardsControl.fightersLoadingStatus);

    const pools = useSelector(state => state.scoreboardsControl.pools);

    const eliminations = useSelector(state => state.scoreboardsControl.eliminations);
    const eliminationsLoadingStatus = useSelector(state => state.scoreboardsControl.eliminationsLoadingStatus);

    const activeNomination = useSelector(state => state.nominations.activeNomination);

    const activeFightId = scoreboards[activeScoreboard].fightId;

    const dispatch = useDispatch();

    const database = getDatabase();

    const fightersRef = ref(database, 'fighters');

    useEffect(() => {

        // подписываемся на обновления Readltime database когда компонент отрендерился 

        const unsubFighters = onValue(fightersRef, (snapshot) => {
            const data = snapshot.val();
            dispatch(fightersFetched(data));
        })

        return function cleanup() {
            //Отписка по удалению компонента
            unsubFighters();
        }
        // eslint-disable-next-line
    }, []);
    
    const filtredElimination = useMemo(() => {
        const filtredElimination = eliminations.slice();
        return filtredElimination.filter(item => item.nomination === activeNomination);
    },[eliminations, activeNomination]);

    if (scoreboardLoadingStatus === "loading") {
        return <h5 className="text-center mt-5">Загрузка групп</h5>
    } else if (scoreboardLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки групп</h5>
    };
    if (fightersLoadingStatus === "loading") {
        return <h5 className="text-center mt-5">Загрузка бойцов</h5>
    } else if (fightersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки бойцов</h5>
    };
    if (eliminationsLoadingStatus === "loading") {
        return <h5 className="text-center mt-5">Загрузка групп</h5>
    } else if (eliminationsLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки групп</h5>
    }
    if (poolsLoadingStatus === "loading") {
        return <h5 className="text-center mt-5">Загрузка групп</h5>
    } else if (poolsLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки групп</h5>
    };

    const changeScore = (counter, position) => {

        const newscore = position === '1'? activeArrayValue.fights.find((item) => item.fightId === activeFightId).score1 + counter 
        : position === '2'? activeArrayValue.fights.find((item) => item.fightId === activeFightId).score2 + counter: null;

        const scoreRef = position === '1'? '/score1' : position === '2'? '/score2': null;

        const fightPos = activeArrayValue.fights.findIndex((item) => item.fightId === activeFightId)
        const eliminationId = eliminations.findIndex(item => item.nomination === activeNomination);

        const round = filtredElimination[0].rounds.find(item => item.RoundId === activeArray);
        const roundsIndex = filtredElimination[0].rounds.indexOf(round);

        let fighterRef;
        if(scoreboardArray === 'pools'){
            fighterRef = ref(database, 'pools/' + activeArray + '/fights/' + fightPos + scoreRef)
        }else if(scoreboardArray === 'elimination'){
            fighterRef = ref(database, 'eliminations/'+ eliminationId + '/rounds/' + roundsIndex + '/fights/' + fightPos + scoreRef)
        }


        set(fighterRef, newscore);
    } 

    //Дополнительный активный массив который может быть как группой так и раундом плейофф
    
    let activeArrayValue;
    if(scoreboardArray === 'pools'){
        activeArrayValue = pools.find((item) => item.poolId === activeArray);
    } else if(scoreboardArray === 'elimination'){
        activeArrayValue = filtredElimination[0].rounds.find((item) => item.RoundId === activeArray);
    }


    let activeFightStatus = ''; 

    if(activeArrayValue.fights.find((item) => item.fightId === activeFightId)){
        activeFightStatus = activeArrayValue.fights.find((item) => item.fightId === activeFightId).status;
    }


    const containerClass = classNames('control__container', {"scoreboard_reverced": scoreboardRevercedView === true});

    return(         
            <div className={containerClass}> 
                <ScoreboardScoresControl variant="danger" onChangeScore={changeScore} position={'1'}/>
                <div className="control__container__center">
                <div className="scoreboard__preview__info">
                    <span>Группа {activeArray +1}</span>&nbsp;
                    <span>Бой {activeFightId}</span>&nbsp;
                    <span>Статус {activeFightStatus}</span>
                </div>
                    <ScoreboardPreview activeArrayValue={activeArrayValue}/>
                    <ScoreboardTimeControl activeArrayValue={activeArrayValue}/>
                </div>
                <ScoreboardScoresControl variant="primary" onChangeScore={changeScore} position={'2'}/>
            </div>
    )
}

export default ScoreboardControl;