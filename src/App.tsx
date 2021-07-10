import React from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import { orange, teal } from '@material-ui/core/colors';
import { ViewLogin } from './views/ViewLogin/ViewLogin';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { ViewNewUser } from './views/ViewNewUser/ViewNewUser';
import { ViewHome } from './views/ViewHome/ViewHome';
import { ViewAddBook } from './views/ViewHome/ViewMain/ViewFooter/ViewAddBook';

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: orange
  }
})


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path='/' exact component={ViewLogin} />
          <Route path='/signup' exact component={ViewNewUser} />          
          <Route path='/home' exact component={ViewHome} />
          <Route path='/add/books' exact component={ViewAddBook} />

        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
