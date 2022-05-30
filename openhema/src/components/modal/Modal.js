import { useState } from "react";
import { getDatabase, get, ref } from "firebase/database";
import { Form, Button, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";

import { authToogle, modalToogle, authError } from "../../actions";

const ModalWindow = () => {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const showModal = useSelector(state => state.modal.showModal);
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

    return(
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
    )
}

export default ModalWindow;