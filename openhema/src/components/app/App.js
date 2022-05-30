import { lazy } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { initializeApp } from "firebase/app";


import { MainPage, Playoff, ScoreboardPage, ScoreboardControlPage, AdminPanelEleminationPage, AdminPanelFightersPage, AdminPanelNominationPage, AdminPanelPoolsPage } from '../pages';

import "../../style/style.scss"

const Page404 = lazy(() => import('../pages/404'));


const App = () => {

  const firebaseConfig = {
    //Firebase API Key
  };

  // eslint-disable-next-line
  const app = initializeApp(firebaseConfig);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />}/>
        <Route path="playoff" element={<Playoff />}/>
        <Route path="scoreboard" element={<ScoreboardPage />}/>
        <Route path="scoreboard-control" element={<ScoreboardControlPage />}/>
        <Route path="admin-panel/nominations" element={<AdminPanelNominationPage />}/>
        <Route path="admin-panel/fighters" element={<AdminPanelFightersPage />}/>
        <Route path="admin-panel/pools" element={<AdminPanelPoolsPage />}/>
        <Route path="admin-panel/elemination" element={<AdminPanelEleminationPage />}/>
        <Route path="*" element={<Page404 />}/>
      </Routes>
    </Router>
  );
}

export default App;
