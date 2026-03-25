import React from "react"
import "./App.css"

export default function App() {
    const [pokemonData, setPokemonData] = React.useState(null)
    const [count, setCount] = React.useState(1)
    const [isLoading, setIsLoading] = React.useState(true)
    const [error, setError] = React.useState(null)
    const [inputValue, setInputValue] = React.useState("")
    const [query, setQuery] = React.useState(1)

    function decrease() {
        if (typeof query === "number" && query > 1) {
            setQuery(prev => prev - 1)
        }
    }


    function handleSearch() {
        const val = inputValue.trim().toLowerCase()
        if (val !== "") {
            setQuery(val)
        }
    }

    React.useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Network response was not ok")
                }
                return res.json()
            })
            .then(data => {
                setPokemonData(data)
                setQuery(data.id)
            })
            .catch(error => {
                setError(error);
                console.error("Error fetching data:", error);
            })
            .finally(() => setIsLoading(false))
    }, [query])

    if (isLoading) {
        return <div className="container"><p>Loading...</p></div>
    }

    if (error) {
        return <div className="container"><p>Error: {error.message}</p></div>
    }


    return (
        <div className="container">
            {pokemonData && (
                <div className="mainSection">
                    <div className="searchBar">
                        <input id="searchname" value={inputValue} onChange={(e) => setInputValue(e.target.value)} type="text" name="bar" placeholder="secrch for pockemon name"></input>
                        <button id="searchButton" value={""} onClick={handleSearch}>Search 🔍</button>
                    </div>
                    <div className="pokemon">
                        <p>#{pokemonData.id}</p>
                        <h1>{pokemonData.name}</h1>
                        <img src={pokemonData.sprites?.front_default} alt={pokemonData.name} />
                        <div className="cardStats">
                            {pokemonData.stats.map(s => (
                                <div className="s" key={s.stat.name}>
                                    <p>{s.stat.name} =={'>'} {s.base_stat}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <div className="buttonSection">
                <button className="button" onClick={decrease}>Afficher le précedent Pokémon</button>
                <button className="button" onClick={() => setQuery(prev => typeof prev === "number" ? prev + 1 : 1)}>Afficher le prochain Pokémon</button>
            </div>
        </div>
    )
}
