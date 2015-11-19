import React from 'react';
import { root } from 'baobab-react/decorators';

import store from '../store';
import TreePanel from './TreePanel';

@root(store)
class App extends React.Component {
    render() {
        return (
            <section ref="app">
                <TreePanel ref="treePanel" />
            </section>
        );
    }
}

export default App;
