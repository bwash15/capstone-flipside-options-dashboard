import { Route, Routes, Navigate } from "react-router-dom";
// // Persistant Components
import Header from './Header';
// import Nav from './Nav';
// import Footer from './Footer';
// // Routes in the Main Element of the page
// // The items that occupy the main element will change
// import Lounge from './Lounge/Lounge';  // Landing Page 
// import NewQuote from './QuoteBoard/NewQuote';  // New Quote posted brief summary
// import Quote from './QuoteBoard/Quote';  // Oasis see full page details
// import About from './Lounge/About';
import Missing from './Pages/MissingPage';  // 404 Error > missing page

// User Defined Hooks and components
import RequireAuth from './RequireAuth';
import useWindowSize from './hooks/useWindowSize';
import PersistLogin from './PersistLogin';
import Layout from './Layout';
import LinkPage from "./Pages/LinkToPage"
// Component Pages
import RegisterUser from "./Pages/Signup";
import Login from "./Pages/Login";
import Admin from "./Pages/Admin";

import UnAuthorizedAccess from "./Pages/UnAuthorized";
import LandingPage from "./Pages/LandingPage"
import ProfilePage from "./Pages/ProfilePage"
import Home from "./home"
import ResetPassword from "./Pages/ResetPasswordPage";
import EnterEmail from './Pages/EnterEmailPage'
import AnalyzeData from './Pages/data_analysis/DataAnalysis';

import BasicCard from "./Pages/TilesPage";
import { AddOption } from "./Pages/TilesPage/Options/Tile/Item/addOption"
import Trading from "./Pages/TradingPage";
import { AddOptionsTile } from "./Pages/TilesPage/Options/Tile/addOptionsTile";
import BasicOptionCard from "./Pages/TilesPage/Options/Tile/Item/optionPage";
import { InnerTileList } from "./Pages/TilesPage/Options/Tile/Item/innerTilesList";
import { AddNewsTile } from "./Pages/TilesPage/News/Tile/addNewsTile";
import BasicNewsCard from "./Pages/TilesPage/News/Tile/Item/newsPage";
import { AddNews } from "./Pages/TilesPage/News/Tile/Item/addNews";
import { AboutPage } from "./Pages/About Page/aboutPage";
function App() {
  const { width } = useWindowSize();


  return (
    <div className='App'>
      {/* <Header title="Catch you on the FlipSide" width={width} /> */}
      <Routes>
        {/** Layout and PersistLogin both make use of the Outlet component **/}
        {/** Pulic Routes **/}
        <Route path="reset/email" element={<EnterEmail />} />
        <Route path="reset/:resetToken" element={<ResetPassword />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<RegisterUser />} />
        <Route path="unauthorized" element={<UnAuthorizedAccess />} />

        <Route path="/" element={<Layout />}>
          {/** Protected Routes **/}
          {/** User Only Access **/}
          {/** N/A **/}
          {/** PersistLogin works with the RefreshToken to Persist the User Login **/}
          <Route element={<PersistLogin />}>

            {/** Admin, Editor, and User Routes **/}
            <Route element={<RequireAuth allowedRoles={[5150, 1984, 2001]} />}>
              <Route path="/" element={<Home />} />
              <Route path="/About" element={<AboutPage />} />
              <Route path="linkpage" element={<LinkPage />} />
              <Route path="landingpage" element={<LandingPage />} />
              <Route path="profilePage" element={<ProfilePage />} />
              {/* <Route path="userTiles" exact element={<BasicCard />} /> */}
              <Route path="linkpage" element={<LinkPage />} />
              <Route path="/tiles" exact element={<BasicCard />} />
              {/* <Route path="/tiles/add" exact element={<AddOption/>} /> */}
              <Route path="/optionTiles/:id/:id" element={<BasicOptionCard />} />
              <Route path="/optionTiles/:id/:id/add" element={<AddOption />} />
              <Route path="/newsTiles/:id" element={<BasicNewsCard />} />
              <Route path="/newsTiles/:id/add" element={<AddNews />} />
              <Route path="/add-news-tile" element={<AddNewsTile />} />
              <Route path="/add-options-tile" exact element={<AddOptionsTile />} />
              <Route path="trading" exact element={<Trading />} />
              <Route path="analytics" element={<AnalyzeData />} />
            </Route>

            {/** Editor and User Access **/}
            <Route element={<RequireAuth allowedRoles={[2001, 1984]} />}>

            </Route>

            {/** Editor Only Access **/}
            <Route element={<RequireAuth allowedRoles={[1984]} />}>
            </Route>

            {/** Admin Access **/}
            <Route element={<RequireAuth allowedRoles={[5150]} />}>
              <Route path="admin" element={<Admin />} />
            </Route>
          </Route>


          {/** Catch All Requests that dont match a route above **/}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </div>
  );

}

export default App;

