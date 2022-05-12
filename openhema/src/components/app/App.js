import { lazy } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import AppHeader from "../appHeader/AppHeader";

import Tabs from "../tabs/Tabs";
import { MainPage, Playoff } from '../pages';

import "../../style/style.scss"

const Page404 = lazy(() => import('../pages/404'));


const App = () => {
  return (
    <Router>
      <div className="App">
        <AppHeader/>
        <main>
          <Tabs/>
          <div className="nomination__container">
              <Routes>
                <Route path="/" element={<MainPage />}/>
                <Route path="playoff" element={<Playoff />}/>
                <Route path="*" element={<Page404 />}/>
              </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
