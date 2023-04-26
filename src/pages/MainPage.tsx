import React, {useState, useEffect, useRef} from "react";

import { getPokemon, getPokemonCount, Poke } from "@/domains";
import { Background, Block, BlockRow, EvolutionPic, Nametag, SelectButton, Statbar } from "@/components";
import extractColor, { Colors } from "@/domains/colorthief";

import './MainPageStyle.css';

function MainPage() {
    const [pokeNo, setPokeNo] = useState(1);
    const [pokeData, setPokeData] = useState<Poke>({id: 0, name: "", image: "", stat: [], type: [], evolves: []});
    const [pokeCount, setPokeCount] = useState(1281);
    const [colorData, setColorData] = useState<Colors>({color1: "", color2: ""});

    useEffect(() => {
        getPokemon(pokeNo)
            .then((res => {
                setPokeData(res);
            }));
    }, [])

    useEffect(() => {
        getPokemonCount().then(res => {
            setPokeCount(res);
        })
    })


    const img = useRef<HTMLImageElement>(null);
    const getBackgroundImage = () => {
        const imgObj = img.current as HTMLImageElement;
        const resultData = extractColor(imgObj);
        setColorData(resultData);
    }
    const formattedID = "#" + pokeNo.toString().padStart(3, "0");


    const mySelectButton = <SelectButton 
        leftButtonAction={() => {setPokeNo(pokeNo - 1 < 1 ? pokeCount : pokeNo - 1)}} 
        rightButtonAction={() => {setPokeNo(pokeNo + 1 > pokeCount ? 1 : pokeNo + 1)}} 
        value={formattedID} />


    const titleWidth = 140, barWidth = 480;

    return (
        <main style={{ margin: 48}}>
            <div style={{
                display: "flex",
                justifyContent: "space-between"
            }}>
                <h1>{pokeData.name}</h1>
                <h1>{formattedID}</h1>
            </div>
            <BlockRow>
                <Block title="picture">
                    <img 
                        src={pokeData.image} title={pokeData.name} 
                        onLoad={getBackgroundImage} 
                        id="PokeImg" ref={img} 
                        crossOrigin="anonymous"/>
                    {mySelectButton}
                </Block>
                <Block title="stats">
                    <div>
                        {pokeData.stat.map( v => 
                        <Statbar 
                            name={v.name} value={v.value} max={150} 
                            barWidth={barWidth} titleWidth={titleWidth} color={colorData.color1} 
                            key={v.name}/>)}
                    </div>
                    {mySelectButton}
                </Block>
            </BlockRow>
            <BlockRow>
                <Block title="type">
                    <div>
                        {pokeData.type.map( t => 
                        <Nametag key={t}>{t}</Nametag>)}
                    </div>
                    {mySelectButton}
                </Block>
                <Block title="evolution chain">
                    <div>
                        {pokeData.evolves.map (e => 
                        <EvolutionPic name={e.name} src={e.pic}/>)}
                    </div>
                    {mySelectButton}
                </Block>
            </BlockRow>
            <Background color1={colorData.color1} color2={colorData.color2}/>
        </main>
    )
}

export default MainPage;