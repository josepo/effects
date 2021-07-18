import { useEffect, useState, useReducer, useContext, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Auth from '../../context/Auth';
import Input from '../UI/Input/Input';

const emailReducer = (email, action) => {
   if (action.type === "EMAIL_CHANGED") {
      return { value: action.value, valid: action.value.includes('@') };
   }
   else if (action.type === 'EMAIL_BLUR') {
      return { value: email.value, valid: email.value.includes('@') };
   }

   return { value: '', valid: false };
}

const passwordReducer = (passwd, action) => {
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

   const emailRef = useRef();
   const passwdRef = useRef();

   useEffect(() => {
      const timer = setTimeout(() => {
         setFormIsValid(email.valid && passwd.valid)
      }, 500);

      return () => { clearTimeout(timer); }
   },
      [email.valid, passwd.valid]);


   const submitHandler = (event) => {
      event.preventDefault();

      if (formIsValid) {
         auth.onLogin(email.value, passwd.value);
      } else if (!email.valid) {
         emailRef.current.focus();
      } else {
         passwdRef.current.focus();
      }
   };

   return (
      <Card className={classes.login}>
         <form onSubmit={submitHandler}>
            <Input
               ref={ emailRef }
               id='email'
               label='E-Mail'
               type='email'
               value={email.value}
               isValid={email.valid}
               onChange={e => { dispatchEmail({ type: 'EMAIL_CHANGED', value: e.target.value }); }}
               onBlur={() => { dispatchEmail({ type: 'EMAIL_BLUR' }); }} />

            <Input
               ref={ passwdRef }
               id='password'
               label='Password'
               type='password'
               value={ passwd.value }
               isValid={ passwd.valid }
               onChange={e => { dispatchPassword({ type: 'PASSWORD_CHANGED', value: e.target.value }); }}
               onBlur={() => { dispatchPassword({ type: 'PASSWORD_BLUR' }); }} />

            <div className={classes.actions}>
               <Button type="submit" className={classes.btn}>
                  Login
               </Button>
            </div>
         </form>
      </Card>
   );
};

export default Login;
