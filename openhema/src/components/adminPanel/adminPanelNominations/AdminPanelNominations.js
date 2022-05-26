import { CloseButton  } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { nominationsFetched, poolsFetched, eleminationsFetched } from "../../../actions";

const AdminPanelNominations = () => {

    const dispatch = useDispatch();
    const database = getDatabase();
    const nominations = useSelector(state => state.nominations.nominations);
    const pools = useSelector(state => state.pools.pools);
    const eleminations = useSelector(state => state.eleminations.eleminations);
    const nominationsLoadingStatus = useSelector(state => state.nominations.nominationsLoadingStatus);

    const nominationRef = ref(database, 'nominations');
    const poolsRef = ref(database, 'pools');
    const eleminationsRef = ref(database, 'eleminations');

    useEffect(() => {

        // подписываемся на обновления Readltime database когда компонент отрендерился 

        const unsubNominations = onValue(nominationRef, (snapshot) => {
            const data = snapshot.val();
            dispatch(nominationsFetched(data));
        })

        return function cleanup() {
            //Отписка по удалению компонента
            console.log('отписка номинаций')
            unsubNominations();
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {

        // подписываемся на обновления Readltime database когда компонент отрендерился 

        const unsubPools = onValue(poolsRef, (snapshot) => {
            const data = snapshot.val();
            dispatch(poolsFetched(data));
        })

        return function cleanup() {
            //Отписка по удалению компонента
            console.log('отписка пулов')
            unsubPools();
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {

        // подписываемся на обновления Readltime database когда компонент отрендерился 

        const unsubEleminations = onValue(eleminationsRef, (snapshot) => {
            const data = snapshot.val();
            dispatch(eleminationsFetched(data));
        })

        return function cleanup() {
            //Отписка по удалению компонента
            console.log('отписка пулов')
            unsubEleminations();
        }
        // eslint-disable-next-line
    }, []);

    if (nominationsLoadingStatus === "loading") {
        return <h5 className="text-center mt-5">Загрузка групп</h5>
    } else if (nominationsLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки групп</h5>
    }

    const onDelete = (id) => {
        if(window.confirm('Вы точно хотите удалить номинацию? Это приведёт к удалению всех групп и сетки плейофф с сервера')){
            const newNomintions = nominations.slice();
            newNomintions.splice(id,1);
            let newPools = pools.slice();
            newPools = newPools.filter((item) => item.nomination !== nominations[id].label);
            let newEleminations = eleminations.slice();
            newEleminations = newEleminations.filter((item) => item.nomination !== nominations[id].label);

            set(nominationRef, newNomintions);
            set(poolsRef, newPools);
            set(eleminationsRef, newEleminations);
        }
    };

    const renderNominations = (arr) => {
        return arr.map((item, i) =>{
            return(
                <div key={item.id} className="admin__item">
                    <span>{item.label}</span>
                    <CloseButton id="closeButton" onClick={()=>onDelete(i)}/>
                </div>
            )
        })
    };

    const elements = renderNominations(nominations);

    return(
        
        <div className="admin__items">
           {elements}
        </div>

    )
}

export default AdminPanelNominations;