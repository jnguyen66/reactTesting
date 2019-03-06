import React, {useEffect} from 'react';
import classes from './Cockpit.css'

const cockpit = (props)=>{
  //no argument executes for every render cycle
  //useEffect more than once. Put an empty array if you only want it to run once. No dependencies to compare. You can have mulitple fields too.
useEffect(()=> {
  console.log('[Cockpit.js] useEffect');
  //Http Request....
  setTimeout(()=>{
    alert('saved data to cloud!');
  }, 1000);
  //RUns before the main useEffect function but after the first render cycle
  return ()=>{

    console.log('[Cockpit.js] clean up work in useEffect')
  };
}, [props.persons]);


useEffect(()=>{
  console.log('[Cockpit.js] 2nd useEffect');
  return ()=>{
    console.log('[Cockpit.js] clean up work in 2nd useEffect')
  };
});

  //assigning multiple classes
  const assignedClasses=[];
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

      let btnClass='';
      if(props.showPersons){
        btnClass=classes.Red;
      }


  //does this when you click the button due to the if statement up there.
      //this is inline styling  style.backgroundColor= 'red';
      /*  Radium feature
      style[':hover']={
          backgroundColor: 'salmon',
          color:'black'
        };
        */




  if(props.personsLength<=2){
    assignedClasses.push(classes.red); //classes will be rend
  }
  if(props.personsLength<=1){
    assignedClasses.push(classes.bold); //classes will be rend
  }
  return(

    <div className={classes.Cockpit}>
      <h1>{props.title}</h1>
          {/* You gotta use join to make one string of classes from the array */}
      <p className={assignedClasses.join(' ')}>this is working</p>
        {/* do not add () after function name because it will invoke immediately */}
      <button
        className={btnClass}
        //inline styling below
        //style={style}
        onClick={props.clicked}
        >Switch Name</button>

      </div>

  );
};
//React memo takes a snapshot and only updates it if any of the props changes
export default React.memo(cockpit);
