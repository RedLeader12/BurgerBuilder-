import React from 'react';
import classes from './BuildControl.css'

const buildControl = (props) => (
    <div classes={classes.BuildControl}>
        <div classes={classes.Label}>{props.label}</div> 
        <button onClick={props.removed}classes={classes.Less} disabled={props.disabled}> Less </button> 
        <button onClick={props.added} classes={classes.More}> More </button> 
    </div>
);

export default buildControl;