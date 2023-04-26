type EvolutionPicProps = {
    name: string,
    src: string,
}

function EvolutionPic(prop: EvolutionPicProps) {
    return (
        <div>
            <img src={prop.src} title={prop.name}/>
            <p>{prop.name}</p>
        </div>
    )
}

export default EvolutionPic;