import { Modal } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

//Компонент ошибки авторизации

const AuthErrorModal = () => {

    const auth = useSelector(state => state.authModal.auth);

    const renderModal = (auth) => {
        if(!auth){
            return(
                <Modal show={!auth} fullscreen={true} >
                    <Modal.Header>
                        <Modal.Title>Ошибка Доступа</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Link style={{'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px'}} to="/">Возврат на главную</Link>
                    </Modal.Body>
                 </Modal>
            )
        } else return null
    }

    const elements = renderModal(auth);

    return(
        <>
            {elements}
        </>
    )
}

export default AuthErrorModal;