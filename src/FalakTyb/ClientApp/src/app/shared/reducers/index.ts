import { ReducersMapObject, combineReducers } from "@reduxjs/toolkit";
import { loadingBarReducer as loadingBar } from "react-redux-loading-bar";

import locale from "./locale";
import authentication from "./authentication";
import applicationProfile from "./application-profile";

import administration from "app/modules/administration/administration.reducer";
import userManagement from "app/modules/administration/user-management/user-management.reducer";
import register from "app/modules/account/register/register.reducer";
import activate from "app/modules/account/activate/activate.reducer";
import password from "app/modules/account/password/password.reducer";
import settings from "app/modules/account/settings/settings.reducer";
import passwordReset from "app/modules/account/password-reset/password-reset.reducer";
import entitiesReducers from "app/entities/reducers";


const rootReducer: ReducersMapObject = {
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  loadingBar,
 
  ...entitiesReducers,
};

export default rootReducer;
