import { Button, ButtonGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from 'react';
import { getDatabase, ref, onValue, set } from 'firebase/database'
import classNames from 'classnames';

import { useTransformData } from "../../../hooks/transformData.hook";
import Timer from "../../timer/Timer";

import { scoreboardTimerToogle,
         scoreboardTimerChanges,
         eleminationsFightScore1Changes,
         eleminationsFightScore2Changes,
         fightersFetched,
         scoreboardLocalTimerUpdate,
         scoreboardLastGatheringToogle,
         scoreboardRevercerdViewToogle} from "../../../actions";




const ScoreboardControlEleminations = () => {

    const scoreboardLoadingStatus = useSelector(state => state.scoreboards.scoreboardLoadingStatus);
    const scoreboards = useSelector(state => state.scoreboards.scoreboards);
    const activeScoreboard = useSelector(state => state.scoreboards.activeScoreboard);
    const localTimer = useSelector(state => state.scoreboards.localTimer);
    const scoreboardRevercedView = useSelector(state => state.scoreboards.scoreboardRevercedView);
    const scoreboardLastGathering = useSelector(state => state.scoreboards.scoreboardLastGathering);

    const activePool = useSelector(state => state.scoreboards.scoreboardActivePool);

    const fighters = useSelector(state => state.fighters.fighters)
    const fightersLoadingStatus = useSelector(state => state.fighters.fightersLoadingStatus);

    const eleminations = useSelector(state => state.eleminations.eleminations);
    const eleminationsLoadingStatus = useSelector(state => state.eleminations.eleminationsLoadingStatus);

    const activeNomination = useSelector(state => state.nominations.activeNomination);

    const activeFightId = scoreboards[activeScoreboard].fightId;

    const dispatch = useDispatch();

    const { transformScoreboardData } = useTransformData();

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


    const filtredScoreboard = useMemo(() => {
        const filtredScoreboard = scoreboards.slice();
        return filtredScoreboard.find(item => item.id === activeScoreboard);
    },[scoreboards, activeScoreboard]);    

    const filtredElemination = useMemo(() => {
        const filtredElemination = eleminations.slice();
        return filtredElemination.filter(item => item.nomination === activeNomination);
    },[eleminations, activeNomination]);

    if (scoreboardLoadingStatus === "loading") {
        return <h5 className="text-center mt-5">Загрузка групп</h5>
    } else if (scoreboardLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки групп</h5>
    }

    if (eleminationsLoadingStatus === "loading") {
        return <h5 className="text-center mt-5">Загрузка групп</h5>
    } else if (eleminationsLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки групп</h5>
    }
    if (fightersLoadingStatus === "loading") {
        return <h5 className="text-center mt-5">Загрузка бойцов</h5>
    } else if (fightersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки бойцов</h5>
    };

    const changeScore1 = (counter) => {

        const data = {
            poolId: activePool,
            fightId: activeFightId,
            data: activePoolValue.fights.find((item) => item.fightId === activeFightId).score1 + counter
        }

        const patchedFight = {
            fightId: activeFightId,
            status: activePoolValue.fights.find((item) => item.fightId === activeFightId).status,
            fighter1Id: activePoolValue.fights.find((item) => item.fightId === activeFightId).fighter1Id,
            fighter2Id: activePoolValue.fights.find((item) => item.fightId === activeFightId).fighter2Id,
            score1: activePoolValue.fights.find((item) => item.fightId === activeFightId).score1 + counter,
            score2: activePoolValue.fights.find((item) => item.fightId === activeFightId).score2
        }

        const fightPos = activePoolValue.fights.findIndex((item) => item.fightId === activeFightId);
        const eleminationId = eleminations.findIndex(item => item.nomination === activeNomination);

        set(ref(database, 'eleminations/'+ eleminationId + '/rounds/' + activePool + '/fights/' + fightPos), patchedFight)
            .then(console.log(`Отправка на сервер 'eleminations/${activePool}/fights/${activeFightId}`))
            .then(dispatch(eleminationsFightScore1Changes(data)));
    }

    const changeScore2 = (counter) => {

        const data = {
            poolId: activePool,
            fightId: activeFightId,
            data: activePoolValue.fights.find((item) => item.fightId === activeFightId).score2 + counter
        }

        const patchedFight = {
            fightId: activeFightId,
            status: activePoolValue.fights.find((item) => item.fightId === activeFightId).status,
            fighter1Id: activePoolValue.fights.find((item) => item.fightId === activeFightId).fighter1Id,
            fighter2Id: activePoolValue.fights.find((item) => item.fightId === activeFightId).fighter2Id,
            score1: activePoolValue.fights.find((item) => item.fightId === activeFightId).score1,
            score2: activePoolValue.fights.find((item) => item.fightId === activeFightId).score2 + counter
        }

        const fightPos = activePoolValue.fights.findIndex((item) => item.fightId === activeFightId)
        const eleminationId = eleminations.findIndex(item => item.nomination === activeNomination);

        set(ref(database, 'eleminations/'+ eleminationId + '/rounds/' + activePool + '/fights/' + fightPos), patchedFight)
            .then(console.log(`Отправка на сервер 'eleminations/${activePool}/fights/${activeFightId}`))
            .then(dispatch(eleminationsFightScore2Changes(data)));
    }
    
    const toogleTimer = () => {
        dispatch(scoreboardTimerToogle(filtredScoreboard));
        set(ref(database, 'scoreboards/' + activeScoreboard + '/timerWorks'), !scoreboards[activeScoreboard].timerWorks);
    }



    const activePoolValue = filtredElemination[0].rounds.find((item) => item.RoundId === activePool);

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

    let activeFightStatus = ''; 



    if(activePoolValue.fights.find((item) => item.fightId === activeFightId)){
        activeFightStatus = activePoolValue.fights.find((item) => item.fightId === activeFightId).status;
    }

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

    const onReset = () => {
        
        const data = {
            poolId: activePool,
            fightId: activeFightId,
            data: 0
        }

        const patchedFight = {
            fightId: activeFightId,
            status: "waiting",
            fighter1Id: activePoolValue.fights.find((item) => item.fightId === activeFightId).fighter1Id,
            fighter2Id: activePoolValue.fights.find((item) => item.fightId === activeFightId).fighter2Id,
            score1: 0,
            score2: 0
        }

        const fightPos = activePoolValue.fights.findIndex((item) => item.fightId === activeFightId);
        const eleminationId = eleminations.findIndex(item => item.nomination === activeNomination);

        setTimer(45000);

        set(ref(database, 'eleminations/'+ eleminationId + '/rounds/' + activePool + '/fights/' + fightPos), patchedFight)
            .then(dispatch(eleminationsFightScore1Changes(data)))
            .then(dispatch(eleminationsFightScore2Changes(data)));

    };

    const onSubmit = () => {


        const patchedFight = {
            fightId: activeFightId,
            fighter1Id: activePoolValue.fights.find((item) => item.fightId === activeFightId).fighter1Id,
            fighter2Id: activePoolValue.fights.find((item) => item.fightId === activeFightId).fighter2Id,
            score1: activePoolValue.fights.find((item) => item.fightId === activeFightId).score1,
            score2: activePoolValue.fights.find((item) => item.fightId === activeFightId).score2,
        }

        if(patchedFight.score1 === patchedFight.score2) {
            patchedFight.status = 'draw';
        } else if(patchedFight.score1 > patchedFight.score2) {
            patchedFight.status = 'winner1';
        } else if(patchedFight.score1 < patchedFight.score2) {
            patchedFight.status = 'winner2';
        };

        const fightPos = activePoolValue.fights.findIndex((item) => item.fightId === activeFightId);
        const eleminationId = eleminations.findIndex(item => item.nomination === activeNomination);

        set(ref(database, 'eleminations/'+ eleminationId + '/rounds/' + activePool + '/fights/' + fightPos), patchedFight)
    };

    const onLastGathering = () => {
        setTimer(30000);
        set(ref(database, 'scoreboards/' + activeScoreboard + '/lastGathering'), !scoreboardLastGathering)
            .then(dispatch(scoreboardLastGatheringToogle()));
    };

    const onScoreboardReversed = () => {
        set(ref(database, 'scoreboards/' + activeScoreboard + '/scoreboardReverse'), !scoreboardRevercedView)
            .then(dispatch(scoreboardRevercerdViewToogle()));        
    };

    const FightInfo = transformScoreboardData(activePoolValue, fighters, activeFightId);
    const nextFighter1 = renderNextFighter(FightInfo.fighter1.nextName);
    const nextFighter2 = renderNextFighter(FightInfo.fighter2.nextName);
    
    set(ref(database, 'scoreboards/' + activeScoreboard + '/fightInfo'), FightInfo);

    const containerClass = classNames('control__container', {"scoreboard_reverced": scoreboardRevercedView === true});
    const scoreboardClass = classNames('scoreboard__preview', {"scoreboard_reverced": scoreboardRevercedView === true});

    return(
        <div>
           
                <div className={containerClass}> 
                    <div className="control__group1">
                        <ButtonGroup  className="me-2">
                            <Button variant="danger" onClick={() => changeScore1(-1)}>-1</Button>
                            <Button variant="danger" onClick={() => changeScore1(1)}>+1</Button>
                        </ButtonGroup>
                    </div>
                    <div className="control__container__center">

                    <div className="scoreboard__preview__info">
                        <span>Группа {activePool +1}</span>&nbsp;
                        <span>Бой {activeFightId}</span>&nbsp;
                        <span>Статус {activeFightStatus}</span>
                    </div>

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
                        <div className="time__control">
                            <ButtonGroup  className="me-2">
                                <Button variant="success" onClick={() => {setTimer(localTimer - 5000)}}>-5 сек</Button>
                                <Button variant="success" onClick={() => {setTimer(localTimer - 1000)}}>-1 сек</Button>
                                <Button variant="success" onClick={() => {setTimer(localTimer + 1000)}}>+1 сек</Button>
                                <Button variant="success" onClick={() => {setTimer(localTimer + 5000)}}>+5 сек</Button>
                            </ButtonGroup>

                            <ButtonGroup  className="me-2">
                                <Button variant="success" onClick={() => {setTimer(30000)}}>30 сек</Button>
                                <Button variant="success" onClick={() => {setTimer(45000)}}>45 сек</Button>
                                <Button variant="success" onClick={() => {setTimer(60000)}}>1 мин</Button>
                            </ButtonGroup>            

                            <div className="button__container">
                                <Button variant="success" onClick={() => {toogleTimer()}}>Cтарт</Button>
                                <Button variant="warning" onClick={() => onLastGathering()}>Последний сход</Button>
                            </div>
                            <div className="button__container">
                                <Button variant="danger" onClick={() => onReset()}>Reset</Button>
                                <Button variant="warning" onClick={() => onScoreboardReversed()}>Поменять бойцов местами</Button>
                                <Button variant="success" onClick={() => onSubmit()}>submit</Button>
                            </div>
                        </div>
                    </div>
                    <div className="control__group2">
                        <ButtonGroup  className="me-2">
                            <Button variant="primary" onClick={() => changeScore2(-1)}>-1</Button>
                            <Button variant="primary" onClick={() => changeScore2(1)}>+1</Button>
                        </ButtonGroup>
                    </div>
                </div>
        </div>
    )
}

export default ScoreboardControlEleminations;