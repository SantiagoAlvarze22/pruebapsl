import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Actions } from './components/Actions';
import { Login } from './components/Login';
import { Nav } from './components/Nav';
import { Notes } from './components/Notes';
import { Register } from './components/Register';
import { useUser } from './context/UserContext';

function App() {
  //importando login para saber si el estado del user es true o false
  const { user } = useUser();

  const Private = (props) => {
    return user.login ? <Route {...props} /> : <Redirect to='/' />;
  };

  const Public = (props) => {
    return user.login ? <Redirect to='notes' /> : <Route {...props} />;
  };

  return (
    <Router>
      <Nav />
      <Public path='/' exact component={Login} />
      <Private path='/notes' component={Notes} />
      <Public path='/register' component={Register} />
      <Private path='/actions/:idnote?' component={Actions} />
    </Router>
  );
}

export default App;
