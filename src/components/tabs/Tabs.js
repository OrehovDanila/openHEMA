import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import classNames from 'classnames';
import { getDatabase, ref, onValue } from 'firebase/database'

import { nominationChanges, nominationsFetched } from './nominationsSlice';

import './tabs.scss'

//Смарт-компонент для работы с номинациями и их выбором

const Tabs = () => {

    const nominationsLoadingStatus = useSelector(state => state.nominations.nominationsLoadingStatus);
    const nominations = useSelector(state => state.nominations.nominations);
    const activeNomination = useSelector(state => state.nominations.activeNomination);


    const dispatch = useDispatch();

    const database = getDatabase();

    const nominationRef = ref(database, 'nominations');

    useEffect(() => {

        // подписываемся на обновления Readltime database когда компонент отрендерился 

        const unsubNominations = onValue(nominationRef, (snapshot) => {
            const data = snapshot.val();
            dispatch(nominationsFetched(data));
        })

        return function cleanup() {
            //Отписка по удалению компонента
            unsubNominations();
        }
        // eslint-disable-next-line
    }, []);


    const onSelectTab = (e, id) => {
        e.preventDefault();
        dispatch(nominationChanges(id));
    };

    if (nominationsLoadingStatus === "loading") {
        return <h5 className="text-center mt-5">Загрузка групп</h5>
    } else if (nominationsLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки групп</h5>
    }
    

    const renderTabs = (arr) => {
      
        return arr.map((item) => {

            const tabClass = classNames('tab', {'tab_active': item.label === activeNomination});
            
            return <li key={item.id} className={tabClass} onClick={(e) => onSelectTab(e, item.label)}>
                     <p>{item.label}</p>
                    </li>
        })
    };

    const elements = renderTabs(nominations)

    return(
        <ul className="tab__container">
            {elements}
        </ul>
    )
};

export default Tabs;