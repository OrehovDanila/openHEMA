import { NavLink } from "react-router-dom";
import { Button, ButtonGroup, DropdownButton, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useMemo, useEffect } from "react";
import { getDatabase, ref, onValue, set } from 'firebase/database'

import { scoreboardActivePoolChanges, scoreboardArrayChanges } from "../scoreboardControlSlice";

import { scoreboardChanges, scoreboardFightChanges, scoreboardsFetched } from "../../scoreboard/scoreboard/scoreboardsSlice";

import { poolsFetched, eliminationsFetched } from "../scoreboardControlSlice";
import { nominationsFetched, nominationChanges } from "../../tabs/nominationsSlice";
import { authToogle } from "../../modal/modalSlice";

import "./scoreboardControlHeader.scss"

//Смарт-компонент хэдер панели управления таблом. С его помощью выбирается активный бой

const ScoreboardControlHeader = () => {

    const pools = useSelector(state => state.scoreboardsControl.pools);

    const activeArray = useSelector(state => state.scoreboardsControl.scoreboardActivePool);
    const scoreboardArray = useSelector(state => state.scoreboardsControl.scoreboardArray);

    const activeScoreboard = useSelector(state => state.scoreboards.activeScoreboard);
    const poolsLoadingStatus = useSelector(state => state.scoreboardsControl.poolsLoadingStatus);
    const eliminations = useSelector(state => state.scoreboardsControl.eliminations);
    const eliminationsLoadingStatus = useSelector(state => state.scoreboardsControl.eliminationsLoadingStatus);

    const activeNomination = useSelector(state => state.nominations.activeNomination);
    const nominations = useSelector(state => state.nominations.nominations);
    const nominationsLoadingStatus = useSelector(state => state.nominations.nominationsLoadingStatus);
    const scoreboardLoadingStatus = useSelector(state => state.scoreboards.scoreboardLoadingStatus);
    

    const dispatch = useDispatch();

    const database = getDatabase();

    const scoreboardsRef = ref(database, 'scoreboards');
    const nominationRef = ref(database, 'nominations');
    const poolsRef = ref(database, 'pools');
    const eliminationsRef = ref(database, 'eliminations');

    useEffect(() => {

        // подписываемся на обновления Readltime database когда компонент отрендерился 

        const unsubScoreboards = onValue(scoreboardsRef, (snapshot) => {
            const data = snapshot.val();
            dispatch(scoreboardsFetched(data));
        })

        return function cleanup() {
            //Отписка по удалению компонента
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
            unsubPools();
        }
        // eslint-disable-next-line
    }, []);

    
    useEffect(() => {

        // подписываемся на обновления Readltime database когда компонент отрендерился 

        const unsubEliminations = onValue(eliminationsRef, (snapshot) => {
            const data = snapshot.val();
            dispatch(eliminationsFetched(data));
        })

        return function cleanup() {
            //Отписка по удалению компонента
            unsubEliminations();
        }
        // eslint-disable-next-line
    }, []);

    const filtredPools = useMemo(() => {
        const filtredPools = pools.slice();
        return filtredPools.filter(item => item.nomination === activeNomination);
    },[pools, activeNomination]);


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

    if (eliminationsLoadingStatus === "loading") {
        return <h5 className="text-center mt-5">Загрузка групп</h5>
    } else if (eliminationsLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки групп</h5>
    }

    if (nominationsLoadingStatus === "loading") {
        return <h5 className="text-center mt-5">Загрузка групп</h5>
    } else if (nominationsLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки групп</h5>
    }

    // if (activeNomination === ''){
    //     dispatch(nominationChanges(nominations[0]))
    // }

    const filtredElimination = eliminations.slice().filter(item => item.nomination === activeNomination);

    //Дополнительное значение что бы использовать компонент как с группами так и с плейофф

    let activeArrayValue;
    if(scoreboardArray === 'pools'){
        activeArrayValue = pools.find((item) => item.poolId === activeArray);
    } else if(scoreboardArray === 'elimination'){
        activeArrayValue = filtredElimination[0].rounds.find((item) => item.RoundId === activeArray);
    }

    let RenderArray;
    if(scoreboardArray === 'pools'){
        RenderArray = filtredPools;
    } else if(scoreboardArray === 'elimination'){
        RenderArray = filtredElimination[0].rounds;
    }

    let scoreboardTitle;
    if(scoreboardArray === 'pools'){
        scoreboardTitle = 'Группы';
    } else if(scoreboardArray === 'elimination'){
        scoreboardTitle = 'Раунды';
    }

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

    const renderEliminations = (arr) => {
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

    const renderButtons = (scoreboardArray) => {
        if(scoreboardArray === 'pools'){
            return(
                <Button className="btn btn-success" type="button" onClick={() => dispatch(scoreboardArrayChanges('elimination'))}>Плейофф</Button>
            )
        }else if(scoreboardArray === 'elimination'){
            return(
                <Button className="btn btn-success" type="button" onClick={() => dispatch(scoreboardArrayChanges('pools'))}>Группа</Button>
            )
        }
    }

    const renderArray = (scoreboardArray, activeArray) => {
        if(scoreboardArray === 'pools'){
            return renderPools(activeArray);
        }else if(scoreboardArray === 'elimination'){
            return renderEliminations(activeArray);
        }
    }
    

    let activeFights = [];

    if(activeArrayValue){
        activeFights = activeArrayValue.fights;
    }

    const fightElement = renderFights(activeFights);

    const arrayElements = renderArray(scoreboardArray, RenderArray)

    const nominationElements = renderNomination(nominations);

    const buttonElements = renderButtons(scoreboardArray);



    return(
        <div className="control__header">
            <h1 className="control__header__title">Управление Таблом</h1>

            <ButtonGroup className="app__buttonGroup">
                <NavLink type="button" className="btn btn-warning" to="/">Таблицы</NavLink>
                <NavLink type="button" className="btn btn-warning" to="/scoreboard">Табло</NavLink>
                <NavLink type="button" className="btn btn-warning" to="/scoreboard-control/pools">Управление таблом</NavLink>
                <NavLink type="button" className="btn btn-warning" to="/admin-panel/nominations">Админка</NavLink>
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
                {buttonElements}
                <DropdownButton className="control__button__group__pool/round" id="dropdown-basic-button" title={scoreboardTitle}>
                    {arrayElements}
                </DropdownButton>
                <DropdownButton className="control__button__group__fights" id="dropdown-basic-button" title="Бои">
                    {fightElement}
                </DropdownButton>
            </div>
        </div>
    )
}

export default ScoreboardControlHeader;