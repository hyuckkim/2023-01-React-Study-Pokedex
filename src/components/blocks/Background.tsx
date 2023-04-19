type BackgroundProp = {
    color1: string,
    color2: string
}

function Background(prop: BackgroundProp) {
    const style: React.CSSProperties = {
        backgroundImage: `linear-gradient(45deg, ${prop.color1} 0%, ${prop.color2} 100%)`,
        position: 'fixed',
        zIndex: -10,
        inset: 0
    };
    return (
        <div style={style}/>
    )
}

export default Background;