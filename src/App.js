import { useEffect, useState } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import Auth from './context/Auth';

function App() {
   const [isLoggedIn, setIsLoggedIn] = useState(false);

   useEffect(() =>
   {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
   }, 
   [])

   const loginHandler = (email, password) => {
      // We should of course check email and password
      // But it's just a dummy/ demo anyways
      localStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
   };

   const logoutHandler = () => {
      localStorage.removeItem('isLoggedIn');
      setIsLoggedIn(false);
   };

   return (
      <Auth.Provider value={{
         logged: isLoggedIn,
         onLogout: logoutHandler
      }}>
         <MainHeader />
         <main>
            {!isLoggedIn && <Login onLogin={loginHandler} />}
            {isLoggedIn && <Home onLogout={logoutHandler} />}
         </main>
      </Auth.Provider>
   );
}

export default App;
