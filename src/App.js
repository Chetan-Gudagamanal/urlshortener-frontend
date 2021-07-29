
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './components/LoginPage';
import Register from './components/Register';
import ForgotPasswordPage from "./components/ForgotPasswordPage"
import ChangePasswordPage from "./components/ChangePasswordPage"
import ResetPasswordPage from "./components/ResetPasswordPage"
import {Switch, Route, useParams} from "react-router-dom"
import { useState } from 'react';
import StatusDisplay from "./components/StatusDisplay"
import VerifyEmailPage from "./components/VerifyEmailPage"
import NavTabs from "./components/NavTabs"
import UrlGeneratePage from "./components/UrlGeneratePage"
import GetShortUrl from "./components/GetShortUrl"
import AllUrlData from "./components/AllUrlData"
import MonthReport from "./components/MonthReport"



function App() {
  const [status,setStatus]=useState("")
  return (
    <div className="App">
      <header className="header-class">
        <div className="page-title">WELCOME TO URL SHORTENER APP</div>
      </header>
      <section className="section-class">
        <Switch>
          {/* User Registration */}
          <Route path="/register">
            <Register setStatus={setStatus}/>        
          </Route>
          {/* User registration verification email link */}
          <Route path="/verify_email/:id/:token">
            <VerifyEmailPage useParams={useParams} setStatus={setStatus}/>        
          </Route>
          {/* Forgot password page */}
          <Route path="/forgotPassword">
            <ForgotPasswordPage setStatus={setStatus}/>        
          </Route>
          {/* Verify forgot password link in email */}
          <Route path="/reset_password/:id/:token">
            <ResetPasswordPage useParams={useParams} setStatus={setStatus}/>       
          </Route>
          {/* change password page after link verification in email */}
          <Route path="/change_password/:id/:token">
            <ChangePasswordPage setStatus={setStatus}/>        
          </Route>
          {/* Generate short url page */}
          <Route path="/homepage">
            <NavTabs/>
            <UrlGeneratePage/>
          </Route>
          {/* redirect to actual long url after clicking on short url */}
          <Route path="/short/:shortUrlToken">
            <GetShortUrl setStatus={setStatus}/>
          </Route>
          {/* display all generated urls table */}
          <Route path="/allUrls">
            <NavTabs/>
            <AllUrlData status={status}/>        
          </Route>
          {/* if any status to be displayed before login */}
          <Route path="/status">
            <StatusDisplay status={status}/>        
          </Route>
          {/* graph to show number of Urls generated in past 30 days  */}
          <Route path="/appUsage">
            <NavTabs/>
            <MonthReport/>
          </Route>
          {/* login page */}
          <Route path="/">
            <LoginPage setStatus={setStatus}/>        
          </Route>
        </Switch>
        
      </section>
    </div>
  );
}

export default App;
