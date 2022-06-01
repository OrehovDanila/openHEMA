import { useSelector } from "react-redux";

import EliminationFight from "../eliminationFight/EliminationFight";

import { useTransformData } from "../../../hooks/transformData.hook";

//Дамб-компонент для редера сетки на 24 человека

const Elimination24 = ({eliminations}) => {

    const fighters = useSelector(state => state.elimination.fighters);
    const { transformFights } = useTransformData();

    const renderEliminationsRounds = (arr) => {
        return arr.map(({fightId, ...props}) => {
            return (
                <EliminationFight key={fightId} {...props} />
            )
        })
    };

    const round1AArray = transformFights(eliminations.rounds[1].fights, fighters);

    const round1A = renderEliminationsRounds(round1AArray);

    const round2AArray = transformFights(eliminations.rounds[2].fights, fighters);

    const round2A = renderEliminationsRounds(round2AArray);

    const finales = transformFights(eliminations.rounds[0].fights, fighters);

    return(
        <section id="bracket">
            <div className="container">


                <div className="round round-two current">
                    <div className="round-details">1/6 финала<br/><span className="date"></span></div>			
                    {round2A}									
                </div>	

                <div className="round round-three current">
                    <div className="round-details">1/3 финала<br/><span className="date"></span></div>			
                    {round1A}									
                </div>		

            
                <div className="champion">

                        <div className="final current">
                            <i className="fa fa-trophy"></i>
                            <div className="round-details">Финал трёх<br/><span className="date"></span></div>		
                                <EliminationFight {...finales[0]}/>
                        </div>


                        <div className="final current">		
                            <div className="round-details"><br/><span className="date"></span></div>		
                                <EliminationFight {...finales[1]}/>
                        </div>

                        <div className="final current">		
                            <div className="round-details"><br/><span className="date"></span></div>		
                                <EliminationFight {...finales[2]}/>
                        </div>
	

                </div>
            
            

            </div>
        </section>
    )
}

export default Elimination24;