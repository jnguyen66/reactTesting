import React from 'react';

import './Person.css';
//Dont need to import component because we are not using a class thats extends component


//props can be any names, but should be named props. props allow you to pass data from a parent(wrapping) component to a child
//embeded component
//Person is functional component and does not have state
//stateless component. No internal logic. No presentaional components. Receives data and structural it in external way
const person = (props) => {

  return(
    <div className='Person'>
      <p onClick={props.click}>I'm {props.name} and I am {props.age} years old!</p>

      <p>{props.children}</p>
      {/*onchange and value is two way binding. There is a warning. False alarm*/}
      <input type='text' onChange={props.changed} value={props.name}/>
      {/*Children refers to any elements between opening and closing tag of component*/}
    </div>
  )
};

export default person;
