import { Button, ButtonGroup, CloseButton } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useState } from "react";
import AdminPoolFight from "./adminPoolFight";

const AdminPanelPool = ( {poolName, fights, fighters, onDelete, index, onFighterDelete, setFights, poolId, onEditionButton}) => {

    const allFighters = useSelector(state => state.fighters.fighters);
    const [toogleFighters, setToogleFighters] = useState(false);
    const [toogleEdition, setToogleEdition] = useState(false);
    const [selectedFight, setSelectedFight] = useState();

    const onEditionButtonPool = (fightIndex, counter) => {
        onEditionButton(poolId, fightIndex, counter);
        setSelectedFight(selectedFight+counter);
    }

    const onFightClick = (fightIndex) => {
        if(toogleEdition){
            setSelectedFight(fightIndex);
        } else {
            setSelectedFight(null);
        }
    }


    const renderFights = (arr) => {
        return arr.map((item, i) => {
            const fighter1id = item.fighter1Id;
            const fighter1 = allFighters.find((item) => item.id ===fighter1id).name;
            const fighter2id = item.fighter2Id;
            const fighter2 = allFighters.find((item) => item.id ===fighter2id).name;
            const className = selectedFight === i? 'admin__item__fight_selected': '';

            return(
                <AdminPoolFight 
                key={item.fightId} 
                fighter1={fighter1} 
                fighter2={fighter2} 
                className={className} 
                onFightClick={onFightClick}
                fightIndex={i}/>
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

    const renderButton = (toogleFighters, toogleEdition) => {
        if(toogleFighters) {
            return(
                <ButtonGroup>
                    <Button onClick={() => setFights(poolId)}>Сгенерировать бои</Button>
                    <Button onClick={() => setToogleFighters(!toogleFighters)}>Бои/Бойцы</Button>
                    <Button onClick={() => {onDelete(index)}}>Удалить</Button>
                </ButtonGroup>
            )
        } else if(toogleEdition){
            return(
                <ButtonGroup>
                    <Button onClick={() => {
                        setToogleEdition(!toogleEdition);
                        setSelectedFight(null);
                        }}>Редактировать</Button>
                    <Button  onClick={() => onEditionButtonPool(selectedFight,-1)} >&#9650;</Button>
                    <Button  onClick={() => onEditionButtonPool(selectedFight,1)} >&#9660;</Button>
                    <Button onClick={() => setToogleFighters(!toogleFighters)}>Бои/Бойцы</Button>
                    <Button onClick={() => {onDelete(index)}}>Удалить</Button>
                </ButtonGroup>
            )
        } else{
            return(
                <ButtonGroup>
                    <Button onClick={() => setToogleEdition(!toogleEdition)}>Редактировать</Button>
                    <Button>&#9650;</Button>
                    <Button>&#9660;</Button>
                    <Button onClick={() => setToogleFighters(!toogleFighters)}>Бои/Бойцы</Button>
                    <Button onClick={() => {onDelete(index)}}>Удалить</Button>
                </ButtonGroup>
            )
        }
    };


    const elements = toogleFighters? 
        fighters?  renderFighters(fighters) :'Бойцов нет' :
        fights? renderFights(fights) : 'Боёв нет';
    
    const buttonsElements = renderButton(toogleFighters, toogleEdition);

    return(
        <div  className="admin__item">
            <span>{poolName}</span>
            <span>Бои</span>
            <div className="admin__item__fights">
                {elements}
            </div>
            {buttonsElements}
        </div>
    )
}

export default AdminPanelPool;