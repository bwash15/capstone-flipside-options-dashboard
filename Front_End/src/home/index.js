import "./styles.index.css"
import { HomePage } from "./homePage"
import {TopStocks} from "./topStocks"
const Home = () => {
    return( 
        <div className="home">
            <div className="Content">
                <HomePage />
            </div>
            <div className="sideBar">
                <TopStocks />
            </div>
        </div> 
    )

}

export default Home