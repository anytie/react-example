// a simple app that fetches data from the pokeapi and displays it. It also has two buttons to increment and decrement the count of the pokemon to fetch.
// the app acts as a pokedeck, it displays a pockemon card with the name of the pokemon and its data in json format. The user can click on the buttons to see the next or previous pokemon. The app also has a counter that shows the current pokemon number.


import React from "react"
import "./App.css"

export default function App() {
    const [pokemonData, setPokemonData] = React.useState({})
    const [count, setCount] = React.useState(1)

    function decrement() {
        if (count > 1) {
            setCount(prev => prev - 1)
        }

    }

    function increment() {
        setCount(prev => prev + 1)
    }

    React.useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${count}`)
            .then(res => res.json())
            .then(data => setPokemonData(data))
    }, [count])

    return (
        <div className={"container"}>
            <div id={"card"}>
                <h2>Le numéro est {count}</h2>
                <h2>{pokemonData.name}</h2>

                <img src={pokemonData.sprites.front_default} alt=""></img>
            </div>
            <div className={"buttonsPok"}>

                <button className={"buttonPok"} onClick={decrement}>Afficher le précedent Pokémon</button>
                <button className={"buttonPok"} onClick={increment}>Afficher le prochain Pokémon</button>
            </div>
        </div>
    )
}
