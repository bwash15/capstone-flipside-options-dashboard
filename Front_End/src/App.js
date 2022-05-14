import { Route, Routes, Navigate } from "react-router-dom";
import { isMobile } from "react-device-detect";
import Main from "./Views/Desktop/LandingPage";
import Signup from "./Views/Desktop/Signup";
import Login from "./Views/Desktop/Login";
import Profile from "./Views/Desktop/ProfilePage";
import BasicCard from "./Views/Desktop/TilesPage";
import { AddOption } from "./Views/Desktop/TilesPage/OptionTile/AddOption"
import { EditOption } from "./Views/Desktop/TilesPage/OptionTile/EditOption"
import MobileMain from "./Views/Mobile/LandingPage";
import MobileSignup from "./Views/Mobile/Signup";
import MobileLogin from "./Views/Mobile/Login";
import MobileProfile from "./Views/Desktop/ProfilePage";
import Trading from "./Views/Desktop/TradingPage";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from './components/Navbar';
import MobileTiles from "./Views/Mobile/TilesPage";
import { GlobalProvider } from './context/GlobalState'
import { AddTile } from "./Views/Desktop/TilesPage/addTile";
import { EditTile } from "./Views/Desktop/TilesPage/editTile";
function App() {



	if (isMobile) {
		return (
			<GlobalProvider>
				<Routes>
					<Route path="/" exact element={<MobileMain />} />
					<Route path="/signup" exact element={<MobileSignup />} />
					<Route path="/login" exact element={<MobileLogin />} />
					<Route path="/profile" exact element={<MobileProfile />} />
					<Route path="/tiles" exact element={<MobileTiles />} />
					<Route path="/trading" exact element={<Trading />} />
					<Route path="/" element={<Navigate replace to="/login" />} />
				</Routes>
			</GlobalProvider>

		);
	}
	else {
		return (
			<GlobalProvider>
				<Routes>
					<Route path="/" exact element={<Login />} />
					<Route path="/signup" exact element={<Signup />} />
					<Route path="/home" exact element={<Main />} />
					<Route path="/login" exact element={<Login />} />
					<Route path="/profile" exact element={<Profile />} />
					<Route path="/tiles" exact element={<BasicCard />} />
					<Route path="/addTile" exact element={<AddTile />} />
					<Route path="/editTile/:id" element={<EditTile />} />
					<Route path="/addOption" exact element={<AddOption />} />
					<Route path="/editOption/:id" element={<EditOption />} />
					<Route path="/trading" exact element={<Trading />} />
				</Routes>
			</GlobalProvider>

		);
	}
}

export default App;