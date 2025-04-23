import { Carousel } from "antd"


const fanArts = ["strFanart1", "strFanart2", "strFanart3", "strFanart4"]

const CarouselImage = ({ league }) => {
    return(
        <Carousel arrows infinite style={{ width: "80%", margin: "auto" }}>
            {fanArts.map((fanArt) => {
                const urlArt = league[fanArt]
                if (!urlArt) return null
                return(
                    <div>
                        <img 
                            src={urlArt} 
                            alt={`Imagem ${fanArt}`}
                            style={{
                                width: "100%",
                                maxHeight: "800px",
                                objectFit: "cover",
                                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                            }}
                        />
                    </div>
                )
            })}
        </Carousel>
    )
}

export default CarouselImage
