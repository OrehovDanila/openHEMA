import { useSelector } from "react-redux";

import EleminationFight from "../eleminationFight/EleminationFight";

import { useTransformData } from "../../../hooks/transformData.hook";

const Elemination32 = ({eleminations}) => {

    const fighters = useSelector(state => state.fighters.fighters);
    const { transformFights } = useTransformData();

    const renderEleminationsRounds = (arr) => {
        return arr.map(({fightId, ...props}) => {
            return (
                <EleminationFight key={fightId} {...props} />
            )
        })
    };

    const round1AArray = transformFights(eleminations.rounds[1].fights.slice(0,1), fighters);
    const round1BArray = transformFights(eleminations.rounds[1].fights.slice(1,2), fighters);

    const round1A = renderEleminationsRounds(round1AArray);
    const round1B = renderEleminationsRounds(round1BArray);

    const round2AArray = transformFights(eleminations.rounds[2].fights.slice(0,2), fighters);
    const round2BArray = transformFights(eleminations.rounds[2].fights.slice(2,4), fighters);

    const round2A = renderEleminationsRounds(round2AArray);
    const round2B = renderEleminationsRounds(round2BArray);

    const round3AArray = transformFights(eleminations.rounds[3].fights.slice(0,4), fighters);
    const round3BArray = transformFights(eleminations.rounds[3].fights.slice(3,7), fighters);

    const round3A = renderEleminationsRounds(round3AArray);
    const round3B = renderEleminationsRounds(round3BArray);

    const round4AArray = transformFights(eleminations.rounds[4].fights.slice(0,7), fighters);
    const round4BArray = transformFights(eleminations.rounds[4].fights.slice(6,15), fighters);

    const round4A = renderEleminationsRounds(round4AArray);
    const round4B = renderEleminationsRounds(round4BArray);

    const finales = transformFights(eleminations.rounds[0].fights, fighters);

    return(
        <section id="bracket">
            <div className="container">

 

                <div className="round round-one current">
                    <div className="round-details">1/16 финала<br/><span className="date"></span></div>			
                    {round4A}									
                </div>	

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
                                <EleminationFight {...finales[0]}/>
                        </div>


                        <div className="final current">		
                            <div className="round-details">Бой за третье место<br/><span className="date"></span></div>		
                                <EleminationFight {...finales[1]}/>
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

                <div className="round round-one current">
                    <div className="round-details">1/16 финала<br/><span className="date"></span></div>			
                    {round4B}									
                </div>	


            </div>
        </section>
    )
}

export default Elemination32;