import React, { Component } from 'react';
import classes from './App.css';
//import Radium, { StyleRoot } from 'radium';
//Radium makes it possible to do inline psuedo selectors and media queries
import Person from './Person/Person'
//Container components or smart components or stateful components. You only want a couple of these. You want more functional than smart components.
//Main logic should sit in your smart component.
class App extends Component {
  //State manages inside component, and only works when extending Component
  state={
    persons:[
      {id: 1, name: 'Max', age: 28},
      {id: 2, name: 'Manu', age: 29},
      {id: 3,name: 'Stephanie', age: 26}
    ],
    otherState: 'some other value',
    showPersons:false
  }
//handler is usually followed by method names. Using arrow function helps fix the 'this' issue.
/*switchNameHandler = (newName)=>{
  //console.log('wasclicked');
  //Do not do this!! this.state.persons[0].name='Justin';
  this.setState({
    persons:[
      {name: newName, age: 28},
      {name: 'Manu', age: 29},
      {name: 'Johnny', age: 26}
    ]
  })
}
*/

nameChangedHandler = (event, id) => {
  //checks to see if index exists, then saves it into personIndex
  const personIndex =this.state.persons.findIndex(p=>{
    return p.id === id;
  });
  //makes a copy of that person with personIndex
  const person ={
    ...this.state.persons[personIndex]
  };
//Based on event, takes value of input and replaces the copy of peron's name
  person.name=event.target.value

//makes a copy of OG persons state
  const persons = [...this.state.persons];
  //assigns the copy of person to the copy of persons OG state
  persons[personIndex]=person;
//calls set state with the copy of the persons copy
  this.setState({
    persons: persons
  }

  )
}



togglePersonsHandler = (event) =>{
  const doesShow =this.state.showPersons;
  this.setState({showPersons: !doesShow});
}

deletePersonHandler =(personIndex)=>{
  //copy array so that you do not directly mutate the original state
  //const persons =this.state.persons.slice();
  //Spreads the the array and copies it into the persons const
  //Always update state with an immuatble fashion
  const persons =[...this.state.persons];
  persons.splice(personIndex, 1);
  this.setState({persons: persons});
}

  render() {
//You can use in-line styling or css files. Use inline when you want to scope your styling
/*inline styling
    const style = {
      backgroundColor: 'green',
      color:'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',



      /*
      ':hover': {
        backgroundColor: 'lightGreen',
        color: 'black'
      }
      */
/* };   */
//prefered way of outputting conditional content. Because render re renders everything when called.
    let persons =null;
    let btnClass='';

    if (this.state.showPersons){
      persons=(
        <div >
                {/* Map is a crucial ES6 function that allows us
                  map each element of the array in state into
                  mulitple components */}
          {this.state.persons.map((person, index) => {
                  // Alternative to that arrow function down there would be to bind
            return <Person
              click={() =>this.deletePersonHandler(index)}
              name={person.name}
              age={person.age}
              //Key is necessary to map correctly
            key={person.id}
          changed={(event) =>this.nameChangedHandler(event, person.id)}/>
          })}
      </div>

      );
//does this when you click the button due to the if statement up there.
    //this is inline styling  style.backgroundColor= 'red';
    /*  Radium feature
    style[':hover']={
        backgroundColor: 'salmon',
        color:'black'
      };
      */

        btnClass=classes.Red;
    }
    //assigning multiple classes
    const assignedClasses=[];
    if(this.state.persons.length<=2){
      assignedClasses.push(classes.red); //classes will be rend
    }
    if(this.state.persons.length<=1){
      assignedClasses.push(classes.bold); //classes will be rend
    }

    return (
      //Must wrap in StyleRoot if we use Radium media queries, and import at app.js
    //  <StyleRoot>
      <div className={classes.App}>
      {/* Components go here */}
        <h1>App</h1>
            {/* You gotta use join to make one string of classes from the array */}
        <p className={assignedClasses.join(' ')}>this is working</p>
          {/* do not add () after function name because it will invoke immediately */}
        <button
          className={btnClass}
          //inline styling below
      //    style={style}
          onClick={this.togglePersonsHandler}
          >Switch Name</button>
        {/* 'This' refers to class */}
        {/* Tunerary expression below. If true render after whats after ? if not then after : null */}
        {persons}
      </div>
    //  </StyleRoot>
    );
  }
}

//export default Radium(App);
export default App;
