import './StatbarStyle.css'

type StatbarProps = {
    name: string,
    value: number,
    max: number,

    barWidth: number,
    titleWidth: number,
    color: string,
}

function Statbar(prop: StatbarProps) {
    return (
        <div className='StatBarMain'>
            <h4 style={{width: prop.titleWidth}}>{prop.name}</h4>
            <div style={{width: prop.barWidth, height: 12}}>
                <div style={{width: prop.barWidth, height: 12, backgroundColor: "black", zIndex: 3}} className='StatBarItem'></div>
                <div style={{width: prop.barWidth * prop.value / prop.max, height: 12, backgroundColor: prop.color, zIndex: 5 }} className='StatBarItem'></div>
            </div>
            <h4>{prop.value}</h4>
        </div>
    )
}

export default Statbar;