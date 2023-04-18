import React, {useState, useEffect} from "react";

import { GetPokemon, Poke } from "@/domains";
import { Block } from "../components/blocks";


function MainPage() {
    const emptyPoke: Poke = {id: 0, name: "", image: ""};
    const[ PokeData, SetPokeData ] = useState(emptyPoke);

    useEffect(() => {
        GetPokemon(1)
            .then((res => SetPokeData(res)));
    })

    return (
        <main>
            <h1>{PokeData.name}</h1>
            <Block title="picture">
                <img src={PokeData.image} title={PokeData.name}/>
            </Block>
        </main>
    )
}

export default MainPage;