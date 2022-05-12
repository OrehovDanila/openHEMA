import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHttp } from '../../hooks/http.hook';

import { fetchEleminations, fetchFighters } from '../../actions';

import Elemination8 from '../elemination8/Elemination8';
import Elemination12 from '../elemination12/Elemination12';
import Elemination16 from '../elemination16/Elemination16';
import Elemination24 from '../elemination24/Elemination24';
import Elemination32 from '../elemination32/Elemination32';

import './elemination.scss';

const Elemination = () => {

    const eleminationsLoadingStatus = useSelector(state => state.eleminations.eleminationsLoadingStatus);
    const eleminations = useSelector(state => state.eleminations.eleminations);

    const fightersLoadingStatus = useSelector(state => state.fighters.fightersLoadingStatus);
    const fighters = useSelector(state => state.fighters.fighters);

    const activeNomination = useSelector(state => state.nominations.activeNomination);

    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        dispatch(fetchEleminations(request));
        // eslint-disable-next-line
    },[]);

    useEffect(() => {
        dispatch(fetchFighters(request));
        // eslint-disable-next-line
    }, []);

    const filtredElemination = useMemo(() => {
        const filtredElemination = eleminations.slice();

        console.log(filtredElemination[0].nomination)
        console.log(activeNomination)
        return filtredElemination.filter(item => item.nomination === activeNomination);
    },[eleminations, activeNomination]);



    if (eleminationsLoadingStatus === "loading") {
        return <h5 className="text-center mt-5">Загрузка групп</h5>
    } else if (eleminationsLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки групп</h5>
    }

    if (fightersLoadingStatus === "loading") {
        return <h5 className="text-center mt-5">Загрузка бойцов</h5>
    } else if (fightersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки бойцов</h5>
    }
    

    const type = filtredElemination[0].eleminationType;

    switch(type){
        case '8':
            return (
                <Elemination8 eleminations={filtredElemination[0]} fighters={fighters}/>
            )
        case '12':
            return (
                <Elemination12 eleminations={filtredElemination[0]} fighters={fighters}/>
            )
        case '16':
            return (
                <Elemination16 eleminations={filtredElemination[0]} fighters={fighters}/>
            )
        case '24':
            return(
                <Elemination24 eleminations={filtredElemination[0]} fighters={fighters}/>
            )
        case '32':
            return(
                <Elemination32 eleminations={filtredElemination[0]} fighters={fighters}/>
            )
        
        default: 
            return(
                <h5 className="text-center mt-5">Ошибка сетки</h5>
            )
    }
};

export default Elemination;