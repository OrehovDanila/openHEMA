import { useSelector } from "react-redux";

import EliminationFight from "../eliminationFight/EliminationFight";

import { useTransformData } from "../../../hooks/transformData.hook";

//Дамб-компонент для редера сетки на 12 человек

const Elimination12 = ({eliminations}) => {

    const fighters = useSelector(state => state.fighters.fighters);
    const { transformFights } = useTransformData();

    const renderEliminationsRounds = (arr) => {
        return arr.map(({fightId, ...props}) => {
            return (
                <EliminationFight key={fightId} {...props} />
            )
        })
    };

    let split1Array = eliminations.rounds[1].fights;

    split1Array = transformFights(split1Array, fighters);

    const split1 = renderEliminationsRounds(split1Array);

    const finales = transformFights(eliminations.rounds[0].fights, fighters);

    return(
        <section id="bracket">
            <div className="container">
                
                <div className="round round-three current">
                    <div className="round-details">1/3 финала<br/><span className="date"></span></div>			
                    {split1}									
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

export default Elimination12;