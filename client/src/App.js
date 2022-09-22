import './App.css';
import { Switch, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import Detail from "./components/Detail";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/home" component={Home} />
        <Route path="/details/:id" component={Detail} />
      </Switch>
    </div>
  );
}

export default App;
