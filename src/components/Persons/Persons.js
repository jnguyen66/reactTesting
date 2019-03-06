import React, {PureComponent} from 'react';
import Person from './Person/Person';


/* Map is a crucial ES6 function that allows us
  map each element of the array in state into
  mulitple components */
  //Pure component is just a normal component that automatically implements shouldComponentUpdate checks on all props
class Persons extends PureComponent {
  // static getDerivedStateFromProps(props, state){
  //   console.log('[Persons.js] getDerivedStateFromProps');
  //   return state;
  // }

  // componentWillReceiveProps(props){
  //   console.log('[Persons.js] componentWillReceiveProps', props);
  // }

  // shouldComponentUpdate(nextProps, nextState){
  //   console.log('[Persons.js] shouldComponentUpdate');
  //   if(
  //     nextProps.persons!== this.props.persons ||
  //     nextProps.changed !== this.props.changed ||
  //     nextProps.clicked !==this.props.clicked
  //   ){
  //     return true;
  //   }
  //   return false;
  // }

  getSnapshotBeforeUpdate(prevProps, prevState){
    console.log('[Persons.js] getSnapshotBeforeUpdate');
    return {message: 'Snapshot!'};
  }

  // componentWillUpdate(){
  //
  // }

//After update finished, and you need to fetch new data from server
  componentDidUpdate(prevProps, prevState, snapshot){
    console.log('[Persons.js] componentDidUpdate');
    console.log(snapshot);
  }

  componentWillUnmount(){
    console.log('[Persons.js] componentWillUnmount');
  }

  render(){
      console.log('[Persons.js] rendering...');
      return this.props.persons.map((person, index) => {
              // Alternative to that arrow function down there would be to bind
        return (
           <Person
          click={() =>this.props.clicked(index)}
          name={person.name}
          age={person.age}
          //Key is necessary to map correctly
          key={person.id}
          changed={(event) =>this.props.changed(event, person.id)}/>
        );
      });
  }


};
export default Persons;
