import { useState, useEffect } from 'react'
import { Select } from 'antd'
import { api } from '../api/api.jsx'


export default function Home() {
    const [countries, setCountries] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

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

    console.log(typeof countries)
    if (loading) return <div><p>Carregando ...</p></div>
    if (error) return <div><p>Erro: {error}</p></div>

    return (
        <>
            <h1>Países</h1>
            <div>
                {countries.map((country) => (
                    <div key={country.name_en}>
                        <img
                            src={country.flag_url_32}
                            alt={`Bandeira da ${country.name_en}`}
                        />
                        <p>{country.name_en}</p>
                    </div>
                ))}
            </div>
        </>
    )
}
