import tournamentLogo from "../../resources/icon.jpg";
import './appHeader.scss';

const appHeader = () => {
    return (
        <header className="app__header">
            <img src={tournamentLogo} alt="Tournament logo"/>
            <div className="app__title">
                <h1>Открытый золотолесский турнир по дуэльному фехтованию</h1>
            </div>
            <nav className="app__menu">
                <ul>
                    <li><a href='#'>Группы</a></li>
                    /
                    <li><a href='#'>Плейофф</a></li>
                </ul>
            </nav>
            <button type="button" className="btn btn-warning app__login__button">Login</button>
        </header>
    )
};

export default appHeader;