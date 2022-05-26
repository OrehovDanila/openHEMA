import { NavLink } from "react-router-dom";
import { Button, ButtonGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { authToogle } from "../../../actions"

import "../adminPanel.scss"

const AdminPanelHeader = () => {
    const dispatch = useDispatch();

    return(
        <div className="adminPanel__header">

            <h1 className="control__header__title">Панель Управления</h1>
            <ButtonGroup className="app__buttonGroup">
                <NavLink type="button" className="btn btn-warning" to="/">Таблицы</NavLink>
                <NavLink type="button" className="btn btn-warning" to="/scoreboard">Табло</NavLink>
                <NavLink type="button" className="btn btn-warning" to="/scoreboard-control/pools">Управление таблом</NavLink>
                <Button type="button" className="btn btn-warning" to="/admin-panel/nominations">Админка</Button>
                <Button type="button" className="btn btn-warning" onClick={() => dispatch(authToogle())}>Выход</Button>
            </ButtonGroup>

            <div className="control__button__group">
            <NavLink type="button" className="btn btn-success" to="/admin-panel/nominations">Номинации</NavLink>

            <NavLink type="button" className="btn btn-success" to="/admin-panel/fighters">Бойцы</NavLink>

            <NavLink type="button" className="btn btn-success" to="/admin-panel/pools">Группы</NavLink>

            <NavLink type="button" className="btn btn-success" to="/admin-panel/elemination">Плейофф</NavLink>
            </div>
            
        </div>
    )
};

export default AdminPanelHeader;