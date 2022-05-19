import ScoreboardControlEleminationsHeader from "../scoreboardControl/scoreboardControlEleminationsHeader/scoreboardControlEleminationsHeader";
import ScoreboardControlEleminations from "../scoreboardControl/scoreboardControlEleminatios/ScoreboardControlElemination";

const ScoreboardControlEleminationPage = () => {
    return (
        <div className="App">
            <ScoreboardControlEleminationsHeader />
            <main>
                <ScoreboardControlEleminations />
            </main>
        </div>
    )
}

export default ScoreboardControlEleminationPage;