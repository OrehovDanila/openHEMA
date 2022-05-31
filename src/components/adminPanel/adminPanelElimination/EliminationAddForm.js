import { Button, DropdownButton, Dropdown, ButtonGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import {  useMemo } from "react";
import { v4 as uuidv4 } from 'uuid';
import { getDatabase, ref, set } from 'firebase/database';

//Компонент для выбора сетки плейофф и добавления бойцов в первый раунд

const EliminationAddForm = () => {

    const database = getDatabase();

    const eliminationsLoadingStatus = useSelector(state => state.eliminations.eliminationsLoadingStatus);
    const eliminations = useSelector(state => state.eliminations.eliminations);

    const fightersLoadingStatus = useSelector(state => state.fighters.fightersLoadingStatus);
    const fighters = useSelector(state => state.fighters.fighters);

    const pools = useSelector(state => state.pools.pools);

    const activeNomination = useSelector(state => state.nominations.activeNomination);

    const filtredPools = useMemo(() => {
        const filtredPools = pools.slice();
        return filtredPools.filter(item => item.nomination === activeNomination);
    },[pools, activeNomination]);

    const filtredElimination = useMemo(() => {
        const filtredElimination = eliminations.slice();
        return filtredElimination.filter(item => item.nomination === activeNomination);
    },[eliminations, activeNomination]);

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


    const renderFights = (arr, fighterId) => {
        return arr.map((item, i) => {
            return(
                <>
                    <Dropdown.Item key={item.fightId} onClick={() => onSetFight(item.fightId, fighterId,'1')}>Бой: {i+1} Верхний боец</Dropdown.Item>
                    <Dropdown.Item key={item.fightId+1} onClick={() => onSetFight(item.fightId, fighterId,'2')}>Бой: {i+1} Нижний боец</Dropdown.Item>
                </>
            )
        })
    }

    const renderFighters = (arr) => {
        return arr.map(item => {

            if(filtredElimination.length === 0){
                return(
                    <div className="fighter__container__item">
                        Плейофф не готова
                    </div>
                )
            }

            const round = filtredElimination[0].rounds[filtredElimination[0].rounds.length-1];

            const elements = renderFights(round.fights, item.id);

            return(
                <div key={item.id} className="fighter__container__item">
                    <div className="fighter__container__item__name">{item.name}</div>
                    <DropdownButton  title="Бои">
                        {elements}
                    </DropdownButton>
                </div>
            )
        })
    }

    const onSetElimination = (eliminationType) => {
        if(window.confirm('Смена сетки удалит всю сарую информацию, вы точно хотите продолжить?')){

            let nominationRounds;

            switch(eliminationType){
                case '8':
                    nominationRounds = [
                        {
                            RoundId: uuidv4(),
                            RoundName: "Финал",
                            fights: [
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                    ]
                        },
                        {
                            RoundId: uuidv4(),
                            RoundName: "Полуфинал",
                            fights: [
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                    ]
                        },
                        {
                            RoundId: uuidv4(),
                            RoundName: "1/4 финала",
                            fights: [
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                    ]
                        },
                    ];
                    break;
                case '12':
                    nominationRounds = [
                        {
                            RoundId: uuidv4(),
                            RoundName: "Финал трёх",
                            fights: [
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                    ]
                        },
                        {
                            RoundId: uuidv4(),
                            RoundName: "1/6 финала",
                            fights: [
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                    ]
                        },
                    ];
                    break; 
                case '16':
                    nominationRounds = [
                        {
                            RoundId: uuidv4(),
                            RoundName: "Финал",
                            fights: [
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                    ]
                        },
                        {
                            RoundId: uuidv4(),
                            RoundName: "Полуфинал",
                            fights: [
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                    ]
                        },
                        {
                            RoundId: uuidv4(),
                            RoundName: "1/4 финала",
                            fights: [
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                    ]
                        },
                        {
                            RoundId: uuidv4(),
                            RoundName: "1/8 финала",
                            fights: [
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                    ]
                        },
                    ]; 
                    break;
                case '24': 
                nominationRounds = [
                    {
                        RoundId: uuidv4(),
                        RoundName: "Финал трёх",
                        fights: [
                                    {
                                        fightId: uuidv4(),
                                        status: "idle",
                                        fighter1Id: '',
                                        fighter2Id: '',
                                        score1: '',
                                        score2: ''
                                    },
                                    {
                                        fightId: uuidv4(),
                                        status: "idle",
                                        fighter1Id: '',
                                        fighter2Id: '',
                                        score1: '',
                                        score2: ''
                                    },
                                    {
                                        fightId: uuidv4(),
                                        status: "idle",
                                        fighter1Id: '',
                                        fighter2Id: '',
                                        score1: '',
                                        score2: ''
                                    },
                                ]
                    },
                    {
                        RoundId: uuidv4(),
                        RoundName: "1/6 финала",
                        fights: [
                                    {
                                        fightId: uuidv4(),
                                        status: "idle",
                                        fighter1Id: '',
                                        fighter2Id: '',
                                        score1: '',
                                        score2: ''
                                    },
                                    {
                                        fightId: uuidv4(),
                                        status: "idle",
                                        fighter1Id: '',
                                        fighter2Id: '',
                                        score1: '',
                                        score2: ''
                                    },
                                    {
                                        fightId: uuidv4(),
                                        status: "idle",
                                        fighter1Id: '',
                                        fighter2Id: '',
                                        score1: '',
                                        score2: ''
                                    },
                                ]
                    },
                    {
                        RoundId: uuidv4(),
                        RoundName: "1/12 финала",
                        fights: [
                                    {
                                        fightId: uuidv4(),
                                        status: "idle",
                                        fighter1Id: '',
                                        fighter2Id: '',
                                        score1: '',
                                        score2: ''
                                    },
                                    {
                                        fightId: uuidv4(),
                                        status: "idle",
                                        fighter1Id: '',
                                        fighter2Id: '',
                                        score1: '',
                                        score2: ''
                                    },
                                    {
                                        fightId: uuidv4(),
                                        status: "idle",
                                        fighter1Id: '',
                                        fighter2Id: '',
                                        score1: '',
                                        score2: ''
                                    },
                                    {
                                        fightId: uuidv4(),
                                        status: "idle",
                                        fighter1Id: '',
                                        fighter2Id: '',
                                        score1: '',
                                        score2: ''
                                    },
                                    {
                                        fightId: uuidv4(),
                                        status: "idle",
                                        fighter1Id: '',
                                        fighter2Id: '',
                                        score1: '',
                                        score2: ''
                                    },
                                    {
                                        fightId: uuidv4(),
                                        status: "idle",
                                        fighter1Id: '',
                                        fighter2Id: '',
                                        score1: '',
                                        score2: ''
                                    },
                                ]
                    },
                ];
                break;
                case '32':
                    nominationRounds = [
                        {
                            RoundId: uuidv4(),
                            RoundName: "Финал",
                            fights: [
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                    ]
                        },
                        {
                            RoundId: uuidv4(),
                            RoundName: "Полуфинал",
                            fights: [
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                    ]
                        },
                        {
                            RoundId: uuidv4(),
                            RoundName: "1/4 финала",
                            fights: [
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                    ]
                        },
                        {
                            RoundId: uuidv4(),
                            RoundName: "1/8 финала",
                            fights: [
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                    ]
                        },
                        {
                            RoundId: uuidv4(),
                            RoundName: "1/16 финала",
                            fights: [
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                        {
                                            fightId: uuidv4(),
                                            status: "idle",
                                            fighter1Id: '',
                                            fighter2Id: '',
                                            score1: '',
                                            score2: ''
                                        },
                                    ]
                        },
                    ]; 
                    break;
                default: break;
            }

            const newElimination = {
                eliminationType: eliminationType,
                nomination: activeNomination,
                rounds: nominationRounds
            }



            let eliminationIndex = eliminations.indexOf(eliminations.find(item => item.nomination === activeNomination))

            if(eliminationIndex === -1){
                eliminationIndex = eliminations.length;
            }

            set(ref(database, 'eliminations/' + eliminationIndex), newElimination)
        }
    }

    const onSetFight = (fightId, fighterId, fighterIndex) => {

        const round = filtredElimination[0].rounds[filtredElimination[0].rounds.length-1];

        const oldFight = round.fights.find(item => item.fightId === fightId)

        let newFighter1Id = oldFight.fighter1Id;
        let newFighter2Id = oldFight.fighter2Id;

        fighterIndex === '1'? newFighter1Id = fighterId :  newFighter2Id = fighterId;

        const newFight = {
            fightId: oldFight.fightId,
            status: oldFight.status,
            fighter1Id: newFighter1Id,
            fighter2Id: newFighter2Id,
            score1: oldFight.score1,
            score2: oldFight.score2
        };

        let eliminationIndex = eliminations.indexOf(eliminations.find(item => item.nomination === activeNomination));
        if(eliminationIndex === -1){
            eliminationIndex = eliminations.length;
        }

        const roundsIndex = filtredElimination[0].rounds.indexOf(round);

        const fightIndex = filtredElimination[0].rounds[roundsIndex].fights.indexOf(oldFight);

        set(ref(database, 'eliminations/' + eliminationIndex + '/rounds/' + roundsIndex + '/fights/' + fightIndex), newFight)
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

    filtredFighters =  filtredFighters.filter(item =>  unfiltredFighters.includes(item.id));

    unfiltredFighters = [];

    let roundsFights;

    if(filtredElimination){
        if(filtredElimination[0]){
            roundsFights = filtredElimination[0].rounds[filtredElimination[0].rounds.length-1].fights;
            for(let item in roundsFights){
                for(let i in filtredFighters){
                    if(roundsFights[item].fighter1Id === filtredFighters[i].id || roundsFights[item].fighter2Id === filtredFighters[i].id){
                        unfiltredFighters.push(filtredFighters[i].id);
                    }
                }
            }
        }
    }

    filtredFighters =  filtredFighters.filter(item =>  !unfiltredFighters.includes(item.id));

    const elements = renderFighters(filtredFighters);



    return(
        <div className="admin__addForm">
                <div>Тип сетки:</div>
                <ButtonGroup>
                    <Button onClick={() => onSetElimination('8')}>8</Button>
                    <Button onClick={() => onSetElimination('12')}>12</Button>
                    <Button onClick={() => onSetElimination('16')}>16</Button>
                    <Button onClick={() => onSetElimination('24')}>24</Button>
                    <Button onClick={() => onSetElimination('32')}>32</Button>
                </ButtonGroup>
                <div className="fighter__container">
                    <div>Бойцы:</div>
                    {elements}
                </div>
            </div>
    )
}

export default EliminationAddForm;