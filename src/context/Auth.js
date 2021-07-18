import React, { useState, useEffect } from 'react';

const Auth = React.createContext({
   logged: false,
   onLogout: () => {},
   onLogin: (email, passwd) => {}
});

export default Auth;

export const AuthProvider = ({ children }) =>
{
   const [logged, setLogged] = useState(false);

   const logoutHandler = () => {
      localStorage.removeItem('isLoggedIn');
      setLogged(false);
   };

   const loginHandler = () => {
      localStorage.setItem('isLoggedIn', 'true');
      setLogged(true);
   }

   useEffect(() =>
   {
      setLogged(localStorage.getItem('isLoggedIn') === 'true');
   }, 
   [])   

   return (
      <Auth.Provider value={{
         logged: logged,
         onLogout: logoutHandler,
         onLogin: loginHandler
      }}>
         { children }
      </Auth.Provider>
   );
}