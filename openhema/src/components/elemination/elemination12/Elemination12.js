import EleminationFight from "../eleminationFight/EleminationFight";

import { useTransformData } from "../../../hooks/transformData.hook";

const Elemination12 = ({eleminations, fighters}) => {

    const { transformFights } = useTransformData();

    const renderEleminationsRounds = (arr) => {
        return arr.map(({fightId, ...props}) => {
            return (
                <EleminationFight key={fightId} {...props} />
            )
        })
    };

    let split1Array = eleminations.rounds[1].fights;

    split1Array = transformFights(split1Array, fighters);

    const split1 = renderEleminationsRounds(split1Array);

    const finales = transformFights(eleminations.rounds[0].fights, fighters);

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

export default Elemination12;