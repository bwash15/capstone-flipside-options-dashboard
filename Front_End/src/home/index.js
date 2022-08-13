import "./styles.index.css"
import { HomePage } from "./homePage"
import {TopStocks} from "./topStocks"
import { NewsSlider } from "./newsSlider"
const Home = () => {
    return( 
        <div className="home">
            <div className="sideBar">
                <TopStocks />
            </div>
            <div className="Content">
                <HomePage />
            </div>
            <div className="newsSlider">
                <NewsSlider />
            </div>
        </div> 
    )

}

export default Home