import { ButtonGroup, Button } from "react-bootstrap";

const AdminPoolFight = ({fighter1, fighter2, toogleEdition, onEditionButton, index}) => {

    const renderButton = () => {
        return(
            <ButtonGroup >
                <Button  onClick={() => onEditionButton(index,-1)} className="small_button">&#9650;</Button>
                <Button  onClick={() => onEditionButton(index,1)} className="small_button">&#9660;</Button>
            </ButtonGroup>
        )
    }

    const elements = toogleEdition? renderButton() : null

    return(
        <div  className="admin__item__fight">
            <div>{fighter1}</div>
            <div>{fighter2}</div>
            {elements}
        </div>
    )

}

export default AdminPoolFight;