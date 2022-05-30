import AuthErrorModal from "../authError/AuthError";
import Scoreboard from "../scoreboard/Scoreboard";
import ScoreboardHeader from "../scoreboard/ScoreboardHeader";


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