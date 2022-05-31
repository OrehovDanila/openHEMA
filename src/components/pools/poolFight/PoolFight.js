//Дамб-компонент для рендера боя группы

const PoolFight = ({name1, name2, club1, club2, score1, score2, status, poolStatus}) => {

    let FightStatus1 = '',
        FightStatus2 = '';

    //Свитч для изменения стилей при победе или ничьей

    switch(status){
        case 'winner1':
            FightStatus1 = 'winner';
            break;
        case 'winner2':
            FightStatus2 = 'winner';
            break;
        case 'draw': 
            FightStatus1 = 'draw';
            FightStatus2 = 'draw';
            break;
        default:
            break;        
    }


    return(
        <div className={`pool__fight ${poolStatus}`}>
            <div className="pool__fighter">
                <div className="pool__fighter__title">
                    <div className="pool__fighter__name">{name1}</div>
                    <div className="pool__fighter__club">{club1}</div>
                </div>
                <div className={`scores ${FightStatus1}`}>{score1}</div>
            </div>
            <div className="pool__fighter right  right">
            <div className="pool__fighter__title">
                    <div className="pool__fighter__name">{name2}</div>
                    <div className="pool__fighter__club">{club2}</div>
                </div>
                <div className={`scores ${FightStatus2}`}>{score2}</div>
            </div>
        </div>
    )
}

export default PoolFight;