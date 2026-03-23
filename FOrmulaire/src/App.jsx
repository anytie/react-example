import React from "react"
import "./App.css"

export default function App() {
    const [pokemonData, setPokemonData] = React.useState(null)
    const [count, setCount] = React.useState(1)
    const [loading, setLoading] = React.useState(true)

    function decrement() {
        if (count > 1) setCount(prev => prev - 1)
    }

    function increment() {
        setCount(prev => prev + 1)
    }

    React.useEffect(() => {
        setLoading(true)
        fetch(`https://pokeapi.co/api/v2/pokemon/${count}`)
            .then(res => res.json())
            .then(data => {
                setPokemonData(data)
                setLoading(false)
            })
    }, [count])

    const statAbbr = {
        hp: "HP",
        attack: "ATK",
        defense: "DEF",
        "special-attack": "SpA",
        "special-defense": "SpD",
        speed: "SPD",
    }

    return (
        <div className="container">
            <div id="card" className={loading ? "card--loading" : ""}>
                {loading ? (
                    <div className="card__loader">
                        <div className="pokeball">
                            <div className="pokeball__top" />
                            <div className="pokeball__middle" />
                            <div className="pokeball__bottom" />
                        </div>
                    </div>
                ) : pokemonData && (
                    <>
                        {/* Header */}
                        <div className="card__header">
                            <span className="card__number">#{String(pokemonData.id).padStart(3, "0")}</span>
                            <div className="card__types">
                                {pokemonData.types.map(t => (
                                    <span key={t.type.name} className={`type-badge type-badge--${t.type.name}`}>
                                        {t.type.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Name */}
                        <h2 className="card__name">{pokemonData.name}</h2>

                        {/* Sprite */}
                        <div className="card__sprite-wrapper">
                            <img
                                className="card__sprite"
                                src={pokemonData.sprites.front_default}
                                alt={pokemonData.name}
                            />
                        </div>

                        {/* Info row */}
                        <div className="card__info">
                            <div className="card__info-item">
                                <span className="card__info-label">Taille</span>
                                <span className="card__info-value">{(pokemonData.height / 10).toFixed(1)} m</span>
                            </div>
                            <div className="card__info-divider" />
                            <div className="card__info-item">
                                <span className="card__info-label">Poids</span>
                                <span className="card__info-value">{(pokemonData.weight / 10).toFixed(1)} kg</span>
                            </div>
                            <div className="card__info-divider" />
                            <div className="card__info-item">
                                <span className="card__info-label">Exp. base</span>
                                <span className="card__info-value">{pokemonData.base_experience}</span>
                            </div>
                        </div>

                        {/* Abilities */}
                        <div className="card__abilities">
                            {pokemonData.abilities.map(a => (
                                <span key={a.ability.name} className={`ability-badge ${a.is_hidden ? "ability-badge--hidden" : ""}`}>
                                    {a.ability.name}{a.is_hidden ? " ✦" : ""}
                                </span>
                            ))}
                        </div>

                        {/* Stats */}
                        <div className="card__stats">
                            {pokemonData.stats.map(s => (
                                <div key={s.stat.name} className="stat-row">
                                    <span className="stat-row__name">{statAbbr[s.stat.name] ?? s.stat.name}</span>
                                    <div className="stat-row__bar-track">
                                        <div
                                            className="stat-row__bar-fill"
                                            style={{ width: `${Math.min((s.base_stat / 255) * 100, 100)}%` }}
                                        />
                                    </div>
                                    <span className="stat-row__value">{s.base_stat}</span>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Buttons */}
            <div className="buttonsPok">
                <button className="buttonPok" onClick={decrement} disabled={count <= 1}>
                    ← Précédent
                </button>
                <button className="buttonPok" onClick={increment}>
                    Suivant →
                </button>
            </div>
        </div>
    )
}
