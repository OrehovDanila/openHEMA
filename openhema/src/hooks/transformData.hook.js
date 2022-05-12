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

    return { transformFights }
}