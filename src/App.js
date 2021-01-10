import react from 'react';
import firebase from './.env';
import { useEffect,useState } from 'react';
import SignInScreen from './components/SignInScreen';
import './App.css';

const App = () =>
{
  const [state, setState] = useState({
    loading: true,
    user: null
  });

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setState({
        loading: false,
        user: user
      });
    });
  }, [])

  const logout = () =>
  {
    firebase.auth().signOut();
  }

  if (state.loading === true)
  {
    return (<div>loading</div>);
  }
  
  else
  {
    return(
    <div>
      Username: {state.user && state.user.displayName}
      <br />
      {state.user ?
        (<button onClick={logout()}>Logout</button>) :
        (<SignInScreen />)
      }
      </div>
    )
  }
}

export default App;
