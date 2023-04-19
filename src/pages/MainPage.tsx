import React, {useState, useEffect, useRef} from "react";

import { GetPokemon, Poke } from "@/domains";
import { Background, Block, BlockRow } from "../components/blocks";
import extractColor, { Colors } from "@/domains/colorthief";


function MainPage() {
    const emptyPoke: Poke = {id: 0, name: "", image: ""};
    const[ PokeData, SetPokeData ] = useState(emptyPoke);

    useEffect(() => {
        GetPokemon(1)
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
        console.log(colorData);
        SetColorData(colorData);
    }
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
                </Block>
            </BlockRow>
            <Background color1={ColorData.color1} color2={ColorData.color2}/>
        </main>
    )
}

export default MainPage;