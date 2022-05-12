import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHttp } from '../../hooks/http.hook';

import Pool from "../pool/pool";
import { fetchPools, fetchFighters } from '../../actions';

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

    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        dispatch(fetchPools(request));
        // eslint-disable-next-line
    },[]);

    useEffect(() => {
        dispatch(fetchFighters(request));
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