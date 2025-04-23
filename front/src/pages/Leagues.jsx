import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Flex, Typography, Tooltip, Button } from "antd"
import { ArrowLeftOutlined } from "@ant-design/icons"

import { api } from "../api/api"
import MainHeader from "../components/Header"
import SocialLinks from "../components/SocialLinks"
import CarouselImage from "../components/Carousel"


const { Text, Link } = Typography
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
        <>
            <MainHeader/>
            <Flex justify="center" align="center" style={{width: '50%', margin: 'auto'}}>
                <Tooltip title='Voltar'>
                    <a href="/">
                        <Button icon={<ArrowLeftOutlined />}/>
                    </a>
                </Tooltip>
                <Typography.Title level={2} style={{margin: '0px', paddingLeft: '10px'}}>Ligas do {id}</Typography.Title>
            </Flex>
            {leagues.map((league) => (
                <div key={league.idLeague} style={{margin: '50px 0px'}}>
                    <Flex gap="middle" justify="center" align="center">
                        <img
                            src={league.strBadge}
                            alt={`Bandeira da liga ${league.strLeague}`}
                            width='5%'
                        />
                        <div>
                            <p>
                                <Link
                                    to={`/teams/${league.strLeague}`}
                                >
                                    Times da Liga
                                </Link>
                            </p>
                            <Typography.Title level={3}>{league.strLeague}</Typography.Title>
                        </div>
                    </Flex>
                    <Flex align="center" justify="space-evenly" style={{width: '50%', margin: 'auto', padding: '10px 0px'}}>
                        <Text strong>Ano de Criação: {league.intFormedYear}</Text>
                        <Text strong>Temporada atual: {league.strCurrentSeason}</Text>
                        <Text strong>{league.strSport} - {league.strGender}</Text>
                    </Flex>
                    <SocialLinks league={league} />
                    <Typography.Paragraph copyable style={{width: '80%', margin: 'auto', padding: '10px 0px', align: 'justify', textIndent: '30px'}}>
                        {league.strDescriptionEN}
                    </Typography.Paragraph>
                    <CarouselImage league={league} />
                </div>
            ))}
        </>
    )
}
