import EleminationFight from "../eleminationFight/EleminationFight";

import { useTransformData } from "../../../hooks/transformData.hook";

const Elemination16 = ({eleminations, fighters}) => {

    const { transformFights } = useTransformData();

    const renderEleminationsRounds = (arr) => {
        return arr.map(({fightId, ...props}) => {
            return (
                <EleminationFight key={fightId} {...props} />
            )
        })
    };

    const round1AArray = transformFights(eleminations.rounds[1].fights.slice(0,2), fighters);
    const round1BArray = transformFights(eleminations.rounds[1].fights.slice(2,4), fighters);

    const round1A = renderEleminationsRounds(round1AArray);
    const round1B = renderEleminationsRounds(round1BArray);

    const round2AArray = transformFights(eleminations.rounds[2].fights.slice(0,4), fighters);
    const round2BArray = transformFights(eleminations.rounds[2].fights.slice(3,7), fighters);

    const round2A = renderEleminationsRounds(round2AArray);
    const round2B = renderEleminationsRounds(round2BArray);

    const finales = transformFights(eleminations.rounds[0].fights, fighters);

    return(
        <section id="bracket">
            <div className="container">

                <div className="split split-one"> 

                    <div className="round round-two current">
                        <div className="round-details">1/4 финала<br/><span className="date"></span></div>			
                        {round2A}									
                    </div>	

                    <div className="round round-three current">
                        <div className="round-details">1/2 финала<br/><span className="date"></span></div>			
                        {round1A}									
                    </div>		
                </div> 
            
                <div className="champion">

                        <div className="final current">
                            <i className="fa fa-trophy"></i>
                            <div className="round-details">Финал<br/><span className="date"></span></div>		
                                <EleminationFight {...finales[0]}/>
                        </div>


                        <div className="final current">		
                            <div className="round-details">Бой за третье место<br/><span className="date"></span></div>		
                                <EleminationFight {...finales[1]}/>
                        </div>
	

                </div>
            
            
                <div className="split split-two">

                    <div className="round round-three current">
                        <div className="round-details">1/2 финала<br/><span className="date"></span></div>	
                        {round1B}									
                    </div>

                    <div className="round round-two current">
                        <div className="round-details">1/4 финала<br/><span className="date"></span></div>			
                        {round2B}									
                    </div>	
                </div>

            </div>
        </section>
    )
}

export default Elemination16;