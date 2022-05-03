import { Route, Routes, Navigate } from "react-router-dom";
import { isMobile } from "react-device-detect";
import Main from "./Views/Desktop/LandingPage";
import Signup from "./Views/Desktop/Signup";
import Login from "./Views/Desktop/Login";
import MobileMain from "./Views/Mobile/LandingPage";
import MobileSignup from "./Views/Mobile/Signup";
import MobileLogin from "./Views/Mobile/Login";

function App() {
	const user = localStorage.getItem("token");

	if(isMobile){
		return (
			<Routes>
				{user && <Route path="/" exact element={<MobileMain />} />}
				<Route path="/signup" exact element={<MobileSignup />} />
				<Route path="/login" exact element={<MobileLogin />} />
				<Route path="/" element={<Navigate replace to="/login" />} />
			</Routes>
		);
	}
	else{
		return (
			<Routes>
				{user && <Route path="/" exact element={<Main />} />}
				<Route path="/signup" exact element={<Signup />} />
				<Route path="/login" exact element={<Login />} />
				<Route path="/" element={<Navigate replace to="/login" />} />
			</Routes>
		);
	}
}

export default App;