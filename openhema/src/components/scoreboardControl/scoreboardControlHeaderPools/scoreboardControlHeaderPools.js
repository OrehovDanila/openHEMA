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
    poolsFetched,
    nominationsFetched,
    scoreboardsFetched, } from "../../../actions";

const ScoreboardControlPoolsHeader = () => {

    const pools = useSelector(state => state.pools.pools);
    const activePool = useSelector(state => state.scoreboards.scoreboardActivePool);
    const activeScoreboard = useSelector(state => state.scoreboards.activeScoreboard);
    const poolsLoadingStatus = useSelector(state => state.pools.poolsLoadingStatus);

    const activeNomination = useSelector(state => state.nominations.activeNomination);
    const nominations = useSelector(state => state.nominations.nominations);
    const scoreboardLoadingStatus = useSelector(state => state.scoreboards.scoreboardLoadingStatus);

    const dispatch = useDispatch();

    const database = getDatabase();

    const scoreboardsRef = ref(database, 'scoreboards');
    const nominationRef = ref(database, 'nominations');
    const poolsRef = ref(database, 'pools');

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

        const unsubPools = onValue(poolsRef, (snapshot) => {
            const data = snapshot.val();
            dispatch(poolsFetched(data));
        })

        return function cleanup() {
            //Отписка по удалению компонента
            console.log('отписка пулов')
            unsubPools();
        }
        // eslint-disable-next-line
    }, []);

    const filtredPools = useMemo(() => {
        const filtredPools = pools.slice();
        return filtredPools.filter(item => item.nomination === activeNomination);
    },[pools, activeNomination]);

    const activePoolValue = pools.find((item) => item.poolId === activePool);

    const renderNomination = (arr) => {
        return arr.map((item) => {
            return (
                <Dropdown.Item key={item.id} onClick={() => {dispatch(nominationChanges(item.label))}}>{item.label}</Dropdown.Item>
            )
        })
    };

    const renderPools = (arr) => {
        return arr.map((item) => {
            return (
                <Dropdown.Item key={item.poolId} onClick={() => dispatch(scoreboardActivePoolChanges(item.poolId))}>{item.poolName}</Dropdown.Item>
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
    
    if (poolsLoadingStatus === "loading") {
        return <h5 className="text-center mt-5">Загрузка групп</h5>
    } else if (poolsLoadingStatus === "error") {
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

    const fightElement = renderFights(activePoolValue.fights);

    const poolElements = renderPools(filtredPools);

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
                    <NavLink className="btn btn-success" type="button" to="/scoreboard-control/pools">Группа</NavLink>
                    <NavLink className="btn btn-success" type="button" to="/scoreboard-control/eleminations">Плейофф</NavLink>
                </ButtonGroup>
                <DropdownButton className="control__button__group__pool/round" id="dropdown-basic-button" title="Группы">
                    {poolElements}
                </DropdownButton>
                <DropdownButton className="control__button__group__fights" id="dropdown-basic-button" title="Бои">
                    {fightElement}
                </DropdownButton>
            </div>
        </div>
    )
}

export default ScoreboardControlPoolsHeader;