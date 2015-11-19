import _ from 'lodash';
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
        this.state = {
            open: true
        };
    }
    render() {
        let {
            open
        } = this.state;

        let localStyles = _.cloneDeep(styles);
        if(!open) {
            localStyles.body.height = 30;
            localStyles.toggle.top = '.5em';
            localStyles.body.cursor = 'pointer';
        }
        return (
            <section ref="app" style={localStyles.body} onClick={!open && this.toggleView}>
                <a ref="toggle" style={localStyles.toggle} onClick={open && this.toggleView} href="#">{ open ? '--' : '+' }</a>
                { open &&
                    <div>
                        <ResizableBox className="resizable--large" width={500} height={300} minConstraints={[200, 300]} maxContstrains={[800, 300]}>
                            <TreePanel ref="treePanel" style={localStyles.treePanel}/>
                        </ResizableBox>
                    </div>
                }
            </section>
        );
    }
    toggleView = () => {
        this.setState({
            open: !this.state.open
        });
    }
}

let styles = {
    body: {
        position: 'fixed',
        bottom: 0,
        right: 0,
        height: 300,
        width: 500,
        borderTop: '1px solid #ccc',
        borderLeft: '1px solid #ccc'
    },
    toggle: {
        position: 'absolute',
        right: '1em',
        textDecoration: 'none',
        top: '1em',
        cursor: 'pointer',
        zIndex: 100
    },
    treePanel: {
        borderRight: '1px solid #ccc',
        height: '100%',
        paddingLeft: '1em'
    }
};

export default BaobabFett;
