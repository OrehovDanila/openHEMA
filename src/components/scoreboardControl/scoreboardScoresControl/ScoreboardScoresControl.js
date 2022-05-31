import { Button, ButtonGroup } from "react-bootstrap";

//Дамб-компонент для кнопок для увелечения или уменьшения очков

const ScoreboardScoresControl = ({variant, onChangeScore, position}) => {
    return(
        <div className="control__group1">
            <ButtonGroup  className="me-2">
                <Button variant={variant} size="lg" onClick={() => onChangeScore(-1, position)}>-1</Button>
                <Button variant={variant} size="lg" onClick={() => onChangeScore(1, position)}>+1</Button>
            </ButtonGroup>
        </div>
    )
}

export default ScoreboardScoresControl;