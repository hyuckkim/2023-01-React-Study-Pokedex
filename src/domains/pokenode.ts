import { PokemonClient, EvolutionClient, ChainLink } from "pokenode-ts";

export async function getPokemon(num: number): Promise<Poke> {
    const api = new PokemonClient();

    const url = (await api.listPokemonSpecies(num - 1, 1)).results[0].url;
    const id = getID(url);
    const pokeSpec = await api.getPokemonSpeciesById(id);
    const pokemon = await api.getPokemonById(getID(pokeSpec.varieties[0].pokemon.url));

    const stats = pokemon.stats.map(s => {
        return {
            name: s.stat.name,
            value: s.base_stat,
        }
    })

    const evolID = getID(pokeSpec.evolution_chain.url);
    const evolutions = await Promise.all(await getEvolutionById(evolID));

    const pokeType = pokemon.types.map(s => {
        return s.type.name
    })
    
    const img = pokemon.sprites.other?.["official-artwork"].front_default!;
    return {
        id: num,
        name: pokeSpec.name,
        image: img,
        stat: stats,
        type: pokeType,
        evolves: evolutions,
    }

}
export async function getPokemonCount(): Promise<number> {
    const api = new PokemonClient();

    return (await api.listPokemonSpecies(0, 1)).count;
}

function getID (url: string) {
    return Number(url.split("/").filter(Boolean).pop());
}
async function getEvolutionById(id: number): Promise<Promise<{ name: string; pic: string; }>[]> {
    const api = new EvolutionClient();
    const chain = await api.getEvolutionChainById(id);

    const speciesURLs = [chain.chain.species.url];
    recursiveEvolve(chain.chain.evolves_to);
    
    function recursiveEvolve(chain: ChainLink[]) {
        chain.map(c => {
            speciesURLs.push(c.species.url);
            recursiveEvolve(c.evolves_to);
        })
    }

    return speciesURLs.map( async url => {
        const api = new PokemonClient();
        const specID = getID(url);

        const spec = await api.getPokemonSpeciesById(specID);
        const pokeID = getID(spec.varieties[0].pokemon.url)

        const data = await api.getPokemonById(pokeID);
        return {
            name: data.name,
            pic: data.sprites.other?.["official-artwork"].front_default!
        }
    });
}


export type Poke = {
    id: number,
    name: string,
    image: string,
    stat: {
        name: string;
        value: number;
    }[],
    type: string[],
    evolves: {
        name: string;
        pic: string;
    }[],
}