import ScoreboardControl from "../scoreboardControl/scoreboardControl/ScoreboardControl";
import ScoreboardControlHeader from "../scoreboardControl/scoreboardControlHeader/ScoreboardControlHeader";
import AuthErrorModal from "../authError/AuthError";

//Страница для вывода панели управления таблом

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