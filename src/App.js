import { useContext } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import Auth from './context/Auth';

function App() {
   const auth = useContext(Auth);

   return (
      <>
         <MainHeader />
         <main>
            { !auth.logged && <Login /> }
            { auth.logged && <Home />}
         </main>
      </>
   );
}

export default App;
