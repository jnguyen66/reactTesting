import React, { Component } from 'react';
import classes from './App.css';
//import Radium, { StyleRoot } from 'radium';
//Radium makes it possible to do inline psuedo selectors and media queries
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Auxilary from '../hoc/Auxilary';
import PropTypes from 'prop-types';
import AuthContext from '../context/auth-context';
//Container components or smart components or stateful components. You only want a couple of these. You want more functional than smart components.
//Main logic should sit in your smart component.


//You only want App.js or Container to manage the state and manipulate the state with handlers. the rest should
//be in functional components

class App extends Component {
  constructor(props){
    super(props);
    console.log('[App.js] constructor');
  }
  //State manages inside component, and only works when extending Component
  state={
    persons:[
      {id: 1, name: 'Max', age: 28},
      {id: 2, name: 'Manu', age: 29},
      {id: 3,name: 'Stephanie', age: 26}
    ],
    otherState: 'some other value',
    showPersons:false,
    showCockpit: true,
    changeCounter: 0,
    authenticated: false
  }

//1. used to initilize state of component based on props received from external properties, but not used often.
  static getDerivedStateFromProps(props, state){
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }
  //

  //2. Used to decide whether ot continue to update or not
  //shouldComponentUpdate(nextProps, nextState){

  //}

  //4. Last Minute DOM ops
  //getSnapshotBeforeUpdate(prevProps, prevState){
  //  console.log('[App.js] getSnapshotBeforeUpdate...');
  //}
  // componentWillMount(){
  //   console.log('[App.js] componentWillMount...');
  // }

  //This method runs after everything on the intial create cycle
    componentDidMount(){
      console.log('[App.js] conponentDidMount...');
    }
    //THis runs before rendering update
    shouldComponentUpdate(nextProps, nextState){
        console.log('[App.js] shouldComponentUpdate');
        //if false it will not update
        return true;
    }
//this runs once update is complete or at the end of the update cycle
    componentDidUpdate(){
        console.log('[App.js] componentDidUpdate');
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
  person.name=event.target.value;

//makes a copy of OG persons state
  const persons = [...this.state.persons];
  //assigns the copy of person to the copy of persons OG state
  persons[personIndex]=person;
//calls set state with the copy of the persons copy
  this.setState((prevState, props)=>{
    return{
      persons: persons,
      //the proper way to update state when depending on previous state
      changeCounter: prevState.changeCounter + 1
    }
  });
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
};
//3.

loginHandler = () =>{
  this.setState({authenticated: true});
};
  render() {
    console.log('[App.js] render');
    let persons =null;
    if (this.state.showPersons){
      persons=
      (
          <Persons
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler}
            isAuthenticated={this.state.authenticated}

            />
          );
      }

    return (
      //Must wrap in StyleRoot if we use Radium media queries, and import at app.js
    //  <StyleRoot>
      //<WithClass classes={classes.App}>
      <Auxilary>
      <button onClick={()=>{this.setState({showCockpit:false});}}>Remove Cockpit</button>
      {/*Only wrap the components that need it which are cockpit and person
      Pass in value as if they are props, but when used in the component will be context*/}
      <AuthContext.Provider
        value={{
        authenticated: this.state.authenticated,
        login: this.loginHandler
      }}>
      {this.state.showCockpit ? (
        <Cockpit
        title={this.props.appTitle}
        showPersons={this.state.showPersons}
        personsLength={this.state.persons.length}
        clicked={this.togglePersonsHandler}
        />
      ): null}
      {persons}
      </AuthContext.Provider>
      </Auxilary>
    //  </WithClass>
    //  </StyleRoot>
    );
  }
}

//export default Radium(App);
export default withClass(App, classes.App);

/*  Run npm eject to unlock css Module
add and commit changes before doing so
npm run eject
edit webpack.config file
find the test for /\.css$/
set modules to true
add localIdentName: '[name]__[local]__[hash:base64:5]'
import classes from '.Example.css'
  */


  //npm install --save prop-types to help with prop type management
