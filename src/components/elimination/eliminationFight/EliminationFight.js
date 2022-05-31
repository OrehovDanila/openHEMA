//Дамб-компонент для рендера боя плейофф

const EliminationFight = ({name1, name2, score1, score2, status}) => {

    let FightStatus1 = '',
        FightStatus2 = '';

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

    return (
        <ul className="matchup">
            <li className="team team-top">{name1}<span className={`score ${FightStatus1}`}>{score1}</span></li>
            <li className="team team-bottom">{name2}<span className={`score ${FightStatus2}`}>{score2}</span></li>
        </ul>
    )
}

export default EliminationFight;