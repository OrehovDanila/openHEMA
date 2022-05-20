import { NavLink } from 'react-router-dom';
import { Modal, Button, Form, ButtonGroup } from 'react-bootstrap';
import { useDispatch, useSelector} from 'react-redux';
import { useState } from 'react';
import { getDatabase, ref, get } from 'firebase/database';


import { modalToogle } from '../../actions';
import { authToogle, authError } from '../../actions';

import tournamentLogo from "../../resources/icon.jpg";
import './appHeader.scss';




const AppHeader = () => {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const showModal = useSelector(state => state.modal.showModal);
    const auth = useSelector(state => state.auth.auth);
    const dispatch = useDispatch();

    const database = getDatabase();



    const handleSubmit  = (e) => {
        e.preventDefault();

        get(ref(database, 'users')).then((snapshot) => {
            if(snapshot.exists()){
                const data = snapshot.val()
                data.forEach((item) => {
                    console.log(`${item.login} === ${username}`)
                    console.log(`${item.password} === ${password}`)
                    if(item.login === username && item.password === password){
                        dispatch(authToogle());
                        dispatch(modalToogle());
                    } else alert('Ошибка доступа!');
                })
            } else dispatch(authError())

        })
    }

    const renderButtons = (auth) => {
        if(auth) {
            return (
                <ButtonGroup className="app__buttonGroup">
                    <NavLink end type="button" className="btn btn-warning" to="/">Таблицы</NavLink>
                    <NavLink type="button" className="btn btn-warning" to="/scoreboard">Табло</NavLink>
                    <NavLink type="button" className="btn btn-warning" to="/scoreboard-control/pools">Управление таблом</NavLink>
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
            
            <Modal show={showModal} onHide={() => {dispatch(modalToogle())}}>
                <Modal.Header closeButton>
                <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form onSubmit={(e) => handleSubmit (e)}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Login</Form.Label>
                        <Form.Control type="text" placeholder="Enter Login" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>

                    <Button variant="primary" type="submit" >
                        Submit
                    </Button>

                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => {dispatch(modalToogle())}}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>

        </header>
    )
};

export default AppHeader;