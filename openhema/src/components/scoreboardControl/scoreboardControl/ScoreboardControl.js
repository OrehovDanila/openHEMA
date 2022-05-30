import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from 'react';
import { getDatabase, ref, onValue, set } from 'firebase/database'
import classNames from 'classnames';

import { fightersFetched } from "../../../actions";

import './scoreboardControl.scss';

import ScoreboardScoresControl from "../scoreboardScoresControl/ScoreboardScoresControl";
import ScoreboardTimeControl from "../scoreboardTimeControl/ScoreboardTimeControl";
import ScoreboardPreview from "../scoreboardPreview/ScoreboardPreview";


const ScoreboardControl = () => {

    const scoreboardLoadingStatus = useSelector(state => state.scoreboards.scoreboardLoadingStatus);
    const scoreboards = useSelector(state => state.scoreboards.scoreboards);
    const activeScoreboard = useSelector(state => state.scoreboards.activeScoreboard);
    const scoreboardRevercedView = useSelector(state => state.scoreboards.scoreboardRevercedView);

    const activeArray = useSelector(state => state.scoreboards.scoreboardActivePool);
    const scoreboardArray = useSelector(state => state.scoreboards.scoreboardArray);
    const poolsLoadingStatus = useSelector(state => state.pools.poolsLoadingStatus);

    const fightersLoadingStatus = useSelector(state => state.fighters.fightersLoadingStatus);

    const pools = useSelector(state => state.pools.pools);

    const eleminations = useSelector(state => state.eleminations.eleminations);
    const eleminationsLoadingStatus = useSelector(state => state.eleminations.eleminationsLoadingStatus);

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
            console.log('отписка бойцов')
            unsubFighters();
        }
        // eslint-disable-next-line
    }, []);
    
    const filtredElemination = useMemo(() => {
        const filtredElemination = eleminations.slice();
        return filtredElemination.filter(item => item.nomination === activeNomination);
    },[eleminations, activeNomination]);

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
    if (eleminationsLoadingStatus === "loading") {
        return <h5 className="text-center mt-5">Загрузка групп</h5>
    } else if (eleminationsLoadingStatus === "error") {
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
        const eleminationId = eleminations.findIndex(item => item.nomination === activeNomination);

        const round = filtredElemination[0].rounds.find(item => item.RoundId === activeArray);
        const roundsIndex = filtredElemination[0].rounds.indexOf(round);

        let fighterRef;
        if(scoreboardArray === 'pools'){
            fighterRef = ref(database, 'pools/' + activeArray + '/fights/' + fightPos + scoreRef)
        }else if(scoreboardArray === 'elemination'){
            fighterRef = ref(database, 'eleminations/'+ eleminationId + '/rounds/' + roundsIndex + '/fights/' + fightPos + scoreRef)
        }


        set(fighterRef, newscore);
    } 
    
    let activeArrayValue = pools.find((item) => item.poolId === activeArray);
    if(!activeArrayValue){
        activeArrayValue = filtredElemination[0].rounds.find((item) => item.RoundId === activeArray);
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