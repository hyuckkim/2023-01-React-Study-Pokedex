import { PokemonClient } from "pokenode-ts";
import { exportColor } from ".";

export async function GetPokemon(id: number): Promise<Poke> {
    const api = new PokemonClient();

    var pokemon = await api.getPokemonById(id);
    var img = pokemon.sprites.other?.["official-artwork"].front_default!;
    return {
        id: id,
        name: pokemon.name,
        image: img
    }

}


export type Poke = {
    id: number,
    name: string,
    image: string,
}