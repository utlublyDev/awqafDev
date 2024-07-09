import "react-toastify/dist/ReactToastify.css";
import "./app.scss";
import "app/config/dayjs.ts";

import React, { useEffect } from "react";
import { Card } from "reactstrap";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { useAppDispatch, useAppSelector } from "app/config/store";
import { getSession } from "app/shared/reducers/authentication";
import { getProfile } from "app/shared/reducers/application-profile";
import { setLocale } from "app/shared/reducers/locale";
import Header from "app/shared/layout/header/header";
import Footer from "app/shared/layout/footer/footer";
import { hasAnyAuthority } from "app/shared/auth/private-route";
import ErrorBoundary from "app/shared/error/error-boundary";
import { AUTHORITIES } from "app/config/constants";
import AppRoutes from "app/routes";
import SideNavbar  from "./shared/layout/SideNavbar/SideNavbar"
const baseHref = document
  .querySelector("base")
  .getAttribute("href")
  .replace(/\/$/, "");

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSession());
    dispatch(getProfile());
  }, []);

  const currentLocale = useAppSelector((state) => state.locale.currentLocale);
  const isAuthenticated = useAppSelector(
    (state) => state.authentication.isAuthenticated
  );
  const isAdmin = useAppSelector((state) =>
    hasAnyAuthority(state.authentication.account.authorities, [
      AUTHORITIES.ADMIN,
    ])
  );
  const ribbonEnv = useAppSelector(
    (state) => state.applicationProfile.ribbonEnv
  );
  const isInProduction = useAppSelector(
    (state) => state.applicationProfile.inProduction
  );
  const isOpenAPIEnabled = useAppSelector(
    (state) => state.applicationProfile.isOpenAPIEnabled
  );

  
  return (
    <Router basename={baseHref}>
      {/* <ToastContainer position={toast.POSITION.TOP_LEFT} className="toastify-container" toastClassName="toastify-toast" /> */}
      <div className="" style={{  }}>
 
     {isAuthenticated&&<Header isAuthenticated={false} isAdmin={false} ribbonEnv={""} isInProduction={false} isOpenAPIEnabled={false} currentLocale={""} />}
         {isAuthenticated&&<SideNavbar/>}
   
        <div className="" id="app-view-container">
         
            <ErrorBoundary>
              <AppRoutes />
            </ErrorBoundary>


        </div>
      </div>
    </Router>
  );
};

export default App;
