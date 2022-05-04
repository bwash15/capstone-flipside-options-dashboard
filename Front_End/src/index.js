import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import NavBar from './components/Navbar';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
const user = localStorage.getItem("token");
if(user){
	root.render(	
		<StrictMode>
			<BrowserRouter>
				<NavBar />
				<App />
			</BrowserRouter>
		</StrictMode>
	);
} else {
	root.render(	
		<StrictMode>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</StrictMode>
	);
}
