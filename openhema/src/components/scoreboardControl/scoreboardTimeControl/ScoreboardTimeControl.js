import { Button, ButtonGroup } from "react-bootstrap";
import { getDatabase, ref, set } from 'firebase/database';
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from 'react';

import { scoreboardTimerToogle,
    scoreboardTimerChanges,
    poolsFightScore1Changes,
    poolsFightScore2Changes,
    scoreboardLocalTimerUpdate,
    scoreboardLastGatheringToogle,
    scoreboardRevercerdViewToogle} from "../../../actions";

const ScoreboardTimeControl = ({activeArrayValue}) => {

    const dispatch = useDispatch();
    const database = getDatabase();

    const scoreboards = useSelector(state => state.scoreboards.scoreboards);
    const activeScoreboard = useSelector(state => state.scoreboards.activeScoreboard);
    const localTimer = useSelector(state => state.scoreboards.localTimer);
    const scoreboardRevercedView = useSelector(state => state.scoreboards.scoreboardRevercedView);
    const scoreboardLastGathering = useSelector(state => state.scoreboards.scoreboardLastGathering);

    const activeArray = useSelector(state => state.scoreboards.scoreboardActivePool);
    const scoreboardArray = useSelector(state => state.scoreboards.scoreboardArray);

    const eleminations = useSelector(state => state.eleminations.eleminations);

    const activeNomination = useSelector(state => state.nominations.activeNomination);

    const activeFightId = scoreboards[activeScoreboard].fightId;

    const filtredScoreboard = useMemo(() => {
        const filtredScoreboard = scoreboards.slice();
        return filtredScoreboard.find(item => item.id === activeScoreboard);
    },[scoreboards, activeScoreboard]);
    
    const filtredElemination = useMemo(() => {
        const filtredElemination = eleminations.slice();
        return filtredElemination.filter(item => item.nomination === activeNomination);
    },[eleminations, activeNomination]);


    const toogleTimer = () => {
        dispatch(scoreboardTimerToogle(filtredScoreboard));
        set(ref(database, 'scoreboards/' + activeScoreboard + '/timerWorks'), !scoreboards[activeScoreboard].timerWorks);
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
            poolId: activeArray,
            fightId: activeFightId,
            data: 0
        }

        const patchedFight = {
            fightId: activeFightId,
            status: "waiting",
            fighter1Id: activeArrayValue.fights.find((item) => item.fightId === activeFightId).fighter1Id,
            fighter2Id: activeArrayValue.fights.find((item) => item.fightId === activeFightId).fighter2Id,
            score1: 0,
            score2: 0
        }

        const fightPos = activeArrayValue.fights.findIndex((item) => item.fightId === activeFightId);
        const eleminationId = eleminations.findIndex(item => item.nomination === activeNomination);

        setTimer(45000);

        const round = filtredElemination[0].rounds.find(item => item.RoundId === activeArray);
        const roundsIndex = filtredElemination[0].rounds.indexOf(round);

        let fighterRef;
        if(scoreboardArray === 'pools'){
            fighterRef = ref(database, 'pools/' + activeArray + '/fights/' + fightPos)
        }else if(scoreboardArray === 'elemination'){
            fighterRef = ref(database, 'eleminations/'+ eleminationId + '/rounds/' + roundsIndex + '/fights/' + fightPos)
        }
        

        set(fighterRef, patchedFight)
            .then(dispatch(poolsFightScore1Changes(data)))
            .then(dispatch(poolsFightScore2Changes(data)));

    };

    const onSubmit = () => {


        const patchedFight = {
            fightId: activeFightId,
            fighter1Id: activeArrayValue.fights.find((item) => item.fightId === activeFightId).fighter1Id,
            fighter2Id: activeArrayValue.fights.find((item) => item.fightId === activeFightId).fighter2Id,
            score1: activeArrayValue.fights.find((item) => item.fightId === activeFightId).score1,
            score2: activeArrayValue.fights.find((item) => item.fightId === activeFightId).score2,
        }

        if(patchedFight.score1 === patchedFight.score2) {
            patchedFight.status = 'draw';
        } else if(patchedFight.score1 > patchedFight.score2) {
            patchedFight.status = 'winner1';
        } else if(patchedFight.score1 < patchedFight.score2) {
            patchedFight.status = 'winner2';
        };

        const fightPos = activeArrayValue.fights.findIndex((item) => item.fightId === activeFightId)
        const eleminationId = eleminations.findIndex(item => item.nomination === activeNomination);

        const round = filtredElemination[0].rounds.find(item => item.RoundId === activeArray);
        const roundsIndex = filtredElemination[0].rounds.indexOf(round);

        let fighterRef;
        if(scoreboardArray === 'pools'){
            fighterRef = ref(database, 'pools/' + activeArray + '/fights/' + fightPos)
        }else if(scoreboardArray === 'elemination'){
            fighterRef = ref(database, 'eleminations/'+ eleminationId + '/rounds/' + roundsIndex + '/fights/' + fightPos)
        }


        set(fighterRef, patchedFight)
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


    return(
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
    )
}

export default ScoreboardTimeControl;