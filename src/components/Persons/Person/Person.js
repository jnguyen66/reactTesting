import React, {Component, Fragment} from 'react';
import Auxilary from '../../../hoc/Auxilary';
import classes from './Person.css';
//Dont need to import component because we are not using a class thats extends component


//props can be any names, but should be named props. props allow you to pass data from a parent(wrapping) component to a child
//embeded component
//Person is functional component and does not have state
//stateless component. No internal logic. No presentaional components. Receives data and structural it in external way
class Person extends Component {
  render(){
    console.log('[Person.js] rendering...');
    return(
      //<div className={classes.Person}>
      //React Alernative to aux is React.Fragment
      <Fragment>
        <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!</p>

        <p>{this.props.children}</p>
        {/*onchange and value is two way binding. There is a warning. False alarm*/}
        <input type='text' onChange={this.props.changed} value={this.props.name}/>
        {/*Children refers to any elements between opening and closing tag of component*/}
        </Fragment>
      //</div>
    )

  }
};

export default Person;
