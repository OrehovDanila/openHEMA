import { useSelector } from "react-redux";

import PoolFight from "../poolFight/PoolFight"
import { useTransformData } from "../../../hooks/transformData.hook";

const Pool = ({poolName, status, fights}) => {

    const fighters = useSelector(state => state.fighters.fighters);
    const { transformFights } = useTransformData();

    let poolStatus = '';
    let poolStatusClassName = '';

    switch(status){
        case 'running':
            poolStatus = "Бои проходят прямо сейчас";
            poolStatusClassName = "activePool";
            break;
        case 'ended': 
            poolStatus = "Бои закончились";
            poolStatusClassName = "activePool";
            break;
        default:
            break;
    };
    
    const fightsArray = transformFights(fights, fighters);

    const renderFights = (arr) => {
        return arr.map(({fightId, ...props}) => {
            return (
                <PoolFight key={fightId}  {...props} poolStatus={poolStatusClassName}/>
            )
        })
    }

    const elements = renderFights(fightsArray)

    return(
        <div className="pool">
                <div className="pool__tilte"> {poolName} {poolStatus}</div>
                <div className={`pool__body ${poolStatusClassName}`}>
                    <div className="pool__fights">
                        {elements}
                    </div>
                </div>
            </div>
    )
}

export default Pool;