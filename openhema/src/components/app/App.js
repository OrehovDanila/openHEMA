import AppHeader from "../appHeader/AppHeader";
import Tabs from "../tabs/Tabs";
import Pools from "../pools/Pools";
import Elemination from "../elemination/Elemination";
import "../../style/style.scss"


const App = () => {



  return (
    

    <div className="App">
      <AppHeader/>
      <main>
        <Tabs/>
        <div className="nomination__container">
            <Pools/>
            {/* <Elemination/> */}
        </div>
      </main>
    </div>
  );
}

export default App;
