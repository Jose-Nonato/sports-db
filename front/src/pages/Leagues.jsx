import { useParams } from "react-router-dom"

export default function Leagues() {
    const { id } = useParams()
    return(
        <div>
            <h1>Ligas</h1>
            <p>Nome do país: {id}</p>
        </div>
    )
}
