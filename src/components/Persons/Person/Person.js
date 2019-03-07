import React, {Component, Fragment} from 'react';
import classes from './Person.css';
import Auxilary from '../../../hoc/Auxilary';
import withClass from '../../../hoc/withClass';
import PropTypes from 'prop-types';
/*Auth Context is a way to use the context API to bypass long chains of data to get from
point A to D without having to pass data thru each individual component*/
import AuthContext from '../../../context/auth-context'
//Dont need to import component because we are not using a class thats extends component


//props can be any names, but should be named props. props allow you to pass data from a parent(wrapping) component to a child
//embeded component
//Person is functional component and does not have state
//stateless component. No internal logic. No presentaional components. Receives data and structural it in external way
class Person extends Component {
  constructor(props){
    super(props)
    this.inputElementRef = React.createRef();
  }

//Static means it can be access from outside without the need to instantiate an object based on this class first.
//first. This gives access to Context outside of just the render function
  static contextType =AuthContext;

  componentDidMount(){
    //this.inputElement.focus();
    this.inputElementRef.current.focus();
    console.log(this.context.authenticated)
  }

  render(){
    console.log('[Person.js] rendering...');
    return(
      //<div className={classes.Person}>
      //React Alernative to aux is React.Fragment
      <Auxilary>

      {this.context.authenticated ? <p>Authenticated</p> : <p>Please log in</p>}

        <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!</p>

        <p>{this.props.children}</p>
        {/*onchange and value is two way binding. There is a warning. False alarm*/}
      <input
      type='text'
      //special react keyword
      //ref={(inputEl)=>{this.inputElement=inputEl}}
      ref={this.inputElementRef}
      onChange={this.props.changed}
      value={this.props.name}
      />
      {/*Children refers to any elements between opening and closing tag of component*/}
      </Auxilary>
      //</div>
    )

  }
};
Person.propTypes ={
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func
};
export default withClass(Person, classes.Person);
