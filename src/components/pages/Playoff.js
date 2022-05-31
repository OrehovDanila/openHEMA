import Elimination from "../elimination/Elimination";
import AppHeader from "../appHeader/AppHeader";
import Tabs from "../tabs/Tabs";
import ModalWindow from "../modal/Modal";

//Страница для вывода плейофф

const Playoff = () => {
    return (    
        <div className="app">
        <AppHeader/>
        <ModalWindow/>
        <main>
          <Tabs/>
            <div className="nomination__container">
                 <Elimination />
            </div>
        </main>
      </div>
    )
};

export default Playoff;