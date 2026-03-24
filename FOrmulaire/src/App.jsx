import React from "react"
import "./App.css"

export default function App() {
    const [pokemonData, setPokemonData] = React.useState(null)
    const [count, setCount] = React.useState(1)

    function decrease() {
        if (count > 1) {
            setCount(prev => prev - 1)
        }
    }


    React.useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${count}`)
            .then(res => res.json())
            .then(data => setPokemonData(data))
    }, [count])

    return (
        <div className="container">
            {pokemonData && (
                <div className="mainSection">
                    <div className="pokemon">
                        <p>#{count}</p>
                        <h1>{pokemonData.name}</h1>
                        <img src={pokemonData.sprites?.front_default} alt={pokemonData.name} />
                        <div className="cardStats">
                            {pokemonData.stats.map(s => (
                                <div className="s" key={s.stat.name}>
                                    <p className="statText">{s.stat.name} =={'>'} {s.base_stat}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <div className="buttonSection">
                <button className="button" onClick={decrease}>Afficher le précedent Pokémon</button>
                <button className="button" onClick={() => setCount(prev => prev + 1)}>Afficher le prochain Pokémon</button>
            </div>
        </div>
    )
}
