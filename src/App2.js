import React, { useState } from 'react';
import './App.css';
import Person from './Person/Person'
//React hooks style
const app = props => {
  //State manages inside component, and only works when extending Component
const [personsState, setPersonsState] = useState({
  persons:[
    {name: 'Max', age: 28},
    {name: 'Manu', age: 29},
    {name: 'Stephanie', age: 26}
  ],
  otherState: 'some other value'
});
//you have to split it up with multiple useStates
useState('string');
//handler is usually followed by method names. Using arrow function helps fix the 'this' issue.
const switchNameHandler = ()=>{
//console.log('wasclicked');

//setPersonsState overwrites state and does not include other states, so we have to manually add them in here
setPersonsState({
  persons:[
    {name: 'Justin', age: 28},
    {name: 'Manu', age: 29},
    {name: 'Johnny', age: 26}
  ]
});
};

    return (
      <div className="App">
      {/* Components go here */}
        <h1>hi i'm a react app</h1>
        <p>this is working</p>
          {/* do not add () after function name because it will invoke immediately */}
        <button onClick={switchNameHandler}>Switch Name</button>
        {/* 'This' refers to class */}
        <Person name={personsState.persons[0].name} age={personsState.persons[0].age}/>
        <Person name={personsState.persons[1].name} age={personsState.persons[1].age}>My Hobbies: Racing</Person>
        <Person name={personsState.persons[2].name} age={personsState.persons[2].age}/>
      </div>
    );

};

export default app;
