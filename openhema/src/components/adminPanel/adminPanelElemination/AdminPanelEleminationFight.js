import { useSelector } from "react-redux";
import { Button, ButtonGroup } from "react-bootstrap";

const AdminPanelEleminationFight = ({fightId, fighter1Id, fighter2Id, toogleEdition, onDeleteFighter, onPromoteFighter, fightIndex, RoundId}) => {

    const fighters = useSelector(state => state.fighters.fighters)

    const buttonsElements1 = toogleEdition? 
    <ButtonGroup>
        <Button className="small_button" onClick={() => onDeleteFighter(fightId, fighter1Id, RoundId)}>&#9587;</Button>
        <Button className="small_button" onClick={() => onPromoteFighter(fightIndex, fighter1Id, RoundId)}>&#11166;</Button>
    </ButtonGroup> : null;

    const buttonsElements2 = toogleEdition? 
    <ButtonGroup>
        <Button className="small_button" onClick={() => onDeleteFighter(fightId, fighter2Id, RoundId)}>&#9587;</Button>
        <Button className="small_button" onClick={() => onPromoteFighter(fightIndex, fighter2Id, RoundId)}>&#11166;</Button>
    </ButtonGroup> : null;

    let fighter1 = '';
    let fighter2 = '';


    if(fighter1Id !== ''){
        fighter1 = fighters.find((item) => item.id ===fighter1Id).name;
    };

    if(fighter2Id !== ''){
        fighter2 = fighters.find((item) => item.id ===fighter2Id).name;
    };

    return(
        <div key={fightId} className="admin__item__fight">
            <div className="admin__item__fight__container">
                <div>{fighter1}</div>
                {buttonsElements1}
            </div>
            <div className="admin__item__fight__container">
                <div>{fighter2}</div>
                {buttonsElements2}
            </div>
        </div>
    )
}

export default AdminPanelEleminationFight;