import { useState, useEffect } from 'react'
import { api } from '../api/api.jsx'
import { Link } from 'react-router-dom'

import { Card, Avatar, Flex } from 'antd'
import MainHeader from '../components/Header.jsx'


export default function Home() {
    const [countries, setCountries] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { Meta } = Card

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await api.get('/all_countries.php')
                setCountries(response.data.countries)
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        fetchCountries()
    }, [])

    if (loading) return <div><p>Carregando ...</p></div>
    if (error) return <div><p>Erro: {error}</p></div>

    return (
        <>
            <MainHeader/>
            <Flex
                wrap
                justify="space-around"
                gap="small"
            >
                {countries.map((country) => (
                    <Card 
                        key={country.name_en}
                        style={{width: 450}}
                    >
                        <Meta
                            avatar={<Avatar src={country.flag_url_32}/>}
                            title={country.name_en}
                            description={<Link to={`/leagues/${encodeURIComponent(country.name_en)}`}>Clique para mais detalhes</Link>}
                        />
                    </Card>
                ))}
            </Flex>
        </>
    )
}
