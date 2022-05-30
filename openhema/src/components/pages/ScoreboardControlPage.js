import ScoreboardControl from "../scoreboardControl/scoreboardControl/ScoreboardControl";
import ScoreboardControlHeader from "../scoreboardControl/scoreboardControlHeader/scoreboardControlHeader";
import AuthErrorModal from "../authError/AuthError";

const ScoreboardControlPage = () => {
    return (
        <div className="App">
            <ScoreboardControlHeader />
            <AuthErrorModal/>
            <main>
                <ScoreboardControl />
            </main>
        </div>
    )
}

export default ScoreboardControlPage;