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
import NavBar from './components/Navbar';
import MobileTiles from "./Views/Mobile/TilesPage";
import { GlobalProvider } from './context/GlobalState'
import { AddTile } from "./Views/Desktop/TilesPage/addTile";
import { EditTile } from "./Views/Desktop/TilesPage/editTile";
import RequireAuth from "./components/RequireAuth";
import PageNotFound from "./Views/Desktop/MissingPage";
import UnAuthorizedAccess from "./Views/Desktop/UnAuthorized";
import AppLayout from "./components/AppLayout";




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
					<Route path="/" element={<AppLayout />} >
						{/** Pulic Routes **/}
						<Route path="login" element={<Login />} />
						<Route path="signup" element={<Signup />} />
						<Route path="unauthorized" element={<UnAuthorizedAccess />} />


						{/** Protected Routes **/}

						{/** User Only Access **/}
						<Route element={<RequireAuth allowedRoles={[2001]} />}>
							<Route path="profile" element={<Profile />} />

						</Route>
						{/** Admin, Editor, and User Routes **/}
						<Route element={<RequireAuth allowedRoles={[5150, 1984, 2001]} />}>
							<Route path="home" element={<Main />} />
							<Route path="profile" element={<Profile />} />
							<Route path="tiles" element={<BasicCard />} />
						</Route>
						{/** Admin and Editor Only **/}
						<Route element={<RequireAuth allowedRoles={[5150, 1984]} />}>
							<Route path="addTile" element={<AddTile />} />
							<Route path="editTile/:id" element={<EditTile />} />
							<Route path="addOption" element={<AddOption />} />
							<Route path="editOption/:id" element={<EditOption />} />
							<Route path="trading" element={<Trading />} />
						</Route>
						{/** Admin Only **/}
						<Route element={<RequireAuth allowedRoles={[5150]} />}>
						</Route>


						{/** Catch All Requests that dont match a route above **/}
						<Route path="*" element={<PageNotFound />} />
					</Route>
				</Routes>
			</GlobalProvider>

		);
	}
}

export default App;