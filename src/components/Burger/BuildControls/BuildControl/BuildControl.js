import React from 'react';
import classes from './BuildControl.css'

const buildControl = (props) => (
    <div classes={classes.BuildControl}>
        <div classes={classes.Label}>{props.label}</div> 
        <button classes={classes.Less}> Less </button> 
        <button classes={classes.More}> More </button> 
    </div>
);

export default buildControl;