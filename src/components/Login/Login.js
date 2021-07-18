import { useEffect, useState, useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Auth from '../../context/Auth';

const emailReducer = (email, action) =>
{
   if (action.type === "EMAIL_CHANGED") {
      return { value: action.value, valid: action.value.includes('@') };
   }
   else if (action.type === 'EMAIL_BLUR') {
      return { value: email.value, valid: email.value.includes('@') };
   }

   return { value: '', valid: false };
}

const passwordReducer = (passwd, action) =>
{
   if (action.type === 'PASSWORD_CHANGED') {
      return { value: action.value, valid: action.value.trim().length > 6 };
   }
   else if (action.type === 'PASSWORD_BLUR') {
      return { value: passwd.value, valid: passwd.value.trim().length > 6 };
   }

   return { value: '', valid: false };
}

const Login = () => {
   const [formIsValid, setFormIsValid] = useState(false);

   const [email, dispatchEmail] = useReducer(emailReducer, { value: '', valid: null });
   const [passwd, dispatchPassword] = useReducer(passwordReducer, { value: '', valid: null });

   const auth = useContext(Auth);

   useEffect(() => {
      const timer = setTimeout(() => {
         setFormIsValid(email.valid && passwd.valid)
      }, 500);

      return () => { clearTimeout(timer); }
   }, 
   [email.valid, passwd.valid]);


   const submitHandler = (event) => {
      event.preventDefault();

      auth.onLogin(email.value, passwd.value);
   };

   return (
      <Card className={classes.login}>
         <form onSubmit={submitHandler}>
            <div
               className={`${classes.control} ${ (email.valid === false) ? classes.invalid : ''
                  }`}
            >
               <label htmlFor="email">E-Mail</label>
               <input
                  type="email"
                  id="email"
                  value={ email.value }
                  onChange={ e => { dispatchEmail({ type: 'EMAIL_CHANGED', value: e.target.value }); }}
                  onBlur={ () => { dispatchEmail({ type: 'EMAIL_BLUR' }); }}
               />
            </div>
            <div
               className={`${classes.control} ${ (passwd.valid === false) ? classes.invalid : ''
                  }`}
            >
               <label htmlFor="password">Password</label>
               <input
                  type="password"
                  id="password"
                  value={ passwd.value }
                  onChange={ e => { dispatchPassword({ type: 'PASSWORD_CHANGED', value: e.target.value }); }}
                  onBlur={ e => { dispatchPassword({ type: 'PASSWORD_BLUR' }); }}
               />
            </div>
            <div className={classes.actions}>
               <Button type="submit" className={classes.btn} disabled={!formIsValid}>
                  Login
               </Button>
            </div>
         </form>
      </Card>
   );
};

export default Login;
