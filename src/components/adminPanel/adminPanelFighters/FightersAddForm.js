import { Button, Form, Row, Col } from "react-bootstrap";
import { useState } from 'react';
import { getDatabase, ref, set } from 'firebase/database'
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from "react-redux";

//Компонент для добавления бойцов

const FightersAddForm = () => {

    const database = getDatabase();
    const [fighterName, setFighterName] = useState('');
    const [fighterClub, setFighterClub] = useState('');

    const fighters = useSelector(state => state.fighters.fighters);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const newFighters = fighters.slice();

        const fighterData = {
            name: fighterName,
            club: fighterClub,
            id: uuidv4()
        }

        newFighters.push(fighterData)

        setFighterName('');
        setFighterClub('');

        return set(ref(database, 'fighters'), newFighters);
    }

    return(
        <div className="admin__addForm" onSubmit={handleSubmit}>
                <Form className="mb-3">
                    <Row>
                        <Col>
                            <Form.Label>Введите бойца</Form.Label>
                        </Col>
                        <Col xs={4}>
                            <Form.Control 
                            type="text" 
                            placeholder="Имя" 
                            value={fighterName} 
                            onChange={(e) => setFighterName(e.target.value)}
                            ></Form.Control>
                        </Col>
                        <Col xs={4}>
                            <Form.Control 
                            type="text" 
                            placeholder="Клуб"
                            value={fighterClub} 
                            onChange={(e) => setFighterClub(e.target.value)}
                            ></Form.Control>
                        </Col>
                        <Col>
                            <Button variant="primary" type="submit">Ввод</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
    )
};

export default FightersAddForm;