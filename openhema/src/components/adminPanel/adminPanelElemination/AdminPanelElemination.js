import { getDatabase, ref, onValue, set } from 'firebase/database';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { fightersFetched, eleminationsFetched, poolsFetched} from "../../../actions"
import AdminPanelEleminationRound from "./AdminPanelEleminationRound";


const AdminPanelElemination = () => {

    const dispatch = useDispatch();
    const database = getDatabase();

    const eleminationsLoadingStatus = useSelector(state => state.eleminations.eleminationsLoadingStatus);
    const eleminations = useSelector(state => state.eleminations.eleminations);

    const fightersLoadingStatus = useSelector(state => state.fighters.fightersLoadingStatus);

    const poolsLoadingStatus = useSelector(state => state.pools.poolsLoadingStatus);

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
            console.log('отписка пулов')
            unsubPools();
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

    const filtredElemination = useMemo(() => {
        const filtredElemination = eleminations.slice();
        return filtredElemination.filter(item => item.nomination === activeNomination);
    },[eleminations, activeNomination]);

    if (poolsLoadingStatus === "loading") {
        return <h5 className="text-center mt-5">Загрузка групп</h5>
    } else if (poolsLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки групп</h5>
    }

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

    if (activeNomination === ''){
        return(
            <div className="pools__container">
                <h5 className="text-center mt-5">Выберите номинацию</h5>
            </div>
        )
    }

    if(filtredElemination.length === 0){
        return(
            <div className="admin__items">
                Плейофф не готова
            </div>
        )
    }

    const onDeleteFighter = (fightId, fighterId, RoundId) => {

        const round = filtredElemination[0].rounds.find(item => item.RoundId === RoundId);

        const oldFight = round.fights.find(item => item.fightId === fightId)

        let newFighter1Id = oldFight.fighter1Id;
        let newFighter2Id = oldFight.fighter2Id;

        if(fighterId === newFighter1Id){
            newFighter1Id = '';
        } else if(fighterId === newFighter2Id) {
            newFighter2Id = '';
        }

        let eleminationIndex = eleminations.indexOf(eleminations.find(item => item.nomination === activeNomination));
        if(eleminationIndex === -1){
            eleminationIndex = eleminations.length;
        }

        const roundsIndex = filtredElemination[0].rounds.indexOf(round);

        const fightIndex = filtredElemination[0].rounds[roundsIndex].fights.indexOf(oldFight);

        set(ref(database, 'eleminations/' + eleminationIndex + '/rounds/' + roundsIndex + '/fights/' + fightIndex +'/fighter1Id'), newFighter1Id);
        set(ref(database, 'eleminations/' + eleminationIndex + '/rounds/' + roundsIndex + '/fights/' + fightIndex +'/fighter2Id'), newFighter2Id);
    }

    const onPromoteFighter = (fightIndex, fighterId, roundId) => {
        const round = filtredElemination[0].rounds[roundId - 1];

        if( filtredElemination[0].rounds.indexOf(round) > 0 ){

        const oldFight = round.fights[Math.floor(fightIndex/2)]


        let newFighter1Id = oldFight.fighter1Id;
        let newFighter2Id = oldFight.fighter2Id;

        if( fightIndex % 2 === 0){
            newFighter1Id = fighterId;
        } else if( fightIndex % 2 === 1 ){
            newFighter2Id = fighterId;
        }

        let eleminationIndex = eleminations.indexOf(eleminations.find(item => item.nomination === activeNomination));
        if(eleminationIndex === -1){
            eleminationIndex = eleminations.length;
        }
        const roundsIndex = filtredElemination[0].rounds.indexOf(round);

        set(ref(database, 'eleminations/' + eleminationIndex + '/rounds/' + roundsIndex + '/fights/' + Math.floor(fightIndex/2) + '/fighter1Id'), newFighter1Id);
        set(ref(database, 'eleminations/' + eleminationIndex + '/rounds/' + roundsIndex + '/fights/' + Math.floor(fightIndex/2) + '/fighter2Id'), newFighter2Id);

        } else if(filtredElemination[0].rounds.indexOf(round) === 0) {
            if(filtredElemination[0].eleminationType === '8' ||
               filtredElemination[0].eleminationType === '16' || 
               filtredElemination[0].eleminationType === '32' ){

                const oldFightFinale = round.fights[0];

                let newFighter1Id = oldFightFinale.fighter1Id;
                let newFighter2Id = oldFightFinale.fighter2Id;

                if( fightIndex % 2 === 0){
                    newFighter1Id = fighterId;
                } else if( fightIndex % 2 === 1 ){
                    newFighter2Id = fighterId;
                }

                const newFightFinale = {
                    fightId: oldFightFinale.fightId,
                    status: oldFightFinale.status,
                    fighter1Id: newFighter1Id,
                    fighter2Id: newFighter2Id,
                    score1: oldFightFinale.score1,
                    score2: oldFightFinale.score2
                };

                let fighterLooserId;
                const oldFightThird = round.fights[1];

                if(fighterId === filtredElemination[0].rounds[roundId].fights[fightIndex].fighter1Id){
                    fighterLooserId = filtredElemination[0].rounds[roundId].fights[fightIndex].fighter2Id;
                } else if(fighterId === filtredElemination[0].rounds[roundId].fights[fightIndex].fighter2Id){
                    fighterLooserId = filtredElemination[0].rounds[roundId].fights[fightIndex].fighter1Id;
                }

                newFighter1Id = oldFightThird.fighter1Id;
                newFighter2Id = oldFightThird.fighter2Id;

                if( fightIndex % 2 === 0){
                    newFighter1Id = fighterLooserId;
                } else if( fightIndex % 2 === 1 ){
                    newFighter2Id = fighterLooserId;
                }

                const newFightThird = {
                    fightId: oldFightThird.fightId,
                    status: oldFightThird.status,
                    fighter1Id: newFighter1Id,
                    fighter2Id: newFighter2Id,
                    score1: oldFightThird.score1,
                    score2: oldFightThird.score2
                };
        
                let eleminationIndex = eleminations.indexOf(eleminations.find(item => item.nomination === activeNomination));
                if(eleminationIndex === -1){
                    eleminationIndex = eleminations.length;
                }
                const roundsIndex = filtredElemination[0].rounds.indexOf(round);
               

                set(ref(database, 'eleminations/' + eleminationIndex + '/rounds/' + roundsIndex + '/fights/0'), newFightFinale);
                set(ref(database, 'eleminations/' + eleminationIndex + '/rounds/' + roundsIndex + '/fights/1'), newFightThird);
            } else if(filtredElemination[0].eleminationType === '12' ||
            filtredElemination[0].eleminationType === '24'){
                if(fightIndex === 0){
                    const oldFight1 = round.fights[0];
                    const oldFight2 = round.fights[1];

                    const newFight1 = {
                        fightId: oldFight1.fightId,
                        status: oldFight1.status,
                        fighter1Id: fighterId,
                        fighter2Id: oldFight1.fighter2Id,
                        score1: oldFight1.score1,
                        score2: oldFight1.score2
                    };

                    const newFight2 = {
                        fightId: oldFight2.fightId,
                        status: oldFight2.status,
                        fighter1Id: oldFight2.fighter1Id,
                        fighter2Id: fighterId,
                        score1: oldFight2.score1,
                        score2: oldFight2.score2
                    };

                    let eleminationIndex = eleminations.indexOf(eleminations.find(item => item.nomination === activeNomination));
                    if(eleminationIndex === -1){
                        eleminationIndex = eleminations.length;
                    }
                    const roundsIndex = filtredElemination[0].rounds.indexOf(round);
                   
    
                    set(ref(database, 'eleminations/' + eleminationIndex + '/rounds/' + roundsIndex + '/fights/0'), newFight1);
                    set(ref(database, 'eleminations/' + eleminationIndex + '/rounds/' + roundsIndex + '/fights/1'), newFight2);
                } else if(fightIndex === 1){
                    const oldFight1 = round.fights[0];
                    const oldFight2 = round.fights[2];

                    const newFight1 = {
                        fightId: oldFight1.fightId,
                        status: oldFight1.status,
                        fighter1Id: oldFight1.fighter1Id,
                        fighter2Id: fighterId,
                        score1: oldFight1.score1,
                        score2: oldFight1.score2
                    };

                    const newFight2 = {
                        fightId: oldFight2.fightId,
                        status: oldFight2.status,
                        fighter1Id: fighterId,
                        fighter2Id: oldFight2.fighter2Id,
                        score1: oldFight2.score1,
                        score2: oldFight2.score2
                    };

                    let eleminationIndex = eleminations.indexOf(eleminations.find(item => item.nomination === activeNomination));
                    if(eleminationIndex === -1){
                        eleminationIndex = eleminations.length;
                    }
                    const roundsIndex = filtredElemination[0].rounds.indexOf(round);
                   
    
                    set(ref(database, 'eleminations/' + eleminationIndex + '/rounds/' + roundsIndex + '/fights/0'), newFight1);
                    set(ref(database, 'eleminations/' + eleminationIndex + '/rounds/' + roundsIndex + '/fights/2'), newFight2);
                } else if(fightIndex === 2) {
                    const oldFight1 = round.fights[1];
                    const oldFight2 = round.fights[2];

                    const newFight1 = {
                        fightId: oldFight1.fightId,
                        status: oldFight1.status,
                        fighter1Id: fighterId,
                        fighter2Id: oldFight1.fighter2Id,
                        score1: oldFight1.score1,
                        score2: oldFight1.score2
                    };

                    const newFight2 = {
                        fightId: oldFight2.fightId,
                        status: oldFight2.status,
                        fighter1Id: oldFight2.fighter1Id,
                        fighter2Id: fighterId,
                        score1: oldFight2.score1,
                        score2: oldFight2.score2
                    };

                    let eleminationIndex = eleminations.indexOf(eleminations.find(item => item.nomination === activeNomination));
                    if(eleminationIndex === -1){
                        eleminationIndex = eleminations.length;
                    }
                    const roundsIndex = filtredElemination[0].rounds.indexOf(round);
                   
    
                    set(ref(database, 'eleminations/' + eleminationIndex + '/rounds/' + roundsIndex + '/fights/1'), newFight1);
                    set(ref(database, 'eleminations/' + eleminationIndex + '/rounds/' + roundsIndex + '/fights/2'), newFight2);
                }
            }
        }
    }

    const renderRounds = (arr) => {
        return arr.map(item => {

            return(
                <AdminPanelEleminationRound 
                key={item.RoundId} 
                RoundId={item.RoundId} 
                RoundName={item.RoundName} 
                fights={item.fights}
                onDeleteFighter={onDeleteFighter}
                onPromoteFighter={onPromoteFighter}/>
            )
        })
    }

    const elements = renderRounds(filtredElemination[0].rounds);

    return(
        <div className="admin__items">
            {elements.reverse()}
        </div>
    )
}

export default AdminPanelElemination;