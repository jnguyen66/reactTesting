import React from 'react';
import Person from './Person/Person';


/* Map is a crucial ES6 function that allows us
  map each element of the array in state into
  mulitple components */
const persons = (props) => props.persons.map((person, index) => {
          // Alternative to that arrow function down there would be to bind
    return <Person
      click={() =>props.clicked(index)}
      name={person.name}
      age={person.age}
      //Key is necessary to map correctly
      key={person.id}
      changed={(event) =>props.changed(event, person.id)}/>
  });

export default persons;
