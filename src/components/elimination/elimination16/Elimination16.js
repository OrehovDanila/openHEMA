import { useSelector } from "react-redux";

import EliminationFight from "../eliminationFight/EliminationFight";

import { useTransformData } from "../../../hooks/transformData.hook";

//Дамб-компонент для редера сетки на 16 человек

const Elimination16 = ({eliminations}) => {

    const fighters = useSelector(state => state.elimination.fighters);
    const { transformFights } = useTransformData();

    const renderEliminationsRounds = (arr) => {
        return arr.map(({fightId, ...props}) => {
            return (
                <EliminationFight key={fightId} {...props} />
            )
        })
    };

    const round1AArray = transformFights(eliminations.rounds[1].fights.slice(0,1), fighters);
    const round1BArray = transformFights(eliminations.rounds[1].fights.slice(1,2), fighters);

    const round1A = renderEliminationsRounds(round1AArray);
    const round1B = renderEliminationsRounds(round1BArray);

    const round2AArray = transformFights(eliminations.rounds[2].fights.slice(0,2), fighters);
    const round2BArray = transformFights(eliminations.rounds[2].fights.slice(2,4), fighters);

    const round2A = renderEliminationsRounds(round2AArray);
    const round2B = renderEliminationsRounds(round2BArray);

    const round3AArray = transformFights(eliminations.rounds[3].fights.slice(0,4), fighters);
    const round3BArray = transformFights(eliminations.rounds[3].fights.slice(3,7), fighters);

    const round3A = renderEliminationsRounds(round3AArray);
    const round3B = renderEliminationsRounds(round3BArray);

    const finales = transformFights(eliminations.rounds[0].fights, fighters);

    return(
        <section id="bracket">
            <div className="container">


                <div className="round round-one current">
                    <div className="round-details">1/8 финала<br/><span className="date"></span></div>			
                    {round3A}									
                </div>	

                <div className="round round-two current">
                    <div className="round-details">1/4 финала<br/><span className="date"></span></div>			
                    {round2A}									
                </div>	

                <div className="round round-three current">
                    <div className="round-details">1/2 финала<br/><span className="date"></span></div>			
                    {round1A}									
                </div>		

            
                <div className="champion">

                        <div className="final current">
                            <i className="fa fa-trophy"></i>
                            <div className="round-details">Финал<br/><span className="date"></span></div>		
                                <EliminationFight {...finales[0]}/>
                        </div>


                        <div className="final current">		
                            <div className="round-details">Бой за третье место<br/><span className="date"></span></div>		
                                <EliminationFight {...finales[1]}/>
                        </div>
	

                </div>
            
            


                <div className="round round-three current">
                    <div className="round-details">1/2 финала<br/><span className="date"></span></div>	
                    {round1B}									
                </div>

                <div className="round round-two current">
                    <div className="round-details">1/4 финала<br/><span className="date"></span></div>			
                    {round2B}									
                </div>	

                <div className="round round-one current">
                    <div className="round-details">1/8 финала<br/><span className="date"></span></div>			
                    {round3B}									
                </div>	


            </div>
        </section>
    )
}

export default Elimination16;