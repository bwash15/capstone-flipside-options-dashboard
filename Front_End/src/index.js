import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import NavBar from './components/Navbar';
import { AuthProvider } from './context/AuthProvider'

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);


root.render(
	<StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<NavBar />
				<Route path="/*" element={<App />} />
			</AuthProvider>
		</BrowserRouter>
	</StrictMode>
);



