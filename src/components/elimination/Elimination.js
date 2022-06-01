import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { getDatabase, ref, onValue } from 'firebase/database'

import { eliminationsFetched, fightersFetched } from './elininationsSlice';

import Elimination8 from './elimination8/Elimination8';
import Elimination12 from './elimination12/Elimination12';
import Elimination16 from './elimination16/Elimination16';
import Elimination24 from './elimination24/Elimination24';
import Elimination32 from './elimination32/Elimination32';

import './elimination.scss';

//Смарт-компонент для рендера плейофф

const Elimination = () => {

    const eliminationsLoadingStatus = useSelector(state => state.eliminations.eliminationsLoadingStatus);
    const eliminations = useSelector(state => state.eliminations.eliminations);

    const fightersLoadingStatus = useSelector(state => state.eliminations.fightersLoadingStatus);

    const activeNomination = useSelector(state => state.nominations.activeNomination);

    const dispatch = useDispatch();
    const database = getDatabase();

    const eliminationRef = ref(database, 'eliminations')

    useEffect(() => {

        // подписываемся на обновления Readltime database когда компонент отрендерился 

        const unsubElimination = onValue(eliminationRef, (snapshot) => {
            const data = snapshot.val();
            dispatch(eliminationsFetched(data));
        })

        return function cleanup() {
            //Отписка по удалению компонента
            unsubElimination();
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

    //Значение отфильтрованных плейоффов запоминаем, что бы не ререндерить компонент лишний раз

    const filtredElimination = useMemo(() => {
        const filtredElimination = eliminations.slice();
        return filtredElimination.filter(item => item.nomination === activeNomination);
    },[eliminations, activeNomination]);

    //Заглушки на случай загрузки данных

    if (eliminationsLoadingStatus === "loading") {
        return <h5 className="text-center mt-5">Загрузка групп</h5>
    } else if (eliminationsLoadingStatus === "error") {
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
    

    const type = filtredElimination[0].eliminationType;

    //Свитч который в зависимости от типа сетки выбирает нужный дамб-компонент с разной вёрсткой

    switch(type){
        case '8':
            return (
                <Elimination8 eliminations={filtredElimination[0]} />
            )
        case '12':
            return (
                <Elimination12 eliminations={filtredElimination[0]} />
            )
        case '16':
            return (
                <Elimination16 eliminations={filtredElimination[0]} />
            )
        case '24':
            return(
                <Elimination24 eliminations={filtredElimination[0]} />
            )
        case '32':
            return(
                <Elimination32 eliminations={filtredElimination[0]} />
            )
        
        default: 
            return(
                <h5 className="text-center mt-5">Ошибка сетки</h5>
            )
    }
};

export default Elimination;