import { Button, DropdownButton, Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useMemo } from "react"
import { getDatabase, ref, set } from 'firebase/database';

const  PoolsAddForm = () => {

    const fightersLoadingStatus = useSelector(state => state.fighters.fightersLoadingStatus);
    const fighters = useSelector(state => state.fighters.fighters);
    const pools = useSelector(state => state.pools.pools);
    const poolsLoadingStatus = useSelector(state => state.pools.poolsLoadingStatus);
    const activeNomination = useSelector(state => state.nominations.activeNomination);
    const database = getDatabase();

    const filtredPools = useMemo(() => {
        const filtredPools = pools.slice();
        return filtredPools.filter(item => item.nomination === activeNomination);
    },[pools, activeNomination]);


    if (fightersLoadingStatus === "loading") {
        return <h5 className="text-center mt-5">Загрузка бойцов</h5>
    } else if (fightersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки бойцов</h5>
    }

    if (poolsLoadingStatus === "loading") {
        return <h5 className="text-center mt-5">Загрузка групп</h5>
    } else if (poolsLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки групп</h5>
    }

    const onAddFighter = (poolId, fighterId) => {


        const oldPool = filtredPools.find(item => item.poolId === poolId);

        let newFighters = [];

        if(oldPool.fighters){
            newFighters = oldPool.fighters.slice();
        }

        newFighters.push(fighterId)


        let newFights = [];
        if(oldPool.fights){
            newFights = oldPool.fights;
        }

        const newPool = {
            poolId: poolId,
            poolName: oldPool.poolName,
            nomination: oldPool.nomination,
            status: oldPool.status,
            fighters: newFighters,
            fights: newFights,
        }


        set(ref(database, 'pools/' + poolId), newPool);
    }

    const renderPools = (arr, fighterId) => {
        return arr.map((item) => {
            return(
                <Dropdown.Item onClick={() => onAddFighter(item.poolId, fighterId)} key={item.poolId}>{item.poolName}</Dropdown.Item>
            )
        })
    }

    const renderFights = (arr) => {
        return arr.map((item) => {

            const elements = renderPools(filtredPools, item.id) ;

            return(
                <div key={item.id} className="fighter__container__item">
                    <div className="fighter__container__item__name">{item.name}</div>
                    <DropdownButton  title="Группа">
                        {elements}
                    </DropdownButton>
                </div>
            )
        })
    }

    const onAddPool = () => {
        const newPool = {
            poolId: pools.length,
            poolName: 'Группа ' + +(filtredPools.length + 1),
            nomination: activeNomination,
            status: 'idle',
            fighters: [],
            fights: [],
        }

        let newPools = pools.slice();
        newPools.push(newPool);

        set(ref(database, 'pools'), newPools);
    }

    let filtredFighters = fighters.slice();

    let unfiltredFighters = [];

    if(filtredPools){
        for(let i in filtredPools){
            if(filtredPools[i].fighters){
                for(let j in filtredPools[i].fighters){
                    unfiltredFighters.push(filtredPools[i].fighters[j])
                }
            }
        }
    }

    filtredFighters =  filtredFighters.filter(item =>  !unfiltredFighters.includes(item.id));

    const fighterElements = renderFights(filtredFighters);

    return(
        <div className="admin__addForm">
                <Button onClick={() => onAddPool()}>Добавить группу</Button>
                <div className="fighter__container">
                    <div>Бойцы:</div>
                    {fighterElements}
                </div>
            </div>
    )
}

export default PoolsAddForm