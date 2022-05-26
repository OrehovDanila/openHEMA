import { Button, Form, Row, Col } from "react-bootstrap";
import { useState } from 'react';
import { getDatabase, ref, set } from 'firebase/database'
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from "react-redux";

const NominationsAddForm = () => {

    const database = getDatabase();
    const [nominationName, setNominationName] = useState('');

    const nominations = useSelector(state => state.nominations.nominations);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const newNominations = nominations.slice();

        const nominationData = {
            label: nominationName,
            id: uuidv4()
        }

        newNominations.push(nominationData)

        setNominationName('');

        return set(ref(database, 'nominations'), newNominations);
    }


    return(
        <div className="admin__addForm">
                <Form className="mb-3" onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <Form.Label>Введите номинацию</Form.Label>
                        </Col>
                        <Col xs={7}>
                            <Form.Control 
                            type="text"
                            placeholder="Номинация"
                            value={nominationName}
                            onChange={(e) => setNominationName(e.target.value)}></Form.Control>
                        </Col>
                        <Col>
                            <Button variant="primary" type="submit">Ввод</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
    )
}

export default NominationsAddForm;