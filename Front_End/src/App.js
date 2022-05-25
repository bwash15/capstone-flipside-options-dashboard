<<<<<<< HEAD
import { Route, Routes, Navigate } from "react-router-dom";
import { isMobile } from "react-device-detect";
import Main from "./Pages/LandingPage";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Profile from "./Pages/ProfilePage";
import BasicCard from "./Pages/TilesPage";
import { AddOption } from "./Pages/TilesPage/OptionTile/AddOption"
import { EditOption } from "./Pages/TilesPage/OptionTile/EditOption"
import Trading from "./Pages/TradingPage";
import NavBar from './components/Navbar';
import { GlobalProvider } from './context/GlobalState'
import { AddTile } from "./Pages/TilesPage/addTile";
import { EditTile } from "./Pages/TilesPage/editTile";
import RequireAuth from "./components/RequireAuth";
import PageNotFound from "./Views/Desktop/MissingPage";
import UnAuthorizedAccess from "./Views/Desktop/UnAuthorized";
import AppLayout from "./components/AppLayout";
=======
>>>>>>> 77b5d9b472787574768e95df653fd7e58464c3b0

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



import { Route, Routes, Navigate } from "react-router-dom";
import BasicCard from "./Pages/TilesPage";
import { AddOption } from "./Pages/TilesPage/OptionTile/AddOption"
import { EditOption } from "./Pages/TilesPage/OptionTile/EditOption"
import Trading from "./Pages/TradingPage";
import { BrowserRouter as Router } from "react-router-dom";
import { GlobalProvider } from './context/GlobalState'
import { AddTile } from "./Pages/TilesPage/addTile";
import { EditTile } from "./Pages/TilesPage/editTile";
function App() {
  const { width } = useWindowSize();

  return (
    <GlobalProvider>
      <Routes>
        {user && <Route path="/" exact element={<Main />} />}
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/profile" exact element={<Profile />} />
        <Route path="/tiles" exact element={<BasicCard />} />
        <Route path="/addTile" exact element={<AddTile />} />
        <Route path="/editTile/:id" element={<EditTile />} />
        <Route path="/addOption" exact element={<AddOption />} />
        <Route path="/editOption/:id" element={<EditOption />} />
        <Route path="/trading" exact element={<Trading />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
      </Routes>
    </GlobalProvider>

  return (
    <div className='App'>
      <Header title="Catch you on the FlipSide" width={width} />
      <Routes>
        {/** Layout and PersistLogin both make use of the Outlet component **/}
        <Route path="/" element={<Layout />}>
          {/** Pulic Routes **/}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<RegisterUser />} />
          <Route path="linkpage" element={<LinkPage />} />
          <Route path="unauthorized" element={<UnAuthorizedAccess />} />

          {/** Protected Routes **/}
          {/** User Access **/}
          {/** User Only Access **/}
          {/** PersistLogin works with the RefreshToken to Persist the User Login **/}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[2001]} />}>
              <Route path="profile" element={<ProfilePage />} />
            </Route>

            {/** Admin, Editor, and User Routes **/}
            <Route element={<RequireAuth allowedRoles={[5150, 1984, 2001]} />}>
              <Route path="/" element={<Home />} />
              <Route path="landingpage" element={<LandingPage />} />
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
          <Route path="/tiles" exact element={<BasicCard />} />
          <Route path="/addTile" exact element={<AddTile />} />
          <Route path="/editTile/:id" element={<EditTile />} />
          <Route path="/addOption" exact element={<AddOption />} />
          <Route path="/editOption/:id" element={<EditOption />} />
          <Route path="/trading" exact element={<Trading />} />

          {/** Catch All Requests that dont match a route above **/}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </div>
  );

}

export default App;

