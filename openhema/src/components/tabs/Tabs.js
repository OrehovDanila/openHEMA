import './tabs.scss'

const Tabs = () => {
    return(
        <ul className="tab__container">
            <li className="tab tab_active">
                <a href='#'>База Классика</a>
            </li>
            <li className="tab">
                <a href='#'>Женская Сабля</a>
            </li>
            <li className="tab">
                <a href='#'>Advanced длинный меч</a>
            </li>
        </ul>
    )
};

export default Tabs;