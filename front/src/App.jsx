import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Navbar from "./components/Navbar";
import AuthProvider, { AuthContext } from './store/AuthStore';


function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Navbar />

          <Switch>
            <Route path="/articles">
              nos articles
            </Route>
            <Route path="/">
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
