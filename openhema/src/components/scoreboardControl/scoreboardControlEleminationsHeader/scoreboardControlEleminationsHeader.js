import { NavLink } from "react-router-dom";
import { Button, ButtonGroup, DropdownButton, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useMemo, useEffect } from "react";
import { getDatabase, ref, onValue, set } from 'firebase/database'

import {
    authToogle,
    scoreboardChanges,
    nominationChanges,
    scoreboardActivePoolChanges,
    scoreboardFightChanges,
    eleminationsFetched,
    nominationsFetched,
    scoreboardsFetched, } from "../../../actions";

const ScoreboardControlEleminationsHeader = () => {

    const eleminations = useSelector(state => state.eleminations.eleminations);
    const eleminationsLoadingStatus = useSelector(state => state.eleminations.eleminationsLoadingStatus);
    const scoreboardLoadingStatus = useSelector(state => state.scoreboards.scoreboardLoadingStatus);
    const activePool = useSelector(state => state.scoreboards.scoreboardActivePool);
    const activeScoreboard = useSelector(state => state.scoreboards.activeScoreboard);

    const activeNomination = useSelector(state => state.nominations.activeNomination);
    const nominations = useSelector(state => state.nominations.nominations);

    const dispatch = useDispatch();

    const database = getDatabase();

    const scoreboardsRef = ref(database, 'scoreboards');
    const nominationRef = ref(database, 'nominations');
    const eleminationsRef = ref(database, 'eleminations');

    useEffect(() => {

        // подписываемся на обновления Readltime database когда компонент отрендерился 

        const unsubScoreboards = onValue(scoreboardsRef, (snapshot) => {
            const data = snapshot.val();
            dispatch(scoreboardsFetched(data));
        })

        return function cleanup() {
            //Отписка по удалению компонента
            console.log('отписка табло')
            unsubScoreboards();
        }
        // eslint-disable-next-line
    }, []);


    useEffect(() => {

        // подписываемся на обновления Readltime database когда компонент отрендерился 

        const unsubNominations = onValue(nominationRef, (snapshot) => {
            const data = snapshot.val();
            dispatch(nominationsFetched(data));
        })

        return function cleanup() {
            //Отписка по удалению компонента
            console.log('отписка номинаций')
            unsubNominations();
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {

        // подписываемся на обновления Readltime database когда компонент отрендерился 

        const unsubEleminations = onValue(eleminationsRef, (snapshot) => {
            const data = snapshot.val();
            dispatch(eleminationsFetched(data));
        })

        return function cleanup() {
            //Отписка по удалению компонента
            console.log('отписка пулов')
            unsubEleminations();
        }
        // eslint-disable-next-line
    }, []);

    

    const filtredElemination = useMemo(() => {
        const filtredElemination = eleminations.slice();
        return filtredElemination.filter(item => item.nomination === activeNomination);
    },[eleminations, activeNomination]);

    if (eleminationsLoadingStatus === "loading") {
        return <h5 className="text-center mt-5">Загрузка групп</h5>
    } else if (eleminationsLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки групп</h5>
    }
    if (scoreboardLoadingStatus === "loading") {
        return <h5 className="text-center mt-5">Загрузка групп</h5>
    } else if (scoreboardLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки групп</h5>
    };

    if (activeNomination === ''){
        dispatch(nominationChanges(nominations[0]))
    }

    const activeRoundValue = filtredElemination[0].rounds.find((item) => item.RoundId === activePool);

    const renderNomination = (arr) => {
        return arr.map((item) => {
            return (
                <Dropdown.Item key={item.id} onClick={() => {dispatch(nominationChanges(item.label))}}>{item.label}</Dropdown.Item>
            )
        })
    };

    const renderEleminations = (arr) => {
        return arr.map((item) => {
            return (
                <Dropdown.Item key={item.RoundId} onClick={() => dispatch(scoreboardActivePoolChanges(item.RoundId))}>{item.RoundName}</Dropdown.Item>
            )
        })
    }

    const renderFights = (arr) => {
        return arr.map((item) => {
            return(
                <Dropdown.Item 
                key={item.fightId} 
                onClick={() => {
                    set(ref(database, 'scoreboards/' + activeScoreboard + '/fightId'), item.fightId)
                    dispatch(scoreboardFightChanges({id: activeScoreboard, data: item.fightId}));
                }}>
                    Бой {item.fightId}
                </Dropdown.Item>
            )
        })
    };


   
    const fightElement = renderFights(activeRoundValue.fights);

    const poolElements = renderEleminations(filtredElemination[0].rounds);

    const nominationElements = renderNomination(nominations);



    return(
        <div className="control__header">
            <h1 className="control__header__title">Управление Таблом</h1>

            <ButtonGroup className="app__buttonGroup">
                <NavLink type="button" className="btn btn-warning" to="/">Таблицы</NavLink>
                <NavLink type="button" className="btn btn-warning" to="/scoreboard">Табло</NavLink>
                <NavLink type="button" className="btn btn-warning" to="/scoreboard-control/pools">Управление таблом</NavLink>
                <Button type="button" className="btn btn-warning">Админка</Button>
                <Button type="button" className="btn btn-warning" onClick={() => dispatch(authToogle())}>Выход</Button>
            </ButtonGroup>
            
            <div className="control__button__group">
                <div className="control__button__group__scoreboardID">
                    <h5>Номер табло</h5>
                    <ButtonGroup className="me-2">
                        <Button onClick={() => dispatch(scoreboardChanges(0))} variant="success">1</Button>
                        <Button onClick={() => dispatch(scoreboardChanges(1))} variant="success">2</Button>
                        <Button onClick={() => dispatch(scoreboardChanges(2))} variant="success">3</Button> 
                        <Button onClick={() => dispatch(scoreboardChanges(3))} variant="success">4</Button>
                    </ButtonGroup>
                </div>
                <DropdownButton className="control__button__group__nomination" id="dropdown-basic-button" title="Номинации">
                    {nominationElements}
                </DropdownButton>
                <ButtonGroup className="control__button__group__pools/playoff">
                    <NavLink className="btn btn-success" type="button" to="/scoreboard-control/pools">Группы</NavLink>
                    <NavLink className="btn btn-success" type="button" to="/scoreboard-control/eleminations">Плейофф</NavLink>
                </ButtonGroup>
                <DropdownButton className="control__button__group__pool/round" id="dropdown-basic-button" title="Раунды">
                    {poolElements}
                </DropdownButton>
                <DropdownButton className="control__button__group__fights" id="dropdown-basic-button" title="Бои">
                    {fightElement}
                </DropdownButton>
            </div>
        </div>
    )
}

export default ScoreboardControlEleminationsHeader;