import React, {useState, useEffect, useRef} from "react";

import { getPokemon, getPokemonCount, Poke } from "@/domains";
import { Background, Block, BlockRow, SelectButton, Statbar } from "@/components";
import extractColor, { Colors } from "@/domains/colorthief";

import './MainPageStyle.css';

function MainPage() {
    const [pokeNo, setPokeNo] = useState(1);

    const [pokeData, setPokeData] = useState<Poke>({id: 0, name: "", image: "", stat: []});

    useEffect(() => {
        getPokemon(pokeNo)
            .then((res => {
                setPokeData(res);
            }));
    }, [])

    const [pokeCount, setPokeCount] = useState(1281);
    useEffect(() => {
        getPokemonCount().then(res => {
            setPokeCount(res);
        })
    })

    const [colorData, setColorData] = useState<Colors>({color1: "", color2: ""});

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

    const statbars = pokeData.stat.map( v => {
        return <Statbar name={v.name} value={v.value} max={150} barWidth={barWidth} titleWidth={titleWidth} color={colorData.color1}/>
    })

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
                        {statbars}
                    </div>
                    {mySelectButton}
                </Block>
            </BlockRow>
            <Background color1={colorData.color1} color2={colorData.color2}/>
        </main>
    )
}

export default MainPage;