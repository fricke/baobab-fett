import React from 'react';
import { root } from 'baobab-react/decorators';

import {
    Resizable,
    ResizableBox
} from 'react-resizable';

import store from '../store';
import TreePanel from './TreePanel';
import WatchPanel from './WatchPanel';
import { setSource } from '../actions/SourceActions';

@root(store)
class BaobabFett extends React.Component {
    constructor(props, context) {
        super(props, context);
        setSource(store, this.props.store);
    }
    render() {
        return (
            <section ref="app" style={styles.body}>
                <ResizableBox className="resizable--large" width={500} height={300} minConstraints={[200, 300]} maxContstrains={[800, 300]}>
                    <TreePanel ref="treePanel" style={styles.treePanel}/>
                </ResizableBox>
                <ResizableBox className="resiable--small" width={500} height={300} minConstraints={[200, 300]} maxContstrains={[800, 300]}>
                    <WatchPanel ref="watchPanel" />
                </ResizableBox>
            </section>
        );
    }
}

let styles = {
    body: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 300,
        width: '100%'
    },
    treePanel: {
        borderRight: '1px solid #ccc',
        borderTop: '1px solid #ccc',
        height: '100%',
        paddingLeft: '1em',
        paddingTop: '.5em'
    }
};

export default BaobabFett;
