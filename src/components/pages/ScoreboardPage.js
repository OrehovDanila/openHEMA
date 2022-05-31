import AuthErrorModal from "../authError/AuthError";
import Scoreboard from "../scoreboard/scoreboard/Scoreboard";
import ScoreboardHeader from "../scoreboard/scoreboardHeader/ScoreboardHeader";

// Страница табло

const ScoreboardPage = () => {
    return (
        <div className="App">
            <ScoreboardHeader/>   
            <AuthErrorModal/>   
            <main>
                <Scoreboard />
            </main>
        </div>
    )
}

export default ScoreboardPage;