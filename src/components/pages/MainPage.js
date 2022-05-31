import Pools from "../pools/Pools";
import AppHeader from "../appHeader/AppHeader";
import Tabs from "../tabs/Tabs";
import ModalWindow from "../modal/Modal";

//Страница для вывода групп. По совместительству стартовая страница.

const MainPage = () => {
    return (
        <div className="app">
        <AppHeader/>
        <ModalWindow/>
        <main>
          <Tabs/>
            <div className="nomination__container">
                 <Pools />
            </div>
        </main>
      </div>
    )
};

export default MainPage;