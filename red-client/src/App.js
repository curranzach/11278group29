import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
// Pages
import home from './pages/home'


function App() {
  return (
    <Router>
    <div className="container">
      <Switch>
        <Route exact path="/" component={home}/>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
