import React, {useState, useEffect, useRef} from "react";

import { GetPokemon, Poke } from "@/domains";
import { Background, Block, BlockRow, SelectButton } from "@/components";
import extractColor, { Colors } from "@/domains/colorthief";


function MainPage() {
    const pokeNo = 1;
    const [PokeNo, SetPokeNo] = useState(pokeNo);

    const emptyPoke: Poke = {id: 0, name: "", image: ""};
    const [PokeData, SetPokeData] = useState(emptyPoke);

    useEffect(() => {
        GetPokemon(PokeNo)
            .then((res => {
                SetPokeData(res);
            }));
    })

    const colors: Colors = {color1: "", color2: ""};
    const [ColorData, SetColorData] = useState(colors);

    var img = useRef<HTMLImageElement>(null);
    var getBackgroundImage = () => {
        var imgObj = img.current as HTMLImageElement;
        var colorData = extractColor(imgObj);
        SetColorData(colorData);
    }
    const mySelectButton = <SelectButton 
        leftButtonAction={() => {SetPokeNo(PokeNo - 1)}} 
        rightButtonAction={() => {SetPokeNo(PokeNo + 1)}} 
        value={"#" + PokeNo.toString().padStart(3, "0")} />
    return (
        <main>
            <h1>{PokeData.name}</h1>
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
            </BlockRow>
            <Background color1={ColorData.color1} color2={ColorData.color2}/>
        </main>
    )
}

export default MainPage;