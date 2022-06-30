import {TileCard} from "./tileCard"
import SimpleDialogDemo from "./homeCards"
import "./styles.index.css"
const Home = () => {

    return( 
        <div className="home">
            <div className="sideBar">
            </div>
            <div className="card">
                <SimpleDialogDemo />
            </div>
        </div> 

        // <TileCard />
    )

}

export default Home