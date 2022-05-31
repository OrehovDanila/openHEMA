import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { getDatabase, ref, onValue } from 'firebase/database'

import Pool from "./pool/pool";
import { fightersFetched } from './fightersSlice';
import { poolsFetched } from './poolsSlice';

import "./pools.scss"

// Смарт-компонент для рендера групп боёв

const Pools = () => {

    const poolsLoadingStatus = useSelector(state => state.pools.poolsLoadingStatus);
    const pools = useSelector(state => state.pools.pools);
    const fightersLoadingStatus = useSelector(state => state.fighters.fightersLoadingStatus);
    const activeNomination = useSelector(state => state.nominations.activeNomination);

    // Значение отфильтрованных групп запоминаем, что бы не ререндерить при внешних ихменениях

    const filtredPools = useMemo(() => {
        const filtredPools = pools.slice();
        return filtredPools.filter(item => item.nomination === activeNomination);
    },[pools, activeNomination]);


    const database = getDatabase();

    const dispatch = useDispatch();

    const poolsRef = ref(database, 'pools');
    
    useEffect(() => {

        // подписываемся на обновления групп Readltime database когда компонент отрендерился 

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

        // подписываемся на обновления бойцов Readltime database когда компонент отрендерился 

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

    // Заглушки пока подгружаются данные 

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

    if (activeNomination === ''){
        return(
            <div className="pools__container">
                <h5 className="text-center mt-5">Выберите номинацию</h5>
            </div>
        )
    }

    //Передача данных дамб-компоненту

    const renderPoolsList = (arr) => {
        return arr.map(({poolId, ...props}) => {
            return (
                <Pool key={poolId} {...props} />
            )
        })
    }
    
    const elements = renderPoolsList(filtredPools);

    return(
        <div className="pools__container">
            {elements}
        </div>
    )
};

export default Pools;