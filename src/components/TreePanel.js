import React from 'react';
import Button from './Button';

class Panel extends React.Component {

    constructor() {
        super(...arguments);
        this.state = {
            showNewButton: false
        };
    }

    render() {
        return (
            <div>
                { <button>ok then</button> }
                <Button onClick={this.tick}>Show me the money!</Button>
                <button id="executescript">Execute script in inspected page</button>
                <button id="insertscript">Insert script into inspected page</button>
                <button id="insertmessagebutton">Insert button to send a message from page to devtools</button>
            </div>
        );
    }
}

export default Panel;

