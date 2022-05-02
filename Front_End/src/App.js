import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./Views/LandingPage/";
import Signup from "./Views/Signup";
import Login from "./Views/Login";

function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			{user && <Route path="/" element={<Home />} />}
			<Route path="/signup" element={<Signup />} />
			<Route path="/login" element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
		</Routes>
	);
}

export default App;