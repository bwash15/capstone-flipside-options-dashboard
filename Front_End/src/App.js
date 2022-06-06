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
import Missing from './MissingPage';  // 404 Error > missing page

// User Defined Hooks and components
import RequireAuth from './RequireAuth';
import useWindowSize from './hooks/useWindowSize';
import PersistLogin from './PersistLogin';
import Layout from './Layout';
import LinkPage from "./LinkToPage"
// Component Pages
import RegisterUser from "./Pages/Signup";
import Login from "./Pages/Login";
import Admin from "./Admin";
import Lounge from "./Lounge/Lounge";
import UnAuthorizedAccess from "./UnAuthorized";
import LandingPage from "./Pages/LandingPage"
import ProfilePage from "./Pages/ProfilePage"
import Home from "./home"



import BasicCard from "./Pages/TilesPage";
import { AddOption } from "./Pages/TilesPage/addOption"
import { EditOption } from "./Pages/TilesPage/OptionTile/EditOption"
import Trading from "./Pages/TradingPage";
import { AddTile } from "./Pages/TilesPage/addTile";
import  { BasicOptionCard }  from "./Pages/TilesPage/optionPage";
import { InnerTileList } from "./Pages/TilesPage/innerTilesList";
function App() {
  const { width } = useWindowSize();


  return (
    <div className='App'>
      {/* <Header title="Catch you on the FlipSide" width={width} /> */}
      <Routes>
        {/** Layout and PersistLogin both make use of the Outlet component **/}
        {/** Pulic Routes **/}
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<RegisterUser />} />
        <Route path="unauthorized" element={<UnAuthorizedAccess />} />

        <Route path="/" element={<Layout />}>
          {/** Protected Routes **/}
          {/** User Access **/}
          {/** User Only Access **/}
          {/** PersistLogin works with the RefreshToken to Persist the User Login **/}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[5150, 1984, 2001]} />}>
              <Route path="linkpage" element={<LinkPage />} />
              <Route path="profilePage" element={<ProfilePage />} />
              <Route path="userTiles" exact element={<BasicCard />} />
            </Route>

            {/** Admin, Editor, and User Routes **/}
            <Route element={<RequireAuth allowedRoles={[5150, 1984, 2001]} />}>
              <Route path="/" element={<Home />} />
              <Route path="landingpage" element={<LandingPage />} />

              <Route path="addTile" exact element={<AddTile />} />
              <Route path="editTile/:id" element={<EditTile />} />
              <Route path="addOption" exact element={<AddOption />} />
              <Route path="editOption/:id" element={<EditOption />} />
              <Route path="trading" exact element={<Trading />} />
            </Route>

            {/** Editor and User Access **/}
            <Route element={<RequireAuth allowedRoles={[2001, 1984]} />}>
              <Route path="lounge" element={<Lounge />} />
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

