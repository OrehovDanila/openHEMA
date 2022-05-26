import EleminationFight from "../eleminationFight/EleminationFight";

import { useTransformData } from "../../../hooks/transformData.hook";

const Elemination24 = ({eleminations, fighters}) => {

    const { transformFights } = useTransformData();

    const renderEleminationsRounds = (arr) => {
        return arr.map(({fightId, ...props}) => {
            return (
                <EleminationFight key={fightId} {...props} />
            )
        })
    };

    const round1AArray = transformFights(eleminations.rounds[1].fights, fighters);

    const round1A = renderEleminationsRounds(round1AArray);

    const round2AArray = transformFights(eleminations.rounds[2].fights, fighters);

    const round2A = renderEleminationsRounds(round2AArray);

    const finales = transformFights(eleminations.rounds[0].fights, fighters);

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
                                <EleminationFight {...finales[0]}/>
                        </div>


                        <div className="final current">		
                            <div className="round-details"><br/><span className="date"></span></div>		
                                <EleminationFight {...finales[1]}/>
                        </div>

                        <div className="final current">		
                            <div className="round-details"><br/><span className="date"></span></div>		
                                <EleminationFight {...finales[2]}/>
                        </div>
	

                </div>
            
            

            </div>
        </section>
    )
}

export default Elemination24;