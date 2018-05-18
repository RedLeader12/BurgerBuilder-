import React from 'react';
import Aux from '../../HOC/Aux'

const layout = (props) => (
    <Aux> 
    <div>Toolbar, SideDrawer, BackDrop</div> 
    <main>
        {props.children}
    </main>
    </Aux> 
);

export default layout;