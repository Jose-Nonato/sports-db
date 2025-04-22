import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"

import { api } from "../api/api"


export default function Leagues() {
    const { id } = useParams()
    const encodedID = encodeURIComponent(id)
    const [leagues, setLeagues] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchLeagues = async () => {
            try {
                const response = await api.get(`/search_all_leagues.php?c=${encodedID}`)
                setLeagues(response.data.countries)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        fetchLeagues()
    }, [])

    if (loading) return <div><p>Carregando ...</p></div>
    if (error) return <div><p>Erro fetchLeagues: {error}</p></div>

    return(
        <div>
            <h1>Ligas</h1>
            <p>Nome do país: {id}</p>
            {leagues.map((league) => (
                <div key={league.idLeague}>
                    <img
                        src={league.strBadge}
                        alt={`Bandeira da liga ${league.strLeague}`}
                    />
                    <p>
                        <Link
                            to={`/teams/${league.idAPIfootball}`}
                        >
                            Times da Liga
                        </Link>
                    </p>
                    <p>{league.strLeague} - {league.strLeagueAlternate}</p>
                    <p>Ano de Criação: {league.intFormedYear}</p>
                    <p>Temporada atual: {league.strCurrentSeason}</p>
                    <p>{league.strSport} - {league.strGender}</p>
                    <a href={`http://${league.strFacebook}`} target="_blank" rel="noopener noreferrer">Facebook da Liga</a>
                    <a href={`http://${league.strInstagram}`}>Instagram da Liga</a>
                    <a href={`http://${league.strTwitter}`}>Twitter da Liga</a>
                    <a href={`http://${league.strWebsite}`}>Website da Liga</a>
                    <a href={league.strYoutube}>YouTube da Liga</a>
                    <p>{league.strDescriptionEN}</p>
                    <img
                        src={league.strFanart1}
                        alt={`fanArt1`}
                    />
                    <img
                        src={league.strFanart2}
                        alt={`fanArt2`}
                    />
                    <img
                        src={league.strFanart3}
                        alt={`fanArt3`}
                    />
                    <img
                        src={league.strFanart4}
                        alt={`fanArt4`}
                    />
                </div>
            ))}
        </div>
    )
}
