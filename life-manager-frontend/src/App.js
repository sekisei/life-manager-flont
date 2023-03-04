import axios from "axios";
import {createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';
import commonURI from "./components/URIs";
import Header from './components/Header';
import MainContentsContainer from "./components/MainContents/MainContentsContainer";
import ManageAccountContainer from "./components/ManageAccount/ManageAccountContainer";
import Login from "./components/Login";
import ErrorBoundary from "./ErrorBoundary";

export const CommonStateContext = createContext();

function App() {
  const [userId, setUserId] = useState(1);
  const [activeAcId, setActiveAcId] = useState();
  const [accounts, setAccounts] = useState({});

  // ユーザ情報取得
  const getUserInfo = () => {
    //"http://localhost:8080/v1/users/5"
    axios.get(`${commonURI}/v1/users/5`).then(
      res => {
        console.log(res);
      }
    );
  };

  const getAccounts = () => {
    //http://localhost:8080/v1/users/${userId}/accounts
    axios.get(
      `${commonURI}/v1/users/${userId}/accounts`,
      {headers: {"Authorization": sessionStorage.getItem("Token")}} //TODO トークン保存場所見直し
    ).then(
      res => {
          setAccounts(res.data);
      }
    );
  };
  
  const PageNotFound = () => (
    <h2>Page Not Found</h2>
  );

  const CommonHeader = () => (
    <>
      <Header />
      <Outlet />
    </>
  );

  useEffect(() => {
    getAccounts();
  },[]);

  //トークンが切れた時に自動でログイン画面に行くか、ホームボタンを押してもらうか
  const AppResource = createBrowserRouter([
    {
      element: <ErrorBoundary/>,
      children: [
        {
          path: "login",
          element: <Login/>
        },
        {
          path: "/",
          element: <CommonHeader/>,
        },
        {
          path: "/top",
          element: <MainContentsContainer/>          
        },
        {
          path: "/modify",
          element: <ManageAccountContainer/>
        },
        {
          path: "*",
          element: <PageNotFound/>
        }
      ]
    },
  ]);

  return (
    <div>
        <CommonStateContext.Provider value = {{
          userId,
          activeAcId,
          setUserId,
          setActiveAcId
        }}>
          <RouterProvider router = {AppResource}/>
          {/*
          <BrowserRouter>
            <Routes>
              <Route path = 'login' element = {<Login/>}/>
              <Route path = '/' element = {<CommonHeader/>}>
                <Route 
                  path = 'top' 
                  element = {
                    <MainContentsContainer 
                      accounts = {accounts} 
                      getAccounts = {getAccounts}
                    />
                  }
                />
                <Route 
                  path = 'modify' 
                  element = {
                    <ManageAccountContainer
                      getAccounts = {getAccounts}
                    />
                  } 
                />
              </Route>
              <Route path = '*' element = {<PageNotFound/>}/>
            </Routes>
          </BrowserRouter>
          */}
        </CommonStateContext.Provider>
    </div>
  );
}

export default App;
