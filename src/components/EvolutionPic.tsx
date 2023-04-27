type EvolutionPicProps = {
    name: string,
    src: string,
}

function EvolutionPic(prop: EvolutionPicProps) {
    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <p style={{}}>{prop.name}</p>
            <img src={prop.src} title={prop.name}
                style={{width: 150}}/>
        </div>
    )
}

export default EvolutionPic;