import { Button, ButtonGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { scoreboardChanges } from "../scoreboard/scoreboardsSlice";
import { authToogle } from "../../modal/modalSlice";
import { NavLink } from "react-router-dom";

//Хэдер для табло. Убирается при фуллскрине

const ScoreboardHeader = () => {

    const dispatch = useDispatch();

    return(
        <header className="scoreboard_header scoreboard_header_big">
                <ButtonGroup className="app__buttonGroup">
                    <NavLink type="button" className="btn btn-warning" to="/">Таблицы</NavLink>
                    <NavLink type="button" className="btn btn-warning" to="/scoreboard">Табло</NavLink>
                    <NavLink type="button" className="btn btn-warning" to="/scoreboard-control">Управление таблом</NavLink>
                    <Button type="button" className="btn btn-warning" to="/admin-panel/nominations">Админка</Button>
                    <Button type="button" className="btn btn-warning" onClick={() => dispatch(authToogle())}>Выход</Button>
                </ButtonGroup>

                <div className="control__button__group__scoreboardID">
                    <h5>Номер табло</h5>
                    <ButtonGroup className="me-2">
                        <Button onClick={() => dispatch(scoreboardChanges(0))} variant="success">1</Button>
                        <Button onClick={() => dispatch(scoreboardChanges(1))} variant="success">2</Button>
                        <Button onClick={() => dispatch(scoreboardChanges(2))} variant="success">3</Button> 
                        <Button onClick={() => dispatch(scoreboardChanges(3))} variant="success">4</Button>
                    </ButtonGroup>
                </div>
        </header>
    )
}

export default ScoreboardHeader;