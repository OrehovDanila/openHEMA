import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';
import { fightersFetched } from "../../pools/fightersSlice";
import { poolsFetched } from "../../pools/poolsSlice";
import AdminPanelPool from "../adminPanelPool/adminPanelPool";

//Смарт-компонент для удаления и редактирования групп

const AdminPanelPools = () => {

    const dispatch = useDispatch();
    const database = getDatabase();

    const poolsLoadingStatus = useSelector(state => state.pools.poolsLoadingStatus);
    const pools = useSelector(state => state.pools.pools);
    const fightersLoadingStatus = useSelector(state => state.fighters.fightersLoadingStatus);
    const activeNomination = useSelector(state => state.nominations.activeNomination);

    const poolsRef = ref(database, 'pools');
    
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

    const filtredPools = useMemo(() => {
        const filtredPools = pools.slice();
        return filtredPools.filter(item => item.nomination === activeNomination);
    },[pools, activeNomination]);

    if (poolsLoadingStatus === "loading") {
        return <h5 className="text-center mt-5">Загрузка групп</h5>
    } else if (poolsLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки групп</h5>
    }

    if (fightersLoadingStatus === "loading") {
        return <h5 className="text-center mt-5">Загрузка бойцов</h5>
    } else if (fightersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки бойцов</h5>
    }


    const onPoolDelete = (i) => {

        const pool = pools.find(item => item.poolId === filtredPools[i].poolId)
        const poolIndex = pools.indexOf(pool)

        const newPools = pools.slice();

        newPools.splice(poolIndex,1);


        set(ref(database, 'pools'), newPools);
    }

    const onFighterDelete = (i, fighterId) => {
        const pool = pools.find(item => item.poolId === filtredPools[i].poolId)
        const poolIndex = pools.indexOf(pool)
        const oldPool = filtredPools.find(item => item.poolId === poolIndex);
        const newFighters = oldPool.fighters.slice();

        newFighters.forEach((item, i) => {
            if(item === fighterId){
                newFighters.splice(i,1);
            }
        })

        let newFights = [];
        if(oldPool.fights){
            newFights = oldPool.fights;
        }

        const newPool = {
            poolId: poolIndex,
            poolName: oldPool.poolName,
            nomination: oldPool.nomination,
            status: oldPool.status,
            fighters: newFighters,
            fights: newFights,
        }
        
        set(ref(database, 'pools/' + poolIndex), newPool);
    }

    const onEditionButton = (poolId, fightIndex, counter) => {

        const oldPool = filtredPools.find(item => item.poolId === poolId);

        const newFights = oldPool.fights.slice()

        let a = newFights[fightIndex+counter];
        newFights.splice(fightIndex+counter,1,newFights[fightIndex]);
        newFights.splice(fightIndex,1,a);

        const newPool = {
            poolId: oldPool.poolId,
            poolName: oldPool.poolName,
            nomination: oldPool.nomination,
            status: oldPool.status,
            fighters: oldPool.fighters,
            fights: newFights,
        }
        
        set(ref(database, 'pools/' + poolId), newPool);
    } 

    const onSetFights = (poolId) => {
        const oldPool = filtredPools.find(item => item.poolId === poolId);

        let newFights = [];
        let fighter1id;
        let fighter2id

        for (let i in oldPool.fighters) {
            fighter1id = oldPool.fighters[i];

            for (let j = i; j < oldPool.fighters.length; j++) {
                fighter2id = oldPool.fighters[j];

                if(fighter1id !== fighter2id){

                    newFights.push({
                        fightId: uuidv4(),
                        status: "waiting",
                        fighter1Id: fighter1id,
                        fighter2Id: fighter2id,
                        score1: "",
                        score2: ""
                    })
                }
            }
        }

        const newPool = {
            poolId: poolId,
            poolName: oldPool.poolName,
            nomination: oldPool.nomination,
            status: oldPool.status,
            fighters: oldPool.fighters,
            fights: newFights,
        }
        
        set(ref(database, 'pools/' + poolId), newPool);

    };

    const renderPools = (arr) => {
        return arr.map(({poolId, ...props}, i) => {

            return(
                <AdminPanelPool 
                key={poolId} 
                {...props} 
                onDelete={onPoolDelete} 
                index={i}
                poolId={poolId}
                onFighterDelete={onFighterDelete} 
                setFights={onSetFights}
                onEditionButton={onEditionButton}/>
            )
        })
    }

    const elements = renderPools(filtredPools);

    return(
        <div className="admin__items">
           {elements}
        </div>
    )
}

export default AdminPanelPools;