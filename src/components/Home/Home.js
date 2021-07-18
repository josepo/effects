import React, { useContext } from 'react';

import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import classes from './Home.module.css';
import Auth from '../../context/Auth';

const Home = () => {
   const auth = useContext(Auth);

   return (
      <Card className={classes.home}>
         <h1>Welcome back!</h1>
         <Button onClick={ auth.onLogout }>Logout</Button>
      </Card>
   );
};

export default Home;
