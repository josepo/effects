import React, { useRef, useImperativeHandle } from 'react';
import classes from './Input.module.css';

const Input = React.forwardRef(({ id, label, type, value, isValid, onChange, onBlur }, ref) => {
   const inputRef = useRef();   
   const focus = () => { inputRef.current.focus(); }

   useImperativeHandle(ref, () => ({
      focus: focus
   }));

   return (
      <div
         className={`${classes.control} ${(isValid === false) ? classes.invalid : ''
            }`}
      >
         <label htmlFor={ id }>{ label }</label>
         <input
            type={ type }
            id={ id }
            ref={ inputRef }
            value={ value }
            onChange={ onChange }
            onBlur={ onBlur }
         />
      </div>
   );
});

export default Input;