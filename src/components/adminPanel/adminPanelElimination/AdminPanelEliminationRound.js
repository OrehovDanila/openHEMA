import { Button } from "react-bootstrap";
import { useState } from "react";
import AdminPanelEliminationFight from "./AdminPanelEliminationFight";

//Дамб-компонент для рендера раунда плейофф

const AdminPanelEliminationRound = ({RoundId, RoundName, fights, onDeleteFighter, onPromoteFighter}) => {


    const [toogleEdition, setToogleEdition] = useState(false);


    const renderFights = (arr) => {
        return arr.map((item, i) => {

            return(
                <AdminPanelEliminationFight 
                    fightId={item.fightId} 
                    fighter1Id={item.fighter1Id} 
                    fighter2Id={item.fighter2Id} 
                    toogleEdition={toogleEdition} 
                    onDeleteFighter={onDeleteFighter} 
                    onPromoteFighter={onPromoteFighter}
                    fightIndex={i}
                    RoundId={RoundId}/>
            )
        })
    }

    const renderButtons = () => {
        if(RoundName === 'Финал трёх' || RoundName === 'Финал'){
            return null;
        } else {
            return(
                <Button onClick={() => setToogleEdition(!toogleEdition)}>Редактировать</Button>
            )
        }
    }



    const elements = renderFights(fights);
    const buttonElements = renderButtons();

    return(
        <div key={RoundId} className="admin__item">
            <span>{RoundName}</span>
            <span>Бои</span>
            <div className="admin__item__fights">
                {elements}
            </div>
            {buttonElements}
        </div>
    )
}

export default AdminPanelEliminationRound;