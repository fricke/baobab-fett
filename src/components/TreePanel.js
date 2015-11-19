import React from 'react';
import Button from './Button';
import Inspector from 'react-json-inspector';
import {branch} from 'baobab-react/decorators';

@branch({
    cursors: {
        source: ['source']
    }
})
class TreePanel extends React.Component {

    constructor() {
        super(...arguments);
        this.state = {
            showNewButton: false
        };
    }

    render() {
        let {
            source,
            style
        } = this.props;
        return (
            <div style={style}>
                 <Inspector data={ source } />
            </div>
        );
    }
}

export default TreePanel;

