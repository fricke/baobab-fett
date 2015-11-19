import React from 'react';

class Button extends React.Component {

    constructor() {
        super(...arguments);
    }

    render() {
        return (
            <button onClick={this.props.onClick}/>
        );
    }
}

module.exports = Button;

