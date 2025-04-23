import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import { api } from "../api/api"
import MainHeader from "../components/Header.jsx"


export default function Teams() {
    const { id } = useParams()
    const [ teams, setTeams ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ error, setError ] = useState(null)

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await api.get(`/search_all_teams.php?l=${encodeURIComponent(id)}`)
                setTeams(response.data.teams)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        fetchTeams()
    }, [])

    if (loading) return <div><p>Carregando ...</p></div>
    if (error) return <div><p>Erro no fetchTeams: {error}</p></div>

    return(
        <div>
            <MainHeader/>
            <h1>Times da liga</h1>
            <p>ID da liga: {id}</p>
            {teams.map((team) => (
                <div key={team.idTeam}>
                    <p>{team.strTeamAlternate} ({team.strTeamShort})</p>
                    <p>Ano de Criação: {team.intFormedYear}</p>
                    <p>Estádio: {team.strStadium} - {team.strLocation}</p>
                    <p>Capacidade: {team.intStadiumCapacity}</p>
                    <p>{team.strSport} - {team.strGender}</p>
                    <img
                        src={team.strBadge}
                        alt={`Bandeira do time ${team.strBadge}`}
                    />
                    <a href={`http://${team.strFacebook}`} target="_blank" rel="noopener noreferrer">Facebook do Time</a>
                    <a href={`http://${team.strInstagram}`} target="_blank" rel="noopener noreferrer">Instagram do Time</a>
                    <a href={`http://${team.strTwitter}`} target="_blank" rel="noopener noreferrer">Twitter do Time</a>
                    <a href={`http://${team.strWebsite}`} target="_blank" rel="noopener noreferrer">Website do Time</a>
                    <a href={`http://${team.strYoutube}`} target="_blank" rel="noopener noreferrer">YouTube do Time</a>
                    <p>{team.strDescriptionEN}</p>
                    <img
                        src={team.strFanart1}
                        alt={`fanArt1`}
                    />
                    <img
                        src={team.strFanart2}
                        alt={`fanArt2`}
                    />
                    <img
                        src={team.strFanart3}
                        alt={`fanArt3`}
                    />
                    <img
                        src={team.strFanart4}
                        alt={`fanArt4`}
                    />
                </div>
            ))}
        </div>
    )
}
