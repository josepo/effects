import React, { useContext } from 'react';
import Auth from '../../context/Auth';

import classes from './Navigation.module.css';

const Navigation = () => {
   const auth = useContext(Auth);

   return (
      <nav className={classes.nav}>
      { 
         auth.logged &&
         <ul>
            <li>
               <a href="/">Users</a>
            </li>
            <li>
               <a href="/">Admin</a>
            </li>
            <li>
               <button onClick={ auth.onLogout }>Logout</button>
            </li>
         </ul>
      }
      </nav>
   );
};

export default Navigation;
