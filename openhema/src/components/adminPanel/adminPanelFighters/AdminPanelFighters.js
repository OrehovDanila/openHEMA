import { CloseButton, } from "react-bootstrap";
import { getDatabase, ref, onValue, set } from 'firebase/database'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { fightersFetched } from "../../../actions"

const AdminPanelFighters = () => {

    const dispatch = useDispatch();
    const database = getDatabase();
    const fighters = useSelector(state => state.fighters.fighters)
    const fightersLoadingStatus = useSelector(state => state.fighters.fightersLoadingStatus);

    const fightersRef = ref(database, 'fighters');

    useEffect(() => {

        // подписываемся на обновления Readltime database когда компонент отрендерился 

        const unsubFighters = onValue(fightersRef, (snapshot) => {
            const data = snapshot.val();
            dispatch(fightersFetched(data));
        })

        return function cleanup() {
            //Отписка по удалению компонента
            console.log('отписка бойцов')
            unsubFighters();
        }
        // eslint-disable-next-line
    }, []);

    if (fightersLoadingStatus === "loading") {
        return <h5 className="text-center mt-5">Загрузка бойцов</h5>
    } else if (fightersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки бойцов</h5>
    };

    const onDelete = (id) => {
        const newFighters = fighters.slice();
        newFighters.splice(id,1);
        set(ref(database, 'fighters'), newFighters);
    };

    const renderFighters = (arr) => {
        return arr.map((item, i) => {
            return(
                <div key={item.id} className="admin__item">
                    <span>{item.name}</span>
                    <span>{item.club}</span>
                    <CloseButton id="closeButton" onClick={() => onDelete(i)}/>
                </div>
            )
        })
    }

    const fightersElement = renderFighters(fighters);


    return(
            <div className="admin__items">
                {fightersElement}
            </div>
    )
}

export default AdminPanelFighters;