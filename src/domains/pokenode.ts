import { PokemonClient } from "pokenode-ts";

export async function GetPokemon(): Promise<Poke> {
    const api = new PokemonClient();

    var pokemon = await api.getPokemonById(1)

    return {
        name: pokemon.name,
        image: pokemon.sprites.other?.["official-artwork"].front_default!,
    }

}


export type Poke = {
    name: string,
    image: string,
}