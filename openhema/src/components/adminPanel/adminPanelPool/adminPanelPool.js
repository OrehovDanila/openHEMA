import { Button, ButtonGroup, CloseButton } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useState } from "react";
import AdminPoolFight from "./adminPoolFight";

const AdminPanelPool = ( {poolName, fights, fighters, onDelete, index, onFighterDelete, setFights, poolId, onEditionButton}) => {

    const allFighters = useSelector(state => state.fighters.fighters);
    const [toogleFighters, setToogleFighters] = useState(false);
    const [toogleEdition, setToogleEdition] = useState(false);

    const onEditionButtonPool = (fightIndex, counter) => {
        onEditionButton(poolId, fightIndex, counter)
    }


    const renderFights = (arr) => {
        return arr.map((item, i) => {
            const fighter1id = item.fighter1Id;
            const fighter1 = allFighters.find((item) => item.id ===fighter1id).name;
            const fighter2id = item.fighter2Id;
            const fighter2 = allFighters.find((item) => item.id ===fighter2id).name;
            return(
                <AdminPoolFight key={item.fightId} fighter1={fighter1} fighter2={fighter2} toogleEdition={toogleEdition} onEditionButton={onEditionButtonPool} index={i}/>
            )
        })
    }



    const renderFighters = (arr) => {
        return arr.map((item) => {
            const fighterId = item;
            const fighterName = allFighters.find((item) => item.id === fighterId).name;

            return(
                <div key={fighterId} className="admin__item__fight">
                    {fighterName}
                    <CloseButton onClick={() => onFighterDelete(index, fighterId)} id='closeButton'/>
                </div>
            )
        })
    };


    const elements = toogleFighters? 
        fighters?  renderFighters(fighters) :'Бойцов нет' :
        fights? renderFights(fights) : 'Боёв нет';


    const generButton = toogleFighters? 
        <Button onClick={() => setFights(poolId)}>Сгенерировать бои</Button> :
        <Button onClick={() => setToogleEdition(!toogleEdition)}>Редактировать</Button>

    

    return(
        <div  className="admin__item">
            <span>{poolName}</span>
            <span>Бои</span>
            <div className="admin__item__fights">
                {elements}
            </div>
            <ButtonGroup>
                {generButton}
                <Button onClick={() => setToogleFighters(!toogleFighters)}>Бои/Бойцы</Button>
                <Button onClick={() => {onDelete(index)}}>Удалить</Button>
            </ButtonGroup>
        </div>
    )
}

export default AdminPanelPool;