import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Flex, Typography, Tooltip, Button } from "antd"
import { useNavigate } from "react-router-dom"
import { ArrowLeftOutlined } from "@ant-design/icons"

import { api } from "../api/api"
import MainHeader from "../components/Header.jsx"
import CarouselImage from "../components/Carousel.jsx"
import SocialLinks from "../components/SocialLinks.jsx"


export default function Teams() {
    const { id } = useParams()
    const [ teams, setTeams ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ error, setError ] = useState(null)
    const { Text, Link } = Typography
    const navigate = useNavigate()

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
        <>
            <MainHeader/>
            <Flex justify="center" align="center" style={{width: '50%', margin: 'auto'}}>
                <Tooltip title='Voltar'>
                    <Button
                        icon={<ArrowLeftOutlined />}
                        onClick={() => navigate(-1)}
                    />
                </Tooltip>
                <Typography.Title level={2} style={{margin: '0px', paddingLeft: '10px'}}>Times da liga - {id}</Typography.Title>
            </Flex>
            {teams.map((team) => (
                <div key={team.idTeam} style={{margin: '50px 0px'}}>
                    <Flex gap="middle" justify="center" align="center">
                        <img
                            src={team.strBadge}
                            alt={`Bandeira do time ${team.strBadge}`}
                            width='5%'
                        />
                        <div>
                            <Typography.Title level={3}>{team.strTeamAlternate}</Typography.Title>
                            <Typography>{team.strTeamShort}</Typography>
                        </div>
                    </Flex>
                    <Flex align="center" justify="space-evenly" style={{width: '50%', margin: 'auto', padding: '15px 0px'}}>
                        <Text strong>Ano de Criação: {team.intFormedYear}</Text>
                        <Text strong>Estádio: {team.strStadium} - {team.strLocation}</Text>
                        <Text strong>Capacidade: {team.intStadiumCapacity}</Text>
                        <Text strong>{team.strSport} - {team.strGender}</Text>
                    </Flex>
                    <SocialLinks league={team}/>
                    <Typography.Paragraph copyable style={{width: '80%', margin: 'auto', padding: '10px 0px', align: 'justify', textIndent: '30px'}}>
                        {team.strDescriptionEN}
                    </Typography.Paragraph>
                    <CarouselImage league={team}/>
                </div>
            ))}
        </>
    )
}
