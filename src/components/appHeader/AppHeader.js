import { NavLink } from 'react-router-dom';
import {  Button,  ButtonGroup } from 'react-bootstrap';
import { useDispatch, useSelector} from 'react-redux';

import {modalToogle, authToogle} from "../modal/modalSlice"

import tournamentLogo from "../../resources/icon.jpg";
import './appHeader.scss';

// Хэдер страницы для пользователей. 

const AppHeader = () => {

    const auth = useSelector(state => state.authModal.auth);
    const dispatch = useDispatch();

    const renderButtons = (auth) => {
        if(auth) {
            return (
                <ButtonGroup className="app__buttonGroup">
                    <NavLink end type="button" className="btn btn-warning" to="/">Таблицы</NavLink>
                    <NavLink type="button" className="btn btn-warning" to="/scoreboard">Табло</NavLink>
                    <NavLink type="button" className="btn btn-warning" to="/scoreboard-control">Управление таблом</NavLink>
                    <NavLink type="button" className="btn btn-warning" to="/admin-panel/nominations">Админка</NavLink>
                    <Button type="button" className="btn btn-warning" onClick={() => dispatch(authToogle())}>Выход</Button>
                </ButtonGroup>
            )
        } else {
            return (
                <Button type="button" className="btn btn-warning app__login__button" onClick={() => {dispatch(modalToogle())}}>Login</Button>
            )
        }
    }

    const buttons = renderButtons(auth);

    return (
        <header className="app__header">
            <img src={tournamentLogo} alt="Tournament logo"/>
            <div className="app__title">
                <h1>Открытый золотолесский турнир по дуэльному фехтованию</h1>
            </div>
            <nav className="app__menu">
                <ul>
                    <li><NavLink
                     end
                     style={({ isActive }) => ({ color: isActive ? '#0C3F07' : 'inherit' })}
                     to="/">Группы</NavLink></li>
                    /
                    <li><NavLink
                     end
                     style={({ isActive }) => ({ color: isActive ? '#0C3F07' : 'inherit' })}
                     to="/playoff">Плейофф</NavLink></li>
                </ul>
            </nav>
            {buttons}
        </header>
    )
};

export default AppHeader;