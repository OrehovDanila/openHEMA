import ScoreboardControlPools from "../scoreboardControl/scoreboardControlPools/ScoreboardControlPools";
import ScoreboardControlPoolsHeader from "../scoreboardControl/scoreboardControlHeaderPools/scoreboardControlHeaderPools";

const ScoreboardControlPoolsPage = () => {
    return (
        <div className="App">
            <ScoreboardControlPoolsHeader />
            <main>
                <ScoreboardControlPools />
            </main>
        </div>
    )
}

export default ScoreboardControlPoolsPage;