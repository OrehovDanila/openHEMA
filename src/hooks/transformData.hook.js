//Хук для преобразования данных с сервера для удобного рендера

export const useTransformData = () => {

    const getFighterOptionById = (id, array, option) => {
        for (let item of array) {
            if (id === item.id) {
                return item[option];
            }
        }
    };

    const transformFights = (arr, fighters) => {
        return arr.map((item) => {
            return {
                name1: getFighterOptionById(item.fighter1Id, fighters, 'name'),
                name2: getFighterOptionById(item.fighter2Id, fighters, 'name'),
                club1: getFighterOptionById(item.fighter1Id, fighters, 'club'),
                club2: getFighterOptionById(item.fighter2Id, fighters, 'club'),
                score1: item.score1,
                score2: item.score2,
                status: item.status,
                fightId: item.fightId
            }
        });
    };
    
    const transformScoreboardData = (activePoolValue, fighters, activeFightId) => {

        let FightInfo = {
            fightId: '',
            status: '',
            score1: '',
            score2: '',
            fighter1id: '',
            fighter2id: '',
            nextFightId: ''
        }
    
        if(activePoolValue.fights.find((item) => item.fightId === activeFightId)) {
            FightInfo = {
                fightId: activeFightId,
                status: activePoolValue.fights.find((item) => item.fightId === activeFightId).status,
                score1: activePoolValue.fights.find((item) => item.fightId === activeFightId).score1,
                score2: activePoolValue.fights.find((item) => item.fightId === activeFightId).score2,
                fighter1id: activePoolValue.fights.find((item) => item.fightId === activeFightId).fighter1Id,
                fighter2id: activePoolValue.fights.find((item) => item.fightId === activeFightId).fighter2Id,
                nextFightId: activeFightId + 1 
            }
        }
    
        
    
        let nextFight = {
            fighter1id: '',
            fighter2id: ''
        };
    
        if(activePoolValue.fights.find((item) => item.fightId === FightInfo.nextFightId)){
            nextFight = {
                fighter1id: activePoolValue.fights.find((item) => item.fightId === FightInfo.nextFightId).fighter1Id,
                fighter2id: activePoolValue.fights.find((item) => item.fightId === FightInfo.nextFightId).fighter2Id,
            }
        };
    
        let fighter1 = {
            name: '',
            club: '',
            nextName: ''
        };
    
        if(fighters.find((item) => item.id === FightInfo.fighter1id)) {
            fighter1.name = fighters.find((item) => item.id === FightInfo.fighter1id).name;
            fighter1.club = fighters.find((item) => item.id === FightInfo.fighter1id).club;
        }
    
    
        if(fighters.find((item) => item.id === nextFight.fighter1id)) {
            fighter1.nextName = fighters.find((item) => item.id === nextFight.fighter1id).name;
        }
    
    
        let fighter2 = {
            name: '',
            club: '',
            nextName: ''
        };
    
        if(fighters.find((item) => item.id === FightInfo.fighter2id)) {
            fighter2.name = fighters.find((item) => item.id === FightInfo.fighter2id).name;
            fighter2.club = fighters.find((item) => item.id === FightInfo.fighter2id).club;
        }
    
        if(fighters.find((item) => item.id === nextFight.fighter2id)) {
            fighter2.nextName = fighters.find((item) => item.id === nextFight.fighter2id).name;
        };



        return {
                fightId: activeFightId,
                status: FightInfo.status,
                score1: FightInfo.score1,
                score2: FightInfo.score2,
                fighter1: {
                    id: FightInfo.fighter1id,
                    name: fighter1.name,
                    club: fighter1.club,
                    nextName: fighter1.nextName
                },
                fighter2: {
                    id: FightInfo.fighter2id,
                    name: fighter2.name,
                    club: fighter2.club,
                    nextName: fighter2.nextName
                },

        }
    };

    return { transformFights, transformScoreboardData }
}