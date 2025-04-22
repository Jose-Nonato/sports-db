import { useParams } from "react-router-dom"

export default function Teams() {
    const { id } = useParams()
    return(
        <div>
            <h1>Times da liga</h1>
            <p>ID da liga: {id}</p>
        </div>
    )
}