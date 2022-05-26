import Elemination from "../elemination/Elemination";
import AppHeader from "../appHeader/AppHeader";
import Tabs from "../tabs/Tabs";

const Playoff = () => {
    return (    
        <div className="app">
        <AppHeader/>
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