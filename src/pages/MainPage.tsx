import React, {useState, useEffect} from "react";

import { GetPokemon, Poke } from "@/domains";
import { Block } from "../components/blocks";


function MainPage() {
    const emptyPoke: Poke = {name: "", image: ""};
    const[ PokeData, SetPokeData ] = useState(emptyPoke);

    useEffect(() => {
        GetPokemon()
            .then((res => SetPokeData(res)));
    })

    return (
        <main>
            <h1>{PokeData.name}</h1>
        </main>
    )
}

export default MainPage;