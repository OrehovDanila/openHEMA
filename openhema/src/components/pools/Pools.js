import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { getDatabase, ref, onValue } from 'firebase/database'

import Pool from "./pool/pool";
import { poolsFetched , fightersFetched, eleminationsFetched } from '../../actions';

import "./pools.scss"

const Pools = () => {

    const poolsLoadingStatus = useSelector(state => state.pools.poolsLoadingStatus);
    const pools = useSelector(state => state.pools.pools);
    const fightersLoadingStatus = useSelector(state => state.fighters.fightersLoadingStatus);
    const activeNomination = useSelector(state => state.nominations.activeNomination);

    const filtredPools = useMemo(() => {
        const filtredPools = pools.slice();
        return filtredPools.filter(item => item.nomination === activeNomination);
    },[pools, activeNomination]);


    const database = getDatabase();

    const dispatch = useDispatch();

    const poolsRef = ref(database, 'pools');
    
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

    const eleminationRef = ref(database, 'eleminations')

    useEffect(() => {

        // подписываемся на обновления Readltime database когда компонент отрендерился 

        const unsubElemination = onValue(eleminationRef, (snapshot) => {
            const data = snapshot.val();
            dispatch(eleminationsFetched(data));
        })

        return function cleanup() {
            //Отписка по удалению компонента
            console.log('отписка плейофф')
            unsubElemination();
        }
        // eslint-disable-next-line
    }, []);


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