import { lazy } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { initializeApp } from "firebase/app";


import { MainPage, Playoff, ScoreboardPage, ScoreboardControlPoolsPage, ScoreboardControlEleminationPage } from '../pages';

import "../../style/style.scss"

const Page404 = lazy(() => import('../pages/404'));


const App = () => {

  const firebaseConfig = {
    // Firebase api config
  };

  const app = initializeApp(firebaseConfig);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />}/>
        <Route path="playoff" element={<Playoff />}/>
        <Route path="scoreboard" element={<ScoreboardPage />}/>
        <Route path="scoreboard-control/pools" element={<ScoreboardControlPoolsPage />}/>
        <Route path="scoreboard-control/eleminations" element={<ScoreboardControlEleminationPage />}/>
        <Route path="*" element={<Page404 />}/>
      </Routes>
    </Router>
  );
}

export default App;
