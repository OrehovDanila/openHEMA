import Elemination from "../elemination/Elemination";
import AppHeader from "../appHeader/AppHeader";
import Tabs from "../tabs/Tabs";
import ModalWindow from "../modal/Modal";

const Playoff = () => {
    return (    
        <div className="app">
        <AppHeader/>
        <ModalWindow/>
        <main>
          <Tabs/>
            <div className="nomination__container">
                 <Elemination />
            </div>
        </main>
      </div>
    )
};

export default Playoff;