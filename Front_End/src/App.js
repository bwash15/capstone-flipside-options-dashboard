import { Route, Routes, Navigate } from "react-router-dom";
import { isMobile } from "react-device-detect";
import Main from "./Pages/LandingPage";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Profile from "./Pages/ProfilePage";
import BasicCard from "./Pages/TilesPage";
import {AddOption} from "./Pages/TilesPage/OptionTile/AddOption"
import {EditOption} from "./Pages/TilesPage/OptionTile/EditOption"
import Trading from "./Pages/TradingPage";
import NavBar from './components/Navbar';
import { GlobalProvider } from './context/GlobalState'
import { AddTile } from "./Pages/TilesPage/addTile";
import { EditTile } from "./Pages/TilesPage/editTile";
import RequireAuth from "./components/RequireAuth";
import PageNotFound from "./Views/Desktop/MissingPage";
import UnAuthorizedAccess from "./Views/Desktop/UnAuthorized";
import AppLayout from "./components/AppLayout";




function App() {

	return (
		<GlobalProvider>
			<Routes>
				{user && <Route path="/" exact element={<Main />} />}
				<Route path="/signup" exact element={<Signup />} />
				<Route path="/login" exact element={<Login />} />
				<Route path="/profile" exact element = {<Profile/>}/>
				<Route path="/tiles" exact element = {<BasicCard/>}/>
				<Route path="/addTile" exact element = {<AddTile/>}/>
				<Route path="/editTile/:id" element = {<EditTile/>}/>
				<Route path="/addOption" exact element = {<AddOption/>}/>
				<Route path="/editOption/:id" element = {<EditOption/>}/>
				<Route path="/trading" exact element = {<Trading/>}/>
				<Route path="/" element={<Navigate replace to="/login" />} />
			</Routes>	
		</GlobalProvider>

	);
	
}

export default App;