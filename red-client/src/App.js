import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
// Components
import Navbar from './components/Navbar'
// Pages
import home from './pages/home'
// MUI
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import {createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ecfffe',
    },
    secondary: {
      main: '#ffffff',
    },
  }
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
    <Router>
      <Navbar/>
      <div className="container">
        <Switch>
          <Route exact path="/" component={home}/>
        </Switch>
      </div>
    </Router>
    </MuiThemeProvider>
  );
}

export default App;