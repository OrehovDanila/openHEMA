import { lazy } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { initializeApp } from "firebase/app";


import { MainPage, Playoff, ScoreboardPage, ScoreboardControlPage, AdminPanelEleminationPage, AdminPanelFightersPage, AdminPanelNominationPage, AdminPanelPoolsPage } from '../pages';

import "../../style/style.scss"

const Page404 = lazy(() => import('../pages/404'));


const App = () => {

  const firebaseConfig = {
    apiKey: "AIzaSyCYvaTL9aeELsjPM3ZlMp0OpIJIX-AGF6w",
    authDomain: "openhema-588db.firebaseapp.com",
    databaseURL: "https://openhema-588db-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "openhema-588db",
    storageBucket: "openhema-588db.appspot.com",
    messagingSenderId: "277209754754",
    appId: "1:277209754754:web:f7ec28ec6c845b8897d89b"
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
