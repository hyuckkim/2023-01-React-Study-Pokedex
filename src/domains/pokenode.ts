import { PokemonClient } from "pokenode-ts";
import { exportColor } from ".";

export async function getPokemon(num: number): Promise<Poke> {
    const api = new PokemonClient();

    var url = (await api.listPokemons(num - 1, 1)).results[0].url;
    var id = Number(url.split("/").filter(Boolean).pop());
    var pokemon = await api.getPokemonById(id);
    
    var img = pokemon.sprites.other?.["official-artwork"].front_default!;
    return {
        id: num,
        name: pokemon.name,
        image: img
    }

}
export async function getPokemonCount(): Promise<number> {
    const api = new PokemonClient();

    return (await api.listPokemons(0, 1)).count;
}

export type Poke = {
    id: number,
    name: string,
    image: string,
}