//Дамб-компонент для рендера боёв в группе 

const AdminPoolFight = ({fighter1, fighter2, onFightClick, fightIndex, className}) => {
    return(
        <div  className={`admin__item__fight ` + className} onClick={()=>onFightClick(fightIndex)}>
            <div>{fighter1}</div>
            <div>{fighter2}</div>
        </div>
    )
}

export default AdminPoolFight;