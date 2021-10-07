import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import ArticleForm from "./components/ArticleForm";
import ArticleFormCreate from "./components/ArticleFormCreate";
import ArticleList from "./components/ArticleList";
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Navbar from "./components/Navbar";
import Api from "./services/api";
import AuthProvider, { AuthContext } from './store/AuthStore';
import io from 'socket.io-client';
import { API_URL } from "./utils/constant";
import Register from "./components/Register";


function App() {
  useEffect(() => {
    (async () => {
      const response = await Api.getProfile()
      if(response && response.username) {
        const socket = io(API_URL);
        Notification.requestPermission();
        socket.on('connect', () => {
          console.log('connected')
          socket.on('messages', function(data) {
            console.log(data);
          });
          socket.on('article', function(data) {
            new Notification(`Un article vient d'être ajouté`, { body: data.name });
          });
        });
      }
    })()
  }, [])

  return (
    <AuthProvider>
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/article" component={ArticleList} />
            <Route path="/article/edit/:id" component={ArticleForm} />
            <Route path="/article/add" component={ArticleFormCreate} />
            <Route exact path="/">
              <AuthContext.Consumer>
                { (context) => {
                  if (context.state.isLogged === false) {
                    return <Login />
                  }
                  return <Dashboard />
                }}
              </AuthContext.Consumer>
            </Route>
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App
