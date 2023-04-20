import React, {useState, useEffect, useRef} from "react";

import { getPokemon, getPokemonCount, Poke } from "@/domains";
import { Background, Block, BlockRow, SelectButton } from "@/components";
import extractColor, { Colors } from "@/domains/colorthief";


function MainPage() {
    const pokeNo = 1;
    const [PokeNo, SetPokeNo] = useState(pokeNo);

    const emptyPoke: Poke = {id: 0, name: "", image: ""};
    const [PokeData, SetPokeData] = useState(emptyPoke);

    useEffect(() => {
        getPokemon(PokeNo)
            .then((res => {
                SetPokeData(res);
            }));
    })

    const pokeCount = 1281;
    const [PokeCount, SetPokeCount] = useState(pokeCount);
    useEffect(() => {
        getPokemonCount().then(res => {
            SetPokeCount(res);
        })
    })

    const colors: Colors = {color1: "", color2: ""};
    const [ColorData, SetColorData] = useState(colors);

    var img = useRef<HTMLImageElement>(null);
    var getBackgroundImage = () => {
        var imgObj = img.current as HTMLImageElement;
        var colorData = extractColor(imgObj);
        SetColorData(colorData);
    }
    const formattedID = "#" + PokeNo.toString().padStart(3, "0");


    const mySelectButton = <SelectButton 
        leftButtonAction={() => {SetPokeNo(PokeNo - 1 < 1 ? PokeCount : PokeNo - 1)}} 
        rightButtonAction={() => {SetPokeNo(PokeNo + 1 > PokeCount ? 1 : PokeNo + 1)}} 
        value={formattedID} />

    return (
        <main style={{ margin: 48}}>
            <div style={{
                display: "flex",
                justifyContent: "space-between"
            }}>
                <h1>{PokeData.name}</h1>
                <h1>{formattedID}</h1>
            </div>
            <BlockRow>
                <Block title="picture">
                    <img 
                        src={PokeData.image} 
                        title={PokeData.name} 
                        onLoad={getBackgroundImage} 
                        id="PokeImg" 
                        ref={img} 
                        crossOrigin="anonymous" 
                        style={{
                            width: 260,
                            maxHeight: 200,
                            objectFit: "contain",
                            objectPosition: "center center",
                        }}/>
                    {mySelectButton}
                </Block>
                <Block title="stats">
                    {mySelectButton}
                </Block>
            </BlockRow>
            <Background color1={ColorData.color1} color2={ColorData.color2}/>
        </main>
    )
}

export default MainPage;